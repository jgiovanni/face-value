import _ from "lodash";
import algoliaSearch from "algoliasearch";
import Firebase from "firebase/app";
const PROJECT_ID = "face-value-6b3c6";
const ALGOLIA_APP_ID = "B2P40N4H7I";
const ALGOLIA_SEARCH_KEY = "cf6d307763e48368538e853f7163c2c7";
const ALGOLIA_INDEX = "users";

const algolia = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const AlgoliaSearchIndex = algolia.initIndex(ALGOLIA_INDEX);

export default {
  methods: {
    search(query) {
      // Perform an Algolia search:
      // https://www.algolia.com/doc/api-reference/api-methods/search/
      return AlgoliaSearchIndex.search({
        query
      }).then(responses => {
        // Response from Algolia:
        // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
        return responses.hits;
      });
      // [END search_index_unsecure]
    },
    authenticated_search(query) {
      // [START search_index_secure]
      // Use Firebase Authentication to request the underlying token
      return Firebase.auth()
        .currentUser.getIdToken()
        .then(function(token) {
          // The token is then passed to our getSearchKey Cloud Function
          return fetch(
            `https://us-central1-${PROJECT_ID}.cloudfunctions.net/getSearchKey/`,
            {
              headers: { Authorization: "Bearer " + token }
            }
          );
        })
        .then(function(response) {
          // The Fetch API returns a stream, which we convert into a JSON object.
          return response.json();
        })
        .then(function(data) {
          // Perform the search as usual.
          return AlgoliaSearchIndex.search({ query });
        })
        .then(function(responses) {
          // Finally, use the search 'hits' returned from Algolia.
          return responses.hits;
        });
      // [END search_index_secure]
    },
    // search(query) {
    //   return this.unauthenticated_search(query).catch(err => {
    //     console.warn(err);
    //   });
    // }
  }
};
