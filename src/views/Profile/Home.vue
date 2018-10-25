<template>
	<div class="container">
		<div class="row">

			<!-- Main Content -->

			<div class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
				<transition-group tag="div" name="fadeDown" id="newsfeed-items-grid">
					<NewsFeedItemBlock v-for="item in profileFeed.items" :key="item.id" :item="item" />
				</transition-group>

				<a id="load-more-button" href="#" @click.prevent="loadMore" class="btn btn-control btn-more" data-load-link="items-to-load.html"
				   data-container="newsfeed-items-grid">
					<svg class="olymp-three-dots-icon">
						<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
					</svg>
				</a>
			</div>
			<!-- ... end Main Content -->


			<!-- Left Sidebar -->
			<LeftSidebar />
			<!-- ... end Left Sidebar -->
		</div>
	</div>
</template>
<style>
</style>
<script type="text/javascript">
import { mapState } from "vuex";
import LeftSidebar from "../../components/blocks/Profile/LeftSidebar";
import NewsFeedItemBlock from "../../components/blocks/NewsFeedItem";
export default {
  name: "Home",
  components: { LeftSidebar, NewsFeedItemBlock },
  data() {
    return {
      filteredNewsFeed: []
    };
  },
  computed: {
    ...mapState(["profileFeed"])
  },
  methods: {},
  mounted() {}
};
</script>
