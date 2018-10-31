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
										<img :src="profile.photoURL" width="124" :alt="profile.name">
								</div>
								<div class="author-content">
									<router-link :to="`/${profile.userName}`" class="h3 author-name" v-text="profile.name"></router-link>
									<div class="country">{{ profile.program || 'OCAD U Student' }}, {{ profile.programYear || 'N/A'}}</div>
								</div>
							</div>
						</div>
						<div class="profile-section">
							<div class="row">
								<div class="col col-xl-8 m-auto col-lg-8 col-md-12">
									<ul class="profile-menu">
										<li>
											<a class="friend-count-item">
												<div class="h6">{{ skillsCount || 0 }}</div>
												<div class="title">Skills</div>
											</a>
										</li>
										<li>
											<a class="friend-count-item">
												<div class="h6">{{ 0 }}</div>
												<div class="title">Collabs</div>
											</a>
										</li>
									</ul>
								</div>
							</div>

							<div class="control-block-button">
								<div class="btn btn-control bg-primary more">
									<svg class="olymp-three-dots-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

									<ul class="more-dropdown more-with-triangle triangle-bottom-right">
										<li>
											<a href="#">Report Profile</a>
										</li>
										<li>
											<a href="#">Block Profile</a>
										</li>
									</ul>
								</div>
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
import _ from "lodash";

export default {
  name: "PublicProfileHeader",
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      updateHeaderPhotoModal: false,
      updateAvatarModal: false,
      profileRoutes: []
    };
  },
  computed: {
    skills() {
      return _.keys(this.profile.skills);
    },
    skillsCount() {
      return this.skills.length;
    }
  },
  methods: {},
  mounted() {}
};
</script>
