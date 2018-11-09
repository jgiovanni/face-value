<template>
	<div>
		<!--<ProfileHeader />-->

		<div class="profile-settings-responsive" :class="{ 'open': mobileNavState }">

			<b-link @click="mobileNavState = !mobileNavState" class="js-profile-settings-open profile-settings-open" >
				<i class="fa" :class="[ mobileNavState ? 'fa-angle-left' : 'fa-angle-right']" aria-hidden="true"></i>
			</b-link>
			<div class="mCustomScrollbar" data-mcs-theme="dark">
				<div class="ui-block">
					<!-- Your Profile  -->
					<div class="your-profile">
						<div class="ui-block-title ui-block-title-small">
							<h6 class="title">
								Your PROFILE
							</h6>
						</div>

						<div id="accordion" role="tablist" aria-multiselectable="true">
							<div class="card">
								<div class="card-header" role="tab" id="headingOne">
									<h6 class="mb-0">
										<b-link v-b-toggle.collapse1>
											Profile Settings
											<svg class="olymp-dropdown-arrow-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use>
											</svg>
										</b-link>
									</h6>
								</div>

								<b-collapse visible id="collapse1" class="collapse show">
									<ul class="your-profile-menu">
										<li v-for="route in profileRoutes" :key="route.path">
											<router-link :to="route.path ? `/account/${route.path}` : '/account'"
											             active-class="text-primary" exact
											             v-text="route.meta.title || route.name"></router-link>
										</li>
										<li>
											<router-link class="h6 title text-success" :to="profileUrl">View Public Profile</router-link>
										</li>
									</ul>
								</b-collapse>
							</div>
						</div>

						<div class="ui-block-title">
							<a href="33-YourAccount-Notifications.html" class="h6 title">Notifications</a>
							<a href="#" class="items-round-little bg-primary">8</a>
						</div>
					</div>
					<!-- ... end Your Profile  -->
				</div>
			</div>
		</div>


		<div class="container">
			<div class="row">
				<div class="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
					<!--<transition name="fade">-->
						<router-view/>
					<!--</transition>-->
				</div>

				<div class="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12  responsive-display-none">
					<div class="ui-block">
						<!-- Your Profile  -->
						<div class="your-profile">
							<div class="ui-block-title ui-block-title-small">
								<h6 class="title">
									Your PROFILE
								</h6>
							</div>

							<div id="accordion" role="tablist" aria-multiselectable="true">
								<div class="card">
									<div class="card-header" role="tab" id="headingOne">
										<h6 class="mb-0">
											<b-link v-b-toggle.collapse1>
												Profile Settings
												<svg class="olymp-dropdown-arrow-icon">
													<use xlink:href="svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use>
												</svg>
											</b-link>
										</h6>
									</div>

									<b-collapse visible id="collapse1" class="collapse show">
										<ul class="your-profile-menu">
											<li v-for="route in profileRoutes" :key="route.path">
												<router-link :to="route.path ? `/account/${route.path}` : '/account'"
												             active-class="text-primary" exact
												             v-text="route.meta.title || route.name"></router-link>
											</li>
											<li>
												<router-link class="h6 title text-success" :to="profileUrl">View Public Profile</router-link>
											</li>
										</ul>
									</b-collapse>
								</div>
							</div>

							<div class="ui-block-title">
								<a href="33-YourAccount-Notifications.html" class="h6 title">Notifications</a>
								<a href="#" class="items-round-little bg-primary">8</a>
							</div>
						</div>
						<!-- ... end Your Profile  -->
					</div>

				</div>
			</div>
		</div>

	</div>
</template>
<style>
</style>
<script type="text/javascript">
import ProfileHeader from "../components/blocks/Profile/ProfileHeader";

export default {
  name: "Account",
  components: { ProfileHeader },
  data() {
    return {
      mobileNavState: false,
      profileRoutes: this.$router.options.routes
        .find(route => route.path === "/account")
        .children.filter(route => route.meta.navigation === "settings")
    };
  },
  computed: {
    webHost() {
      return window.location.host;
    },
    profileUrl() {
      return "/fv/" + this.userData.userName;
    },
  },
  methods: {},
  mounted() {}
};
</script>
