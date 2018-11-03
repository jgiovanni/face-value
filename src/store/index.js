import Vue from "vue";
import Vuex from "vuex";
import createEasyFirestore from "vuex-easy-firestore";
import * as Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/messaging";
import "firebase/storage";
import { event } from "vue-analytics";

// Initialize Firebase + Settings
const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyCzyukgIEawJuXoG9_zVu0utXqc-S4Dh8A",
  authDomain: "face-value-6b3c6.firebaseapp.com",
  databaseURL: "https://face-value-6b3c6.firebaseio.com",
  projectId: "face-value-6b3c6",
  storageBucket: "face-value-6b3c6.appspot.com",
  messagingSenderId: "242553748651"
});

const db = Firebase.firestore();
const rtdb = Firebase.database();
let messaging = null;
if (Firebase.messaging.isSupported()) {
  messaging = Firebase.messaging();
  messaging.usePublicVapidKey(
    "BElMLZYkQaSdPof35PbPP-CLdGebTt2iuKrGlg6c8IwFhAE_xgL75IzyGLVNDu2FdNetLGfJG-eqGp19TUV0Z5I"
  );
}

db.settings({ timestampsInSnapshots: true });
Vue.prototype.$db = db;

// Firestore uses a different server timestamp value, so we'll
// create two more constants for Firestore state.

/**
 * Modules for Vuex
 *
 */
const statusModule = {
  firestorePath: "status",
  firestoreRefType: "collection",
  moduleName: "status",
  statePropName: ""
};
const userDataModule = {
  firestorePath: "users/{userId}",
  firestoreRefType: "doc", // or "doc"
  moduleName: "userData",
  statePropName: "",
  sync: {
    // fillables: ["conversations"]
  },
  getters: {
    userData(state) {
      return state;
    }
  }
  // state: {
  //   email: "",
  //   about: "",
  //   userName: "",
  //   photoURL: "",
  //   displayName: "",
  //   name: "",
  //   userNameChanged: false,
  //   role: "student",
  //   conversations: [],
  //   program: null,
  //   programYear: null,
  //   skills: {},
  //   social: {
  //     facebook: null,
  //     twitter: null,
  //     linkedIn: null
  //   }
  // }
  // you can also add state/getters/mutations/actions
  // for other config like fillables see "Extra features"
};
const userDataLikesModule = {
  firestorePath: "likes",
  firestoreRefType: "collection",
  moduleName: "likes",
  statePropName: "",
  sync: {
    where: [["user", "==", "{userId}"]]
  }
};

const newsFeedModule = {
  firestorePath: "newsFeed",
  firestoreRefType: "collection",
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
const profileFeedModule = {
  firestorePath: "newsFeed",
  firestoreRefType: "collection",
  moduleName: "profileFeed",
  statePropName: "items",
  sync: {
    where: [
      // ["softDeleted", "==", false],
      ["author.id", "==", "{userId}"]
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
          photoURL: this.state.userData.photoURL,
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
  moduleName: "collabRequests",
  statePropName: "items",
  sync: {
    where: [["users", "array-contains", "{userId}"]],
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
    statusModule,
    userDataModule,
    userDataLikesModule,
    newsFeedModule,
    chatsModule,
    chatMessagesModule,
    collabsModule,
    collabRequestsModule,
    profileFeedModule
  ],
  {
    logging: true,
    FirebaseDependency: Firebase
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
  mutations: {},
  actions: {
    updateStatus({ state, getters }, payload) {
      this.dispatch("status/patch", {
        id: getters.user.id,
        state: payload,
        last_changed: Firebase.firestore.FieldValue.serverTimestamp()
      }).catch(console.error);
    },
    init: ({ dispatch, state }, payload) => {
      // dispatch("checkForDefaultUserData", { ...payload });
      dispatch("status/openDBChannel").catch(console.error);
      dispatch("likes/openDBChannel", {
        userId: state.user.user.id
      }).catch(console.error);
      dispatch("newsFeed/openDBChannel").catch(console.error);
      dispatch("profileFeed/openDBChannel", {
        userId: state.user.user.id
      }).catch(console.error);
      dispatch("collabs/openDBChannel").catch(console.error);
      dispatch("collabRequests/openDBChannel").catch(console.error);
      dispatch("chats/openDBChannel", {
        userId: payload.uid
      }).catch(console.error);
      if (messaging) {
        // Initialize Push Notifications
        // Request Permission for notifications
        messaging
          .requestPermission()
          .then(() => {
            console.log("Notification permission granted.");
            // Get Instance ID token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.
            messaging
              .getToken()
              .then(currentToken => {
                if (currentToken) {
                  sendTokenToServer(currentToken);
                  // updateUIForPushEnabled(currentToken);
                } else {
                  // Show permission request.
                  console.log(
                    "No Instance ID token available. Request permission to generate one."
                  );
                  // Show permission UI.
                  // updateUIForPushPermissionRequired();
                  setTokenSentToServer(false);
                }
              })
              .catch(err => {
                console.log("An error occurred while retrieving token. ", err);
                // showToken("Error retrieving Instance ID token. ", err);
                setTokenSentToServer(false);
              });
          })
          .catch(err => {
            console.log("Unable to get permission to notify.", err);
          });
        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(function() {
          messaging
            .getToken()
            .then(refreshedToken => {
              console.log("Token refreshed.");
              // Indicate that the new Instance ID token has not yet been sent to the
              // app server.
              setTokenSentToServer(false);
              // Send Instance ID token to app server.
              sendTokenToServer(refreshedToken);
              // ...
            })
            .catch(err => {
              console.log("Unable to retrieve refreshed token ", err);
              // showToken("Unable to retrieve refreshed token ", err);
            });
        });
      }

      // Fetch the current user's ID from Firebase Authentication.
      const uid = Firebase.auth().currentUser.uid;
      const userStatusDatabaseRef = rtdb.ref(`/status/${uid}`);
      const userStatusFirestoreRef = Firebase.firestore().doc(`/status/${uid}`);
      // We'll create two constants which we will write to
      // the Realtime database when this device is offline
      // or online.
      const isOfflineForDatabase = {
        state: "offline",
        last_changed: Firebase.database.ServerValue.TIMESTAMP
      };

      const isOnlineForDatabase = {
        state: "online",
        last_changed: Firebase.database.ServerValue.TIMESTAMP
      };

      const isOfflineForFirestore = {
        state: "offline",
        last_changed: Firebase.firestore.FieldValue.serverTimestamp()
      };

      const isOnlineForFirestore = {
        state: "online",
        last_changed: Firebase.firestore.FieldValue.serverTimestamp()
      };

      Firebase.database()
        .ref(".info/connected")
        .on("value", function(snapshot) {
          if (snapshot.val() === false) {
            // Instead of simply returning, we'll also set Firestore's state
            // to 'offline'. This ensures that our Firestore cache is aware
            // of the switch to 'offline.'
            userStatusFirestoreRef.set(isOfflineForFirestore);
            return;
          }

          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(function() {
              userStatusDatabaseRef.set(isOnlineForDatabase);

              // We'll also add Firestore set here for when we come online.
              userStatusFirestoreRef.set(isOnlineForFirestore);
            });
        });
    }
  },
  getters: {
    isStudent(state) {
      return (
        state.userData &&
        (!state.userData.role || state.userData.role === "student")
      );
    }
  }
});

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log("Sending token to server...");
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log(
      "Token already sent to server so won't send it again unless it changes"
    );
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem("sentToServer") === "1";
}
function setTokenSentToServer(sent) {
  window.localStorage.setItem("sentToServer", sent ? "1" : "0");
}

export { store, firebaseApp };
