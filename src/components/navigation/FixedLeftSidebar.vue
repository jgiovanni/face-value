<template>
	<div>
		<!-- Fixed Sidebar Left -->

		<div class="fixed-sidebar" :class="{ 'open': sidebarState }">
			<div class="fixed-sidebar-left sidebar--small" id="sidebar-left">

				<router-link to="/" class="logo">
					<div class="img-wrap">
						<img src="/img/logo.png" alt="Face Value">
					</div>
				</router-link>

				<div class="mCustomScrollbar" data-mcs-theme="dark">
					<ul class="left-menu">
						<li>
							<a href="#" @click.prevent="toggleSidebar" class="">
								<svg class="olymp-menu-icon left-menu-icon"  v-b-tooltip.hover.right title="OPEN MENU"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>
							</a>
						</li>
						<li v-for="route in routes" :key="route.name">
							<router-link :to="route.path">
								<svg class="left-menu-icon" :class="route.meta.navigationIcon" v-b-tooltip.hover.right :title="route.meta.navigationTitle">
									<use v-bind:xlink:href="`/svg-icons/sprites/icons.svg#${route.meta.navigationIcon}`"></use>
								</svg>
							</router-link>
						</li>
					</ul>
				</div>
			</div>

			<div class="fixed-sidebar-left sidebar--large" id="sidebar-left-1">
				<router-link to="/" class="logo">
					<div class="img-wrap">
						<img src="/img/logo.png" width="100" alt="Face Value">
					</div>
					<div class="title-block">
						<h6 class="logo-title">Face Value</h6>
					</div>
				</router-link>

				<div class="mCustomScrollbar" data-mcs-theme="dark">
					<ul class="left-menu">
						<li>
							<b-link @click.prevent="toggleSidebar" class="js-sidebar-open">
								<svg class="olymp-close-icon left-menu-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
								<span class="left-menu-title">Collapse Menu</span>
							</b-link>
						</li>
						<li v-for="route in routes" :key="route.name">
							<router-link :to="route.path">
								<svg class="left-menu-icon" :class="route.meta.navigationIcon" v-b-tooltip.hover.right :title="route.meta.navigationTitle">
									<use v-bind:xlink:href="`/svg-icons/sprites/icons.svg#${route.meta.navigationIcon}`"></use>
								</svg>
								<span class="left-menu-title" v-text="route.meta.navigationTitle"></span>
							</router-link>
						</li>
					</ul>

					<div class="profile-completion">

						<div class="skills-item">
							<div class="skills-item-info">
								<span class="skills-item-title">Profile Completion</span>
								<span class="skills-item-count"><span class="count-animate" data-speed="1000" data-refresh-interval="50" data-to="74" data-from="0"></span><span class="units">74%</span></span>
							</div>
							<div class="skills-item-meter">
								<b-progress style="width: 100%; opacity: 1;top: 0;" variant="success" :value="76" striped animated class="skills-item-meter-active mb-3"></b-progress>
							</div>
						</div>

						<span>Complete <router-link to="/profile">your profile</router-link> so people can know more about you!</span>

					</div>
				</div>
			</div>
		</div>

		<!-- ... end Fixed Sidebar Left -->

		<!-- Fixed Sidebar Left -->

		<div class="fixed-sidebar fixed-sidebar-responsive" :class="{ 'open': sidebarState }">

			<div class="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
				<b-link @click.prevent="toggleSidebar" class="logo js-sidebar-open">
					<img src="/img/logo.png" alt="Face Value">
				</b-link>

			</div>

			<div class="fixed-sidebar-left sidebar--large" id="sidebar-left-1-responsive">
				<a href="#" class="logo">
					<div class="img-wrap">
						<img src="/img/logo.png" width="50" alt="Face Value">
					</div>
					<div class="title-block">
						<h6 class="logo-title">Face Value</h6>
					</div>
				</a>

				<div class="mCustomScrollbar" data-mcs-theme="dark">

					<div class="control-block">
						<div class="author-page author vcard inline-items">
							<div class="author-thumb">
								<img :src="userData.photoURL" height="36" width="36" :alt="userData.name" class="avatar">
								<span class="icon-status online"></span>
							</div>
							<router-link to="/profile" class="author-name fn">
								<div class="author-title">
									{{ userData.name }}
									<svg class="olymp-dropdown-arrow-icon">
										<use xlink:href="/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use>
									</svg>
								</div>
								<!--<span class="author-subtitle">SPACE COWBOY</span>-->
							</router-link>
						</div>
					</div>

					<div class="ui-block-title ui-block-title-small">
						<h6 class="title">MAIN SECTIONS</h6>
					</div>

					<ul class="left-menu">
						<li>
							<b-link @click.prevent="toggleSidebar" class="js-sidebar-open">
								<svg class="olymp-close-icon left-menu-icon">
									<use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use>
								</svg>
								<span class="left-menu-title">Collapse Menu</span>
							</b-link>
						</li>
						<li v-for="route in routes" :key="route.name">
							<router-link :to="route.path">
								<svg class="left-menu-icon" :class="route.meta.navigationIcon" v-b-tooltip.hover.right :title="route.meta.navigationTitle">
									<use v-bind:xlink:href="`/svg-icons/sprites/icons.svg#${route.meta.navigationIcon}`"></use>
								</svg>
								<span class="left-menu-title" v-text="route.meta.navigationTitle"></span>
							</router-link>
						</li>
					</ul>

					<div class="ui-block-title ui-block-title-small">
						<h6 class="title">YOUR ACCOUNT</h6>
					</div>

					<ul class="account-settings">
						<li>
							<router-link to="/account">
								<svg class="olymp-menu-icon">
									<use xlink:href="/svg-icons/sprites/icons.svg#olymp-menu-icon"></use>
								</svg>
								<span>Profile Settings</span>
							</router-link>
						</li>
						<li>
							<a href="#" @click.prevent="logout">
								<svg class="olymp-logout-icon">
									<use xlink:href="/svg-icons/sprites/icons.svg#olymp-logout-icon"></use>
								</svg>

								<span>Log Out</span>
							</a>
						</li>
					</ul>

					<div class="ui-block-title ui-block-title-small" style="display: none;">
						<h6 class="title">About Olympus</h6>
					</div>

					<ul class="about-olympus" style="display: none;">
						<li>
							<a href="#">
								<span>Terms and Conditions</span>
							</a>
						</li>
						<li>
							<a href="#">
								<span>FAQs</span>
							</a>
						</li>
						<li>
							<a href="#">
								<span>Careers</span>
							</a>
						</li>
						<li>
							<a href="#">
								<span>Contact</span>
							</a>
						</li>
					</ul>

				</div>
			</div>
		</div>

		<!-- ... end Fixed Sidebar Left -->
	</div>

</template>
<style lang="scss">
.left-menu {
  li * {
    max-height: 59px;
  }
}
.progress-bar.bg-success.progress-bar-striped.progress-bar-animated {
  height: 100%;
}
</style>
<script type="text/javascript">
export default {
  name: "NavigationSidebar",
  data() {
    return {
      sidebarState: false,
      routes: this.$router.options.routes.filter(
        route => route.meta.navigation === "main"
      )
    };
  },
	watch: {
    $route(){
      this.sidebarState = false;
    }
	},
  methods: {
    toggleSidebar() {
      this.sidebarState = !this.sidebarState;
    }
  },
  mounted() {}
};
</script>
