<template>
	<div class="container">
		<div class="row">
			<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="ui-block">
					<div class="top-header top-header-favorit">
						<div class="top-header-thumb">
							<img :src="userData.headerURL || '/img/top-header-ocadu.jpg'" alt="header">
							<div class="top-header-author">
								<div class="author-thumb">
										<overdrive id="profile-avatar">
											<img :src="userData.photoURL" width="124" :alt="userData.name">
										</overdrive>
								</div>
								<div class="author-content">
									<router-link to="/profile" class="h3 author-name" v-text="userData.name"></router-link>
									<div class="country">{{ userData.program || 'Digital Futures' }}, {{ userData.programYear || '2019' }}</div>
								</div>
							</div>
						</div>
						<div class="profile-section">
							<div class="row">
								<div class="col col-xl-8 m-auto col-lg-8 col-md-12">
									<ul class="profile-menu">
										<li v-for="route in profileRoutes" :key="route.name">
											<router-link :to="route.path ? `/profile/${route.path}` : '/profile'" class="active" v-text="route.meta.title || route.name"></router-link>
										</li>
										<li>
											<div class="more">
												<svg class="olymp-three-dots-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
												<ul class="more-dropdown more-with-triangle">
													<li>
														<a href="#">Report Profile</a>
													</li>
													<li>
														<a href="#">Block Profile</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</div>

							<div class="control-block-button">
								<router-link to="/collabs" class="btn btn-control bg-blue">
									<svg class="olymp-happy-face-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
								</router-link>

								<router-link to="/messages" class="btn btn-control bg-purple">
									<svg class="olymp-chat---messages-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
								</router-link>

								<div class="btn btn-control bg-primary more">
									<svg class="olymp-settings-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-settings-icon"></use></svg>

									<ul class="more-dropdown more-with-triangle triangle-bottom-right">
										<li>
											<a w href="#" @click.prevent="showAvatarModal" >Update Profile Photo</a>
										</li>
										<li>
											<a href="#" @click.prevent="showHeaderModal">Update Header Photo</a>
										</li>
										<li>
											<router-link to="/account">Account Settings</router-link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<HeaderUploadModal />
		<AvatarUploadModal />
	</div>
</template>
<style lang="scss">
#choose-from-my-photo {
  .modal-header {
    padding: 23px 25px 12px;
  }
}
.btn {
  &.btn-control {
    line-height: 45px;
  }
}
</style>
<script type="text/javascript">
import AvatarUploadModal from "../../modals/AvatarUploadModal";
import HeaderUploadModal from "../../modals/HeaderUploadModal";
export default {
  name: "ProfileHeader",
  components: { AvatarUploadModal, HeaderUploadModal },
  data() {
    return {
      profileRoutes: this.$router.options.routes.find(
        route => route.path === "/profile"
      ).children
    };
  },
  methods: {
    showAvatarModal() {
      this.$root.$emit("bv::show::modal", "choose-from-my-photo");
    },
    showHeaderModal() {
      this.$root.$emit("bv::show::modal", "update-header-photo");
    },
  },
  mounted() {}
};
</script>
