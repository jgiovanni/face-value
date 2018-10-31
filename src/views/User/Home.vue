<template>
	<div class="container">
		<div class="row">

			<!-- Main Content -->

			<!--<div class="col col-xl-8 order-xl-2 col-lg-8 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
				<transition-group tag="div" name="fadeDown" id="newsfeed-items-grid">
					<NewsFeedItemBlock v-for="item in profileFeed.items" :key="item.id" :item="item" />
				</transition-group>

				<a id="load-more-button" href="#" @click.prevent="loadMore" class="btn btn-control btn-more" data-load-link="items-to-load.html"
				   data-container="newsfeed-items-grid">
					<svg class="olymp-three-dots-icon">
						<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
					</svg>
				</a>
			</div>-->
			<!-- ... end Main Content -->


			<!-- Left Sidebar -->
			<div class="col col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12">
				<div class="ui-block">
					<div class="ui-block-title">
						<h6 class="title">Personal Info</h6>
						<!--<a href="#" class="more"><svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>-->
					</div>
					<div class="ui-block-content">


						<!-- W-Personal-Info -->

						<ul class="widget w-personal-info">
							<li>
								<span class="title">About Me:</span>
								<span class="text" v-text="profile.about"></span>
							</li>
							<li>
								<span class="title">Skills:</span>
								<span class="text">
									<router-link :to="{ name: 'home',  query: { skill }}" v-for="(val, skill) in profile.skills" :key="skill">{{ skill }}, </router-link>
								</span>
							</li>
							<!--<li>
								<span class="title">Birthday:</span>
								<span class="text">December 14th, 1980</span>
							</li>-->

						</ul>

						<!-- ... end W-Personal-Info -->
						<!-- W-Socials -->

						<div class="widget w-socials">
							<h6 class="title">Other Social Networks:</h6>
							<a target="_blank" v-if="userData.website" :href="userData.website" class="social-item bg-dark" style="text-transform: capitalize">
								<i class="fa fa-globe" aria-hidden="true"></i>
								Website
							</a>
							<a target="_blank" v-for="(val, key) in userData.social" :key="key" :href="val" class="social-item" :class="getSocialBg(key)" style="text-transform: capitalize">
								<i class="fab" :class="getSocialIcon(key)" aria-hidden="true"></i>
								{{ key }}
							</a>
						</div>


						<!-- ... end W-Socials -->
					</div>
				</div>
			</div>
			<!-- ... end Left Sidebar -->
		</div>
	</div>
</template>
<style>
</style>
<script type="text/javascript">
import _ from "lodash";
import { mapState } from "vuex";
import NewsFeedItemBlock from "../../components/blocks/NewsFeedItem";

export default {
  name: "Home",
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  components: { NewsFeedItemBlock },
  data() {
    return {
      filteredNewsFeed: []
    };
  },
  computed: {
    // ...mapState(["profileFeed"])
  },
  methods: {
    getSocialIcon(social) {
      switch (social) {
        case "facebook":
          return "fa-facebook-f";
        case "linkedIn":
          return "fa-linkedin-in";
        default:
          return `fa-${social}`;
      }
    },
    getSocialBg(social) {
      switch (social) {
        case "facebook":
          return "bg-facebook";
        case "twitter":
          return "bg-twitter";
        case "dribbble":
          return "bg-dribbble";
        case "instagram":
          return "bg-dribbble";
        case "linkedIn":
          return "bg-blue";
        default:
          return `bg-secondary`;
      }
    }
  },
  mounted() {},
  beforeRouteLeave(to, next) {}
};
</script>
