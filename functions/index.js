const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
const nodemailer = require('nodemailer');
// const Firestore = require('@google-cloud/firestore');
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

// [START init_algolia]
// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'users';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
const algolia = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
// [END init_algolia]


// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.aggregateLikes = functions.firestore
  .document('newsFeed/{itemId}/likes/{likeId}')
  .onWrite((change, context) => {
    const likeId = context.params.likeId;
    const itemId = context.params.itemId;
    // ref to the parent document
    const docRef = firestore.collection('newsFeed').doc(itemId);
    // get all likes and aggregate
    return docRef.collection('likes').orderBy('created_at', 'desc')
    .get()
    .then(querySnapshot => {
      // get the total like count
      const like_count = querySnapshot.size;
      const recent_likes = [];
      // add data from the 5 most recent likes to the array
      querySnapshot.forEach(doc => {
        recent_likes.push( doc.data() )
      });
      recent_likes.splice(5);
      // record last like timestamp
      const last_activity = recent_likes.length > 0 ? recent_likes[0].created_at : admin.firestore.FieldValue.serverTimestamp();
      // data to update on the document
      const data = { like_count, recent_likes, last_activity };
      // run update
      return docRef.update(data)
    })
    .catch(err => console.log(err) )
  });

// exports.onUserDataCreated = functions.firestore
//   .document('users/{userId}')
//   .onCreate((snap, context) => {
//     // Get the userData
//     const userData = snap.data();
//     const userId = context.params.userId;
//     // Add an 'objectID' field which Algolia requires
//     userData.objectID = userId;
//
//     // Write to the algolia index
//     const index = algolia.initIndex(ALGOLIA_INDEX_NAME);
//     return index.saveObject(userData);
//   });
exports.updateUserDataOnCollections = functions.firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    const userId = context.params.userId;
    const prevUserData = change.before.data();
    const newUserData = change.after.data();
    // Consider UserData params to update
    const paramsToUpdate = {
      userName: prevUserData.userName !== newUserData.prevUserData,
      photoURL: prevUserData.photoURL !== newUserData.photoURL,
      displayName: prevUserData.displayName !== newUserData.displayName,
    };
    // UserName
    const prevUserName = prevUserData.userName;
    const newUserName = newUserData.userName;
    // photoUrl
    const prevPhotoUrl = prevUserData.photoURL;
    const newPhotoUrl = newUserData.photoURL;
    // displayName
    const prevDisplayName = prevUserData.displayName;
    const newDisplayName = newUserData.displayName;
    
    /** Collections to update:
     * NewsFeed.author
     * NewsFeed.likes + recent_likes
     * likes.newsFeedAuthor
     * collabRequests.from
     * chats.membersData[{userId}]
     *
     */
      // const newsFeedRef = firestore.collection('newsFeed')
      // .where('author.id', '==', userId)
    // const likesRef = firestore.collection('likes')
    // const collabRequestsRef = firestore.collection('collabRequests')
    // const chatsRef = firestore.collection('chats')
    
    // Write to the algolia index
    // newUserData.objectID = userId;
    // const index = algolia.initIndex(ALGOLIA_INDEX_NAME);
    // return index.saveObject(newUserData);
  
  
});
// exports.onUserDataDeleted = functions.firestore
//   .document('users/{userId}')
//   .onCreate((snap, context) => {
//     // Get the userData
//     const userId = context.params.userId;
//
//     // Delete from the algolia index
//     const index = algolia.initIndex(ALGOLIA_INDEX_NAME);
//     return index.deleteObject(userId);
//   });


// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
exports.onUserStatusChanged = functions.database
  .ref('/status/{uid}').onUpdate((change, context) => {
    // Get the data written to Realtime Database
    const eventStatus = change.after.val();
    
    // Then use other event data to create a reference to the
    // corresponding Firestore document.
    const userStatusFirestoreRef = firestore.doc(`status/${context.params.uid}`);
    
    // It is likely that the Realtime Database change that triggered
    // this event has already been overwritten by a fast change in
    // online / offline status, so we'll re-read the current data
    // and compare the timestamps.
    return change.after.ref.once('value').then((statusSnapshot) => {
      const status = statusSnapshot.val();
      console.log(status, eventStatus);
      // If the current timestamp for this data is newer than
      // the data that triggered this event, we exit this function.
      if (status.last_changed > eventStatus.last_changed) {
        return null;
      }
      
      // Otherwise, we convert the last_changed field to a Date
      eventStatus.last_changed = new Date(eventStatus.last_changed);
      
      // ... and write it to Firestore.
      return userStatusFirestoreRef.set(eventStatus);
    });
  });