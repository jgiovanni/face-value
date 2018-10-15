import Vue from "vue";
import axios from "axios";
import _ from "lodash";
import firebase from "firebase/app";
import { event } from "vue-analytics";

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
            firebase
              .auth()
              .currentUser.sendEmailVerification()
              .catch(error => {
                console.log(error);
              });

            // Add additional data to user profile
            firebase
              .auth()
              .currentUser.updateProfile({
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
            id: user.user.uid,
            name: user.user.displayName,
            email: user.user.email,
            photoUrl: user.user.photoURL,
            ...user.user
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
        .signInWithCustomToken("token")
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
      if (
        !this.state.userData.name ||
        this.state.userData.name !== payload.user.displayName
      )
        data.name = payload.user.displayName;
      if (
        !this.state.userData.email ||
        this.state.userData.email !== payload.user.email
      )
        data.email = payload.user.email;
      if (
        !this.state.userData.userName ||
        this.state.userData.userName !== payload.user.userName
      )
        data.userName =
          payload.user.userName || payload.user.email.split("@")[0].toString();
      if (
        !this.state.userData.photoURL ||
        this.state.userData.photoURL !== payload.user.photoURL
      )
        data.photoURL = payload.user.photoURL;
      // If data is not empty, proceed
      if (!_.isEmpty(data)) dispatch("userData/set", data);
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};
