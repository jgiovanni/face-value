<template>
	<div class="container">
		<div class="row">
			<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="ui-block">
					<div class="top-header">
						<div class="top-header-thumb">
							<img src="img/top-header-ocadu.jpg" alt="header">
						</div>
						<div class="profile-section">
							<div class="row">
								<div class="col col-lg-5 col-md-5 col-sm-12 col-12">
									<ul class="profile-menu">
										<li>
											<router-link to="/profile">About</router-link>
										</li>
										<!--<li>
											<a href="02-ProfilePage.html" class="active">Timeline</a>
										</li>-->
										<!--<li>
											<a href="06-ProfilePage.html">Friends</a>
										</li>-->
									</ul>
								</div>
								<div class="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12">
									<ul class="profile-menu">
										<!--<li>
											<a href="07-ProfilePage-Photos.html">Photos</a>
										</li>
										<li>
											<a href="09-ProfilePage-Videos.html">Videos</a>
										</li>-->
										<li>
											<div class="more">
												<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
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
								<a href="35-YourAccount-FriendsRequests.html" class="btn btn-control bg-blue">
									<svg class="olymp-happy-face-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
								</a>

								<a href="#" class="btn btn-control bg-purple">
									<svg class="olymp-chat---messages-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
								</a>

								<div class="btn btn-control bg-primary more">
									<svg class="olymp-settings-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-settings-icon"></use></svg>

									<ul class="more-dropdown more-with-triangle triangle-bottom-right">
										<li>
											<a href="#" @click.prevent="$root.$emit('Modal::HeaderPhoto')" data-toggle="modal" data-target="#update-header-photo">Update Profile Photo</a>
										</li>
										<li>
											<a href="#" @click.prevent="" data-toggle="modal" data-target="#update-header-photo">Update Header Photo</a>
										</li>
										<li>
											<router-link to="/settings">Account Settings</router-link>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="top-header-author">
							<router-link to="/profile" class="author-thumb">
								<img :src="userData.photoURL" width="124" :alt="userData.name">
							</router-link>
							<div class="author-content">
								<a href="02-ProfilePage.html" class="h4 author-name" v-text="userData.name"></a>
								<div class="country">{{ userData.program || 'Digital Futures, 2019' }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.btn.btn-control {
  line-height: 45px;
}
</style>
<script type="text/javascript">
export default {
  name: "ProfileHeader",
  data() {
    return {
      msg: null
    };
  },
  methods: {},
  mounted() {}
};
</script>
