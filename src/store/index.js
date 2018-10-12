import Vue from "vue";
import Vuex from "vuex";
import createEasyFirestore from "vuex-easy-firestore";
import * as firebase from "firebase";

const userDataModule = {
  firestorePath: "users/{userId}",
  firestoreRefType: "doc", // or "doc"
  moduleName: "userData",
  statePropName: "",
  state: {
    userName: "",
    role: "student"
  },
  // you can also add state/getters/mutations/actions
  // for other config like fillables see "Extra features"
};

const newsFeedModule = {
  firestorePath: "newsFeed",
  firestoreRefType: "collection", // or "doc"
  moduleName: "newsFeed",
  statePropName: "items",
  sync: {
    where: [
      // ["softDeleted", "==", false],
      ["publish", "==", true],
    ],
    orderBy: ["created_at", "desc"]
  }
};

const newsFeedItemAuthorModule = {
  firestorePath: "newsFeed",
  firestoreRefType: "collection", // or "doc"
  moduleName: "newsFeed",
  statePropName: "items",
  // you can also add state/getters/mutations/actions
  // for other config like fillables see "Extra features"
};

const easyFirestores = createEasyFirestore([userDataModule, newsFeedModule], {
  logging: true
});

Vue.use(Vuex);

// Initialize Firebase + Settings
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCzyukgIEawJuXoG9_zVu0utXqc-S4Dh8A",
  authDomain: "face-value-6b3c6.firebaseapp.com",
  databaseURL: "https://face-value-6b3c6.firebaseio.com",
  projectId: "face-value-6b3c6",
  storageBucket: "face-value-6b3c6.appspot.com",
  messagingSenderId: "242553748651"
});
const db = firebaseApp.firestore();
db.settings({ timestampsInSnapshots: true });
Vue.prototype.$db = db;

import shared from "./shared";
import user from "./user";

const store = new Vuex.Store({
  modules: {
    shared,
    user
  },
  plugins: [easyFirestores],
  state: {
    user: null
  },
  mutations: {},
  actions: {
    init: ({ dispatch }, payload) => {
      dispatch("checkForDefaultUserData", { ...payload });
    },
  },
  getters: {
    userData(state) {
      return state.userData;
    },
    isStudent(state) {
      return state.userData && (!state.userData.role || state.userData.role === "student");
    }
  }
});

export {store, firebaseApp};
