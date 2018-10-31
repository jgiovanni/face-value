<template>
	<div class="container">
		<div class="row">

			<!-- Main Content -->

			<main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
				<div class="ui-block" v-if="$route.query.skill">
					<div class="ui-block-title">
						<div class="h6 title">Showing 12 Results for: "<span class="c-primary">{{ $route.query.skill }}</span>"</div>
					</div>
				</div>

				<!-- News Feed Form  -->
				<NewsFeedFormBlock/>
				<!-- ... end News Feed Form  -->

				<transition-group tag="div" name="fadeDown" id="newsfeed-items-grid">
					<NewsFeedItemBlock v-for="item in orderedNewsFeed" :key="item.id" :item="item" />
				</transition-group>

				<a id="load-more-button" href="#" @click.prevent="loadMore" class="btn btn-control btn-more">
					<svg class="olymp-three-dots-icon">
						<use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
					</svg>
				</a>

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
  components: { NewsFeedFormBlock, NewsFeedItemBlock },
  data() {
    return {};
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
  }
};
</script>
