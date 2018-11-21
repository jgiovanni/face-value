import algoliaSearch from "algoliasearch";
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
            // firebase
            //   .auth()
            //   .currentUser.sendEmailVerification()
            //   .catch(console.error);

            // Add additional data to user profile
            firebase
              .auth()
              .currentUser.updateProfile({
                displayName: payload.displayName
              })
              .then(() => {
                const newUser = {
                  id: user.user.uid,
                  name: user.user.displayName,
                  email: user.user.email,
                  photoURL: `https://ui-avatars.com/api/?name=${payload.displayName}&size=512`,
                  userName: payload.userName
                };
                // firebase.firestore().collection("users")
                //   .doc(newUser.id)
                //   .set({
                //     ...newUser,
                //     uid: newUser.id
                //   });
                dispatch("userData/patch", {
                  ...newUser,
                  uid: newUser.id
                });
                commit("setUser", newUser);
                resolve(user.user);
              })
              .catch(console.error);
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
              photoURL: user.photoURL
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
            photoURL: user.user.photoURL,
            ...user.user
          };
          dispatch("checkForDefaultUserData", {
            user: newUser,
            ...payload,
            userName: newUser.email.split("@")[0].toString()
          });
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
            photoURL: user.photoURL,
            ...user
          };
          dispatch("checkForDefaultUserData", {
            user: newUser,
            ...payload,
            userName: newUser.email.split("@")[0].toString()
          });
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
            photoURL: user.photoURL
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
        id: payload.uid || payload.id,
        name: payload.displayName || payload.name,
        email: payload.email,
        photoURL: payload.photoURL
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
      // this.$store.commit("setUserData", null);
      this.dispatch("userData/closeDBChannel", { clearModule: true });
      this.dispatch("likes/closeDBChannel", { clearModule: true });
      this.dispatch("newsFeed/closeDBChannel", { clearModule: true });
      this.dispatch("profileFeed/closeDBChannel", { clearModule: true });
      this.dispatch("collabs/closeDBChannel", { clearModule: true });
      this.dispatch("collabRequests/closeDBChannel", {
        clearModule: true
      });
      this.dispatch("chats/closeDBChannel", { clearModule: true });
    },
    checkForDefaultUserData({ commit, state, dispatch, getters }, payload) {
      let data = {
        id: payload.user.id,
        uid: payload.user.id
      };
      if (
        !getters["userData/userData"].name ||
        getters["userData/userData"].name !== (payload.user.displayName || payload.user.name)
      )
        data.name = (payload.user.displayName || payload.user.name);
      if (
        !getters["userData/userData"].email ||
        getters["userData/userData"].email !== payload.user.email
      )
        data.email = payload.user.email;
      if (
        !getters["userData/userData"].photoURL ||
        getters["userData/userData"].photoURL !== payload.user.photoURL
      )
        data.photoURL = payload.user.photoURL;
      if (
        !getters["userData/userData"].userName ||
        getters["userData/userData"].userName !== payload.user.userName
      )
        data.userName = payload.user.userName;
      // If data is not empty, proceed
      console.log(data);
      if (!_.isEmpty(data)) dispatch("userData/patch", data);
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};
