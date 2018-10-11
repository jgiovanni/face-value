<template>
	<div class="ui-block">
		<div class="news-feed-form">
			<!-- Nav tabs -->
			<b-nav tabs>
				<!--<b-nav-item :active="post.type === 'status'" @click="post.type = 'status'">
					<svg class="olymp-status-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
					<span>Status</span>
				</b-nav-item>-->
				<b-nav-item :active="post.type === 'skill-share'" @click="post.type = 'skill-share'">
					<i class="fa fa-handshake fa-2x"></i>
					<!--<svg class="olymp-share-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>-->
					<span>Skill Share</span>
				</b-nav-item>
				<!--<b-nav-item :active="post.type === 'skill-learn'" @click="post.type = 'skill-learn'">
					&lt;!&ndash;<svg class="olymp-multimedia-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-multimedia-icon"></use></svg>&ndash;&gt;
					<i class="fa fa-graduation-cap fa-2x"></i>
					<span>Skill Learn</span>
				</b-nav-item>-->
				<b-nav-item :active="post.type === 'collab'" @click="post.type = 'collab'">
					<i class="fa fa-users fa-2x"></i>
					<!--<svg class="olymp-multimedia-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-multimedia-icon"></use></svg>-->
					<span>Collaboration</span>
				</b-nav-item>
			</b-nav>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane active" role="tabpanel" aria-expanded="true">
					<b-form @submit.prevent.stop>
						<div class="author-thumb">
							<img :src="user.photoUrl" height="36" width="36" alt="author">
						</div>
						<b-form-group class="form-group with-icon label-floating is-empty" :label="postTypeLabels[post.type]" label-class="control-label" label-for="postBody">
							<b-form-textarea id="postBody" class="form-control" v-model="post.body"></b-form-textarea>
						</b-form-group>
						<!--<b-form-group class="form-group with-icon label-floating label-static is-empty tags-control" label="Add Skills here" label-class="control-label" label-for="postSkills">-->
						<div class="" style="border-bottom: 1px solid #e6ecf5;padding-left: 70px;">
							<md-chips class="md-primary" style="font-size: .875rem;" v-model="post.skills" md-placeholder="Add Skills here..." @keydown.enter.prevent.stop="" :md-format="formatName"></md-chips>
							<!--<tags-input
							id="postSkills"
							class="form-control" placeholder=""
							v-model="skill"
							:tags="post.skills"
							:seperators="tagInputConfig.seperators"
							:autocomplete-items="tagInputConfig.skillsList"
							@tags-changed="newTags => post.skills = newTags"
					/>-->
						</div>
						<!--</b-form-group>-->
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

							<button type="button" @click.prevent.stop="createItem" class="btn btn-primary btn-md-2">Post Status</button>
							<!--<button type="button" class="btn btn-md-2 btn-border-think btn-transparent c-grey" @click="">Preview</button>-->
						</div>
					</b-form>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.news-feed-form {
		.nav-link {
			i {
				margin-right: 10px;
				/*width: 18px;*/
				height: 26px;
				width: 26px;
				display: inline-block;
			}
			&.active i {
				color: #ff5e3a;
			}
		}
		.form-group.label-floating.is-focused .control-label {
			top: 12px !important;
		}
		.tags-control {
			label {
				z-index: 10;
				top: 10px !important;
			}
			.vue-tags-input {
				width: 100%;
				padding: 16px 1em 0 60px !important;
				max-width: 100% !important;
				border-left: none;
				border-right: none;
				border-radius: 0;

				.input {
					border: none !important;

					i.icon-close {
						display: block;
						position: relative !important;
						left: auto !important;
						right: auto !important;
						top: auto !important;
						bottom: auto !important;
						width: 20px !important;
						height: 20px !important;
						line-height: 20px !important;
					}
				}
			}
		}
		.md-chips {
			.md-input, .md-input::placeholder {
				font-size: .875rem !important;
			}
			.md-chip {
				/*font-size: .875rem !important;*/
				background-color: #ff5e3a;
				color: #fff;
			}
		}
	}
</style>
<script type="text/javascript">
  export default {
    name: 'NewsFeedForm',
    data() {
      return {
        skill: '',
        postTypeLabels: {
          'collab': 'What do you want to collaborate on?',
          'skill-share': 'Need help with a project?',
          'skill-learn': 'What do you want to learn?',
        },
        post: {
          author: null,
          authorRef: null,
          type: 'skill-share',
          body: '',
	        comments: [],
	        comments_count: 0,
	        likes: [],
	        likes_count: 0,
	        liked: false,
	        shares: [],
	        share_count: 0,
          skills: [],
          attachments: [],
          publish: true,
        },
	      tagInputConfig: {
          seperators: [';', ','],
          skillsList: []
	      }
      }
    },
	  computed: {},
    methods: {
      createItem(e) {
        // Add author
        this.post.author = {
          id: this.user.id, displayName: this.user.name, photoUrl: this.user.photoUrl, userName: this.userData.userName
        };
        this.post.authorRef = this.$db.collection('users').doc(this.user.id); // document reference
        this.$store.dispatch("newsFeed/set", this.post).then(result => {
          this.resetPost();
        })
      },
	    resetPost() {
        this.post = {
          author: null,
          authorRef: null,
          type: 'skill-share',
          body: '',
          comments: [],
          comments_count: 0,
          likes: [],
          likes_count: 0,
          liked: false,
          shares: [],
          share_count: 0,
          skills: [],
          attachments: [],
	        publish: true,
        };
	    },
      formatName (str) {
        let words = str.split(' ').filter(str => str !== '')
        // remove accents / diacritics
        words = words.map(str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        // capitalize
        words = words.map(str => str[0].toUpperCase() + str.slice(1))
        return words.join(' ')
      }
    },
    mounted() {
      
    }
  }
</script>