import _ from "lodash";
import algoliaSearch from "algoliasearch";
const ALGOLIA_APP_ID = "B2P40N4H7I";
const ALGOLIA_ADMIN_KEY = "0df51b06c9678a484cc44e90687d795d";
const algolia = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

export default {
  methods: {
    addPostIndicies(postData) {
      const AlgoliaUsersIndex = algolia.initIndex("posts");
      const data = {
        objectID: postData.id
      };
      AlgoliaUsersIndex.saveObject(data);
    },
    updateUsersIndicies(userData) {
      const AlgoliaUsersIndex = algolia.initIndex("users");
      const data = {
        objectID: this.user.id,
        id: this.user.id,
        displayName: userData.name,
        userName: userData.userName,
        photoURL: userData.photoURL,
        skills: userData.skills,
        skillsList: _.isObject(userData.skills) && Object.keys(userData.skills)
      };
      AlgoliaUsersIndex.saveObject(data);
    }
  }
};
