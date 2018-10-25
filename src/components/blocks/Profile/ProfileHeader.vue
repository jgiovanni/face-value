<template>
	<div class="container">
		<div class="row">
			<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="ui-block">
					<div class="top-header top-header-favorit">
						<div class="top-header-thumb">
							<img src="/img/top-header-ocadu.jpg" alt="header">
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
											<a w href="#" @click.prevent="updateAvatarModal = !updateAvatarModal" >Update Profile Photo</a>
										</li>
										<li>
											<a href="#" @click.prevent="updateHeaderPhotoModal = !updateHeaderPhotoModal">Update Header Photo</a>
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

		<!-- Window-popup Update Header Photo -->

		<b-modal v-model="updateHeaderPhotoModal" id="updateHeaderPhoto" tabindex="-1" aria-labelledby="update-header-photo" aria-hidden="true"
		title="Update Header Photo">
			<div class="modal-dialog window-popup update-header-photo" role="document">
				<div class="modal-content">
					<a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
						<svg class="olymp-close-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
					</a>

					<div class="modal-body">
						<a href="#" class="upload-photo-item">
							<svg class="olymp-computer-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>

							<h6>Upload Photo</h6>
							<span>Browse your computer.</span>
						</a>

						<a href="#" class="upload-photo-item" data-toggle="modal" data-target="#choose-from-my-photo">

							<svg class="olymp-photos-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-photos-icon"></use></svg>

							<h6>Choose from My Photos</h6>
							<span>Choose from your uploaded photos</span>
						</a>
					</div>
				</div>
			</div>
		</b-modal>


		<!-- ... end Window-popup Update Header Photo -->

		<!-- Window-popup Choose from my Photo -->

		<b-modal v-model="updateAvatarModal" id="choose-from-my-photo" tabindex="-1" aria-labelledby="choose-from-my-photo" aria-hidden="true">
			<div class="modal-dialog window-popup choose-from-my-photo" role="document">

				<div class="modal-content">
					<a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
						<svg class="olymp-close-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
					</a>
					<div class="modal-header">
						<h6 class="title">Choose from My Photos</h6>

						<!-- Nav tabs -->
						<ul class="nav nav-tabs" role="tablist">
							<li class="nav-item">
								<a class="nav-link active" data-toggle="tab" href="#home" role="tab" aria-expanded="true">
									<svg class="olymp-photos-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-photos-icon"></use></svg>
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" data-toggle="tab" href="#profile" role="tab" aria-expanded="false">
									<svg class="olymp-albums-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-albums-icon"></use></svg>
								</a>
							</li>
						</ul>
					</div>

					<div class="modal-body">
						<!-- Tab panes -->
						<div class="tab-content">
							<div class="tab-pane active" id="home" role="tabpanel" aria-expanded="true">

								<div class="choose-photo-item" data-mh="choose-item">
									<div class="radio">
										<label class="custom-radio">
											<img src="/img/choose-photo1.jpg" alt="photo">
											<input type="radio" name="optionsRadios">
										</label>
									</div>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<div class="radio">
										<label class="custom-radio">
											<img src="/img/choose-photo2.jpg" alt="photo">
											<input type="radio" name="optionsRadios">
										</label>
									</div>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<div class="radio">
										<label class="custom-radio">
											<img src="/img/choose-photo3.jpg" alt="photo">
											<input type="radio" name="optionsRadios">
										</label>
									</div>
								</div>

								<div class="choose-photo-item" data-mh="choose-item">
									<div class="radio">
										<label class="custom-radio">
											<img src="/img/choose-photo4.jpg" alt="photo">
											<input type="radio" name="optionsRadios">
										</label>
									</div>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<div class="radio">
										<label class="custom-radio">
											<img src="/img/choose-photo5.jpg" alt="photo">
											<input type="radio" name="optionsRadios">
										</label>
									</div>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<div class="radio">
										<label class="custom-radio">
											<img src="/img/choose-photo6.jpg" alt="photo">
											<input type="radio" name="optionsRadios">
										</label>
									</div>
								</div>

								<div class="choose-photo-item" data-mh="choose-item">
									<div class="radio">
										<label class="custom-radio">
											<img src="/img/choose-photo7.jpg" alt="photo">
											<input type="radio" name="optionsRadios">
										</label>
									</div>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<div class="radio">
										<label class="custom-radio">
											<img src="/img/choose-photo8.jpg" alt="photo">
											<input type="radio" name="optionsRadios">
										</label>
									</div>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<div class="radio">
										<label class="custom-radio">
											<img src="/img/choose-photo9.jpg" alt="photo">
											<input type="radio" name="optionsRadios">
										</label>
									</div>
								</div>


								<a href="#" class="btn btn-secondary btn-lg btn--half-width">Cancel</a>
								<a href="#" class="btn btn-primary btn-lg btn--half-width">Confirm Photo</a>

							</div>
							<div class="tab-pane" id="profile" role="tabpanel" aria-expanded="false">

								<div class="choose-photo-item" data-mh="choose-item">
									<figure>
										<img src="/img/choose-photo10.jpg" alt="photo">
										<figcaption>
											<a href="#">South America Vacations</a>
											<span>Last Added: 2 hours ago</span>
										</figcaption>
									</figure>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<figure>
										<img src="/img/choose-photo11.jpg" alt="photo">
										<figcaption>
											<a href="#">Photoshoot Summer 2016</a>
											<span>Last Added: 5 weeks ago</span>
										</figcaption>
									</figure>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<figure>
										<img src="/img/choose-photo12.jpg" alt="photo">
										<figcaption>
											<a href="#">Amazing Street Food</a>
											<span>Last Added: 6 mins ago</span>
										</figcaption>
									</figure>
								</div>

								<div class="choose-photo-item" data-mh="choose-item">
									<figure>
										<img src="/img/choose-photo13.jpg" alt="photo">
										<figcaption>
											<a href="#">Graffity & Street Art</a>
											<span>Last Added: 16 hours ago</span>
										</figcaption>
									</figure>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<figure>
										<img src="/img/choose-photo14.jpg" alt="photo">
										<figcaption>
											<a href="#">Amazing Landscapes</a>
											<span>Last Added: 13 mins ago</span>
										</figcaption>
									</figure>
								</div>
								<div class="choose-photo-item" data-mh="choose-item">
									<figure>
										<img src="/img/choose-photo15.jpg" alt="photo">
										<figcaption>
											<a href="#">The Majestic Canyon</a>
											<span>Last Added: 57 mins ago</span>
										</figcaption>
									</figure>
								</div>


								<a href="#" class="btn btn-secondary btn-lg btn--half-width">Cancel</a>
								<a href="#" class="btn btn-primary btn-lg disabled btn--half-width">Confirm Photo</a>
							</div>
						</div>
					</div>
				</div>

			</div>
		</b-modal>

		<!-- ... end Window-popup Choose from my Photo -->
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
      updateHeaderPhotoModal: false,
      updateAvatarModal: false,
      profileRoutes: this.$router.options.routes.find(
        route => route.name === "Profile"
      ).children
    };
  },
  methods: {},
  mounted() {}
};
</script>
