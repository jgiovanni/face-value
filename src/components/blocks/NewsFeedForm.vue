<template>
	<div class="ui-block">
		<div class="news-feed-form">
			<!-- Nav tabs -->
			<!--<b-nav tabs>
				<b-nav-item :active="post.type === 'status'" @click="post.type = 'status'">
					<svg class="olymp-status-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
					<span>Status</span>
				</b-nav-item>
				<b-nav-item :active="post.type === 'media'" @click="post.type = 'media'">
					<svg class="olymp-multimedia-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-multimedia-icon"></use></svg>
					<span>Multimedia</span>
				</b-nav-item>
			</b-nav>-->

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
					<b-form @submit.prevent="">
						<div class="author-thumb">
							<img :src="user.photoUrl" height="36" width="36" alt="author">
						</div>
						<b-form-group class="form-group with-icon label-floating is-empty"
						              :invalid-feedback="errors.first('email', 'login')"
						              label="Share your idea and what skills you are looking for..."
						              label-class="control-label" label-for="postBody">
							<b-form-textarea id="postBody" class="form-control" v-model="post.body"></b-form-textarea>
						</b-form-group>
						<div class="add-options-message">
							<a href="#" @click.prevent="" class="options-message" v-b-tooltip.hover title="ADD PHOTOS">
								<svg class="olymp-camera-icon" data-toggle="modal" data-target="#update-header-photo"><use xlink:href="svg-icons/sprites/icons.svg#olymp-camera-icon"></use></svg>
							</a>
							<!--<a href="#" class="options-message" v-b-tooltip.hover title="TAG YOUR FRIENDS">
								<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
							</a>-->
							<!--<a href="#" class="options-message" v-b-tooltip.hover title="ADD LOCATION">
								<svg class="olymp-small-pin-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-small-pin-icon"></use></svg>
							</a>-->

							<button type="submit" class="btn btn-primary btn-md-2">Post Status</button>
							<!--<button type="button" class="btn btn-md-2 btn-border-think btn-transparent c-grey" @click="">Preview</button>-->
						</div>
					</b-form>
				</div>
				<!--
				<div class="tab-pane" id="profile-1" role="tabpanel" aria-expanded="true">
					<form>
						<div class="author-thumb">
							<img src="img/author-page.jpg" alt="author">
						</div>
						<div class="form-group with-icon label-floating is-empty">
							<label class="control-label">Share what you are thinking here...</label>
							<textarea class="form-control" placeholder=""  ></textarea>
						</div>
						<div class="add-options-message">
							<a href="#" class="options-message" v-b-tooltip.hover title="ADD PHOTOS">
								<svg class="olymp-camera-icon" data-toggle="modal" data-target="#update-header-photo"><use xlink:href="svg-icons/sprites/icons.svg#olymp-camera-icon"></use></svg>
							</a>
							<a href="#" class="options-message" v-b-tooltip.hover title="TAG YOUR FRIENDS">
								<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
							</a>

							<a href="#" class="options-message" v-b-tooltip.hover title="ADD LOCATION">
								<svg class="olymp-small-pin-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-small-pin-icon"></use></svg>
							</a>

							<button class="btn btn-primary btn-md-2">Post Status</button>
							<button   class="btn btn-md-2 btn-border-think btn-transparent c-grey">Preview</button>

						</div>

					</form>
				</div>

				<div class="tab-pane" id="blog" role="tabpanel" aria-expanded="true">
					<form>
						<div class="author-thumb">
							<img src="img/author-page.jpg" alt="author">
						</div>
						<div class="form-group with-icon label-floating is-empty">
							<label class="control-label">Share what you are thinking here...</label>
							<textarea class="form-control" placeholder=""  ></textarea>
						</div>
						<div class="add-options-message">
							<a href="#" class="options-message" v-b-tooltip.hover title="ADD PHOTOS">
								<svg class="olymp-camera-icon" data-toggle="modal" data-target="#update-header-photo"><use xlink:href="svg-icons/sprites/icons.svg#olymp-camera-icon"></use></svg>
							</a>
							<a href="#" class="options-message" v-b-tooltip.hover title="TAG YOUR FRIENDS">
								<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
							</a>

							<a href="#" class="options-message" v-b-tooltip.hover title="ADD LOCATION">
								<svg class="olymp-small-pin-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-small-pin-icon"></use></svg>
							</a>

							<button class="btn btn-primary btn-md-2">Post Status</button>
							<button   class="btn btn-md-2 btn-border-think btn-transparent c-grey">Preview</button>

						</div>

					</form>
				</div>
				-->
			</div>
		</div>
	</div>
</template>
<style></style>
<script type="text/javascript">
  export default {
    name: 'NewsFeedForm',
    data() {
      return {
        post: {
          type: 'status',
          body: '',
        }
      }
    },
    methods: {},
    mounted() {
      
    }
  }
</script>