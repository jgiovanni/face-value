import Vue from "vue";
import axios from "axios";
import * as firebase from "firebase";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    signUserUp({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      return new Promise(function(resolve, reject) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            commit("setLoading", false);

            // Send Email Verification
            firebase.auth().currentUser.sendEmailVerification().catch(error => {
              console.log(error);
            });

            // Add additional data to user profile
            firebase.auth().currentUser
              .updateProfile({
                displayName: `${payload.first_name} ${payload.last_name}`
              })
              .then(updatedUser => {
                const newUser = {
                  id: updatedUser.uid,
                  name: updatedUser.displayName,
                  email: updatedUser.email,
                  photoUrl: updatedUser.photoURL
                };
                dispatch("checkForDefaultUserData", {
                  user: newUser,
                  ...payload
                });
                commit("setUser", newUser);
                resolve(updatedUser);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            commit("setLoading", false);
            commit("setError", error);
            console.log(error);
            reject(error);
          });
      });
    },
    signUserIn({ commit }, payload) {
      // commit('setLoading', true);
      // commit('clearError');
      return new Promise(function(resolve, reject) {
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            commit("setLoading", false);
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            };
            commit("setUser", newUser);
            resolve(user);
          })
          .catch(error => {
            // commit('setLoading', false);
            // commit('setError', error);
            console.log(error);
            reject(error);
          });
      });
    },
    signUserInGoogle({ commit, dispatch }, payload) {
      // commit('setLoading', true);
      // commit('clearError');
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            ...user
          };
          dispatch("checkForDefaultUserData", { user: newUser, ...payload });
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserInOCADU({ commit, dispatch }, payload) {
      // commit('setLoading', true);
      // commit('clearError');

      // redirect to canvas for login
      axios.get("https://canvas.ocadu.ca//login/oauth2/auth", {
        params: {
          client_id: "XXX", // TBD
          response_type: "code",
          state: "YYY", // TBD
          redirect_uri: "https://example.com/oauth_complete" // TBD
        }
      });
      firebase
        .auth()
        .signInWithCustomToken(token)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            ...user
          };
          dispatch("checkForDefaultUserData", { user: newUser, ...payload });
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserInFacebook({ commit, dispatch }, payload) {
      // commit('setLoading', true);
      // commit('clearError');
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          };
          dispatch("checkForDefaultUserData", { user: newUser, ...payload });
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      });
    },
    resetPasswordWithEmail({ commit }, payload) {
      const { email } = payload;
      // commit('setLoading', true);
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          commit("setLoading", false);
          console.log("Email Sent");
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    logout({ commit, dispatch }) {
      firebase.auth().signOut();
      commit("setUser", null);
      // dispatch("unbindRef", "userData");
      commit("setUserData", null);
    },
    checkForDefaultUserData({ commit, state, dispatch }, payload) {
      let data = {};
      if (this.state.userData.displayName !== payload.displayName)
        data.displayName = payload.displayName;
      dispatch("userData/set", data);
      /*const userDataRef = Vue.prototype.$db
        .collection("users")
        .doc(payload.user.id);
      userDataRef.get().then(doc => {
        if (doc.exists) {
          // check if user has some settings
          const data = doc.data();
        } else {
          let uData = {
            // default user settings
            user_role: payload.userType || "student",
            displayName: payload.user.displayName
          };
          dispatch("userData/set", uData);
        }
      });*/
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};
