<template>
  <div class="container">
    <div class="row">
      <!-- Main Content -->

      <main
        class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12"
      >
        <div class="ui-block" v-if="$route.query.skill">
          <div class="ui-block-title">
            <div class="h6 title">
              Showing {{ orderedNewsFeed.length }}
              Post for: "<span class="c-primary">{{ $route.query.skill }}</span>"
            </div>
          </div>
        </div>

        <transition-group tag="div" name="fadeDown" id="newsfeed-items-grid">
          <NewsFeedItemBlock
            v-for="item in orderedNewsFeed"
            :key="item.id"
            :item="item"
          />
        </transition-group>

        <b-link v-if="newsFeedSize > 50"
          id="load-more-button"
          @click.prevent="loadMore"
          class="btn btn-control btn-more"
        >
          <svg class="olymp-three-dots-icon">
            <use
              xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"
            ></use>
          </svg>
        </b-link>
      </main>

      <!-- ... end Main Content -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

// @ is an alias to /src
import NewsFeedFormBlock from "../components/blocks/NewsFeedForm";
import NewsFeedItemBlock from "../components/blocks/NewsFeedItem";

export default {
  name: "SearchResults",
  components: { NewsFeedItemBlock },
  data() {
    return {
      newsFeed: {},
      newsFeedSize: 0
    };
  },
  computed: {
    orderedNewsFeed() {
      return _.sortBy(this.newsFeed, item => item.created_at.seconds).reverse();
    }
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.newsFeed = {};
      let self = this;
      this.$db
        .collection("newsFeed")
        // .where(`skills.${this.$route.query.skill}`, "==", true)
        // .where("skills", "array-contains", this.$route.query.skill)
        .orderBy(`skills.${this.$route.query.skill}`, "desc")
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot);
          if (querySnapshot.done) {
            // `{done: true}` is returned when everything is already fetched and there are 0 docs:
            return "0 docs left to retrieve";
          }
          self.newsFeedSize = querySnapshot.size;
          querySnapshot.forEach(doc => {
            // you have to manually add the doc with `fetch`
            const fetchedDoc = doc.data();
            fetchedDoc.id = doc.id;
            self.$set(self.newsFeed, doc.id, fetchedDoc);
            // also don't forget that in this case `defaultValues` will not be applied
          });
        })
        .catch(console.error);
      // this.$store
      //   .dispatch("newsFeed/fetch", {
      //     whereFilters: [[`skills.${this.$route.query.skill}`, "==", true]],
      //     orderBy: []
      //   })
      //   .then(querySnapshot => {
      //     console.log(querySnapshot);
      //     if (querySnapshot.done) {
      //       // `{done: true}` is returned when everything is already fetched and there are 0 docs:
      //       return "0 docs left to retrieve";
      //     }
      //     querySnapshot.forEach(doc => {
      //       // you have to manually add the doc with `fetch`
      //       const fetchedDoc = doc.data();
      //       fetchedDoc.id = doc.id;
      //       self.$set(self.newsFeed, doc.id, fetchedDoc);
      //       // also don't forget that in this case `defaultValues` will not be applied
      //     });
      //   })
      //   .catch(console.error);
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    if (this.$route.query.skill) this.fetchData();
  }
};
</script>
