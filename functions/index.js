const functions = require('firebase-functions');
// const Firestore = require('@google-cloud/firestore');
const admin = require('firebase-admin');
admin.initializeApp();

// const firestore = firebase.firestore();
// const settings = {timestampsInSnapshots: true};
// firestore.settings(settings);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.aggregateLikes = functions.firestore
  .document('newsFeed/{itemId}/likes/{likeId}')
  .onWrite((change, context) => {
    const likeId = context.params.likeId;
    const itemId = context.params.itemId;
    // ref to the parent document
    const docRef = admin.firestore().collection('newsFeed').doc(itemId);
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
