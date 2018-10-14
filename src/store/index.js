import Vue from "vue";
import Vuex from "vuex";
import createEasyFirestore from "vuex-easy-firestore";
import firebase from "firebase/app";
// import firestore from "firebase/firestore";
import { event } from "vue-analytics";

// Initialize Firebase + Settings
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCzyukgIEawJuXoG9_zVu0utXqc-S4Dh8A",
  authDomain: "face-value-6b3c6.firebaseapp.com",
  databaseURL: "https://face-value-6b3c6.firebaseio.com",
  projectId: "face-value-6b3c6",
  storageBucket: "face-value-6b3c6.appspot.com",
  messagingSenderId: "242553748651"
});

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
Vue.prototype.$db = db;

const userDataModule = {
  firestorePath: "users/{userId}",
  firestoreRefType: "doc", // or "doc"
  moduleName: "userData",
  statePropName: "",
  state: {
    userName: "",
    role: "student",
    conversations: []
  }
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
      ["publish", "==", true]
    ],
    orderBy: ["created_at", "desc"],
    insertHook(updateStore, doc, store) {
      doc.created_at = {
        seconds: parseInt(new Date().getTime() / 1000)
      };
      updateStore(doc);
    }
  }
};

// Chats + Messages Modules
const chatsModule = {
  firestorePath: "chats",
  firestoreRefType: "collection", // or "doc"
  moduleName: "chats",
  statePropName: "items",
  sync: {
    where: [
      // ["softDeleted", "==", false],
      ["membersList", "array-contains", "{userId}"]
    ],
    insertHook(updateStore, doc, store) {
      doc.created_at = {
        seconds: parseInt(new Date().getTime() / 1000)
      };
      updateStore(doc);
    }
  },
  actions: {
    sendCollabRequest(context, { chat, collabRequest }) {
      return this.dispatch("chats/patch", {
        id: chat.id,
        latestMessage: "Collab Requested",
        collab: {
          collab_id: null,
          request_id: collabRequest,
          requested_by: this.state.user.user.id
        }
      })
        .then(console.log)
        .catch(console.error);
    }
  }
};
const chatMessagesModule = {
  firestorePath: "chats/{chatId}/messages",
  firestoreRefType: "collection", // or "doc"
  moduleName: "chats/messages",
  statePropName: "items",
  sync: {
    orderBy: ["created_at"],
    insertHook(updateStore, doc, store) {
      doc.created_at = {
        seconds: parseInt(new Date().getTime() / 1000)
      };
      updateStore(doc);
    }
  },
  actions: {
    getMessagesByChat({ commit }, payload) {
      return db
        .collection("chats")
        .doc(payload.id)
        .collection("messages")
        .orderBy("created_at")
        .limit(50)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // you have to manually add the doc with `fetch`
            const fetchedDoc = doc.data();
            fetchedDoc.id = doc.id;
            this.commit("chats/messages/INSERT_DOC", fetchedDoc);
            // also don't forget that in this case `defaultValues` will not be applied
          });
        })
        .catch(console.error);
    },
    postMessage(
      context,
      { message, chat, additionalMessageData, additionalChatData }
    ) {
      const messageObj = {
        body: message,
        author: {
          id: this.state.user.user.id,
          displayName: this.state.userData.name,
          photoUrl: this.state.userData.photoURL,
          userName: this.state.userData.userName
        },
        ...additionalMessageData
      };
      this.dispatch("chats/patch", {
        id: chat.id,
        latestMessage: message,
        ...additionalChatData
      })
        .then(console.log)
        .catch(console.error);
      return this.dispatch("chats/messages/set", messageObj)
        .then(console.log)
        .catch(console.error);
    }
  }
};

// Collaborations + Requests Modules
const collabsModule = {
  firestorePath: "collabs",
  firestoreRefType: "collection", // or "doc"
  moduleName: "collabs",
  statePropName: "items",
  sync: {
    insertHook(updateStore, doc, store) {
      doc.created_at = {
        seconds: parseInt(new Date().getTime() / 1000)
      };
      updateStore(doc);
    }
  }
};
const collabRequestsModule = {
  firestorePath: "collabRequests",
  firestoreRefType: "collection", // or "doc"
  moduleName: "collabs/requests",
  statePropName: "items",
  sync: {
    where: [["unconfirmedList", "array-contains", "{userId}"]],
    insertHook(updateStore, doc, store) {
      doc.created_at = {
        seconds: parseInt(new Date().getTime() / 1000)
      };
      updateStore(doc);
    }
  }
};

const easyFirestores = createEasyFirestore(
  [
    userDataModule,
    newsFeedModule,
    chatsModule,
    chatMessagesModule,
    collabsModule,
    collabRequestsModule
  ],
  {
    logging: true
  }
);

Vue.use(Vuex);

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
      dispatch("newsFeed/openDBChannel")
        .then(console.log)
        .catch(console.error);
      dispatch("collabs/openDBChannel")
        .then(console.log)
        .catch(console.error);
      dispatch("collabs/requests/openDBChannel")
        .then(console.log)
        .catch(console.error);
      dispatch("chats/openDBChannel", { userId: payload.uid })
        .then(console.log)
        .catch(console.error);
    }
  },
  getters: {
    userData(state) {
      return state.userData;
    },
    isStudent(state) {
      return (
        state.userData &&
        (!state.userData.role || state.userData.role === "student")
      );
    }
  }
});

export { store, firebaseApp };
