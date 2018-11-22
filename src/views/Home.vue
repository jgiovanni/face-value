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
              Showing 12 Results for: "<span class="c-primary">{{
                $route.query.skill
              }}</span
              >"
            </div>
          </div>
        </div>

        <!-- News Feed Form -->
        <NewsFeedFormBlock />
        <!-- ... end News Feed Form -->

        <transition-group tag="div" name="fadeDown" id="newsfeed-items-grid">
          <NewsFeedItemBlock
            v-for="item in orderedNewsFeed"
            :key="item.id"
            :item="item"
          />
        </transition-group>

        <a
          id="load-more-button"
          href="#"
          @click.prevent="loadMore"
          class="btn btn-control btn-more"
          data-load-link="items-to-load.html"
          data-container="newsfeed-items-grid"
        >
          <svg class="olymp-three-dots-icon">
            <use
              xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"
            ></use>
          </svg>
        </a>
      </main>

      <!-- ... end Main Content -->

      <!-- Left Sidebar -->
      <HomeLeftAside />
      <!-- ... end Left Sidebar -->

      <!-- Right Sidebar -->
      <HomeRightAside />
      <!-- ... end Right Sidebar -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

// @ is an alias to /src
import NewsFeedFormBlock from "../components/blocks/NewsFeedForm";
import NewsFeedItemBlock from "../components/blocks/NewsFeedItem";
import HomeLeftAside from "../components/blocks/Home/LeftAside";
import HomeRightAside from "../components/blocks/Home/RightAside";

export default {
  name: "Home",
  components: {
    NewsFeedFormBlock,
    NewsFeedItemBlock,
    HomeLeftAside,
    HomeRightAside
  },
  data() {
    return {};
  },
  metaInfo() {
    return {
      title: this.$route.name
    };
  },
  computed: {
    ...mapState(["newsFeed"]),
    orderedNewsFeed() {
      return _.sortBy(
        this.newsFeed.items,
        item => item.created_at.seconds
      ).reverse();
    }
  },
  methods: {
    loadMore() {}
  },
  created() {
    // this.$root.$emit("showAlert", "Testing this now 1 2 3")
    this.$root.$on("NewsFeed::Search", query => {
      console.log("Filter List");
      console.log(query);
      if (query) {
        this.$store
          .dispatch("newsFeed/fetchAndAdd", {
            whereFilters: [[`skills.${query}`, "==", true]],
            orderBy: []
          })
          .then(querySnapshot => {

            if (querySnapshot.done === true) {
              // `{done: true}` is returned when everything is already fetched and there are 0 docs:
              return "0 docs left to retrieve";
            }
            // Nothing more needs to be done. Docs are automatically added to `pokemonBox` and can be patched, deleted, etc.
            // docs will also receive `defaultValues` you have set up. (see "defaultValues set after server retrieval" under Extra features)
          })
          .catch(console.error);
      }
    });
  }
};
</script>
