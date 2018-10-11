<template>
	<div class="container">
		<div class="row">

			<!-- Main Content -->

			<main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">


				<!-- News Feed Form  -->
				<NewsFeedFormBlock/>
				<!-- ... end News Feed Form  -->

				<div id="newsfeed-items-grid">
					<NewsFeedItemBlock v-for="item in newsFeed.items" :key="item.key" :item="item" />
				</div>

				<a id="load-more-button" href="#" @click.prevent="loadMore" class="btn btn-control btn-more" data-load-link="items-to-load.html"
				   data-container="newsfeed-items-grid">
					<svg class="olymp-three-dots-icon">
						<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
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
  import {mapState} from "vuex";

  // @ is an alias to /src
  import HelloWorld from "@/components/HelloWorld.vue";
  import NewsFeedFormBlock from '../components/blocks/NewsFeedForm';
  import NewsFeedItemBlock from '../components/blocks/NewsFeedItem';
  import HomeLeftAside from '../components/blocks/HomeLeftAside';
  import HomeRightAside from '../components/blocks/HomeRightAside';

  export default {
    name: "Home",
    components: { NewsFeedFormBlock, NewsFeedItemBlock, HomeLeftAside, HomeRightAside },
    data() {
      return {}
    },
    computed: {
      ...mapState(["newsFeed"]),
    },
		methods: {
      loadMore() {}
    }
  };
</script>
