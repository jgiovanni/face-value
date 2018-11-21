<template>
  <div class="container">
    <div class="row">
      <!-- Main Content -->

      <div
        class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12"
      >
        <transition-group tag="div" name="fadeDown" id="newsfeed-items-grid">
          <NewsFeedItemBlock
            v-for="item in profileFeed.items"
            :key="item.id"
            :item="item"
          />
        </transition-group>

        <!--
          <a id="load-more-button" href="#" @click.prevent="loadMore" class="btn btn-control btn-more" data-load-link="items-to-load.html"
             data-container="newsfeed-items-grid">
          	<svg class="olymp-three-dots-icon">
          		<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
          	</svg>
          </a>
        -->
      </div>
      <!-- ... end Main Content -->

      <!-- Left Sidebar -->
      <LeftSidebar :profile="profile" />
      <!-- ... end Left Sidebar -->
    </div>
  </div>
</template>
<style></style>
<script type="text/javascript">
import _ from "lodash";
import { mapState } from "vuex";
import LeftSidebar from "../../components/blocks/Profile/LeftSidebar";
import NewsFeedItemBlock from "../../components/blocks/NewsFeedItem";

export default {
  name: "Home",
  components: { LeftSidebar, NewsFeedItemBlock },
  props: ["profile"],
  data() {
    return {
      filteredNewsFeed: [],
      profileFeed: []
    };
  },
  computed: {
    // ...mapState(["profileFeed"])
  },
  watch: {
    $route: "fetchFeed",
    profile() {
      this.fetchFeed();
    }
  },
  methods: {
    fetchFeed() {
      console.log(this.profile);
      this.$store.dispatch("profileFeed/fetch", {whereFilters: [["author.id", "==", this.profile.id]], orderBy: ["created_at", "desc"]})
        .then(querySnapshot => {
          console.log(querySnapshot);
          if (querySnapshot.done === true) {
            // `{done: true}` is returned when everything is already fetched and there are 0 docs:
            return "0 docs left to retrieve";
          }
          // here you can the Firestore `querySnapshot` which is returned
          querySnapshot.forEach(doc => {
            // you have to manually add the doc with `fetch`
            const fetchedDoc = doc.data();
            fetchedDoc.id = doc.id;
            // this.profileFeed[doc.id] = fetchedDoc;
            console.log(fetchedDoc);
            this.profileFeed.push(fetchedDoc);
            // also don't forget that in this case `defaultValues` will not be applied
          });
        })
        .catch(console.error);
    }
  },
  mounted() {
    // fetch the data when the view is created and the data is
    // already being observed
    if (this.profile) this.fetchFeed();
  },
  created() {

  }
};
</script>
