<template>
	<div class="ui-block">
		<div class="news-feed-form">
			<!-- Nav tabs -->
			<b-nav tabs>
				<!--<b-nav-item :active="post.type === 'status'" @click="post.type = 'status'">
					<svg class="olymp-status-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
					<span>Status</span>
				</b-nav-item>-->
				<b-nav-item :active="post.type === 'skill-share'" @click="post.type = 'skill-share'">
					<i class="fa fa-handshake fa-2x"></i>
					<!--<svg class="olymp-share-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>-->
					<span>Skill Share</span>
				</b-nav-item>
				<!--<b-nav-item :active="post.type === 'skill-learn'" @click="post.type = 'skill-learn'">
					&lt;!&ndash;<svg class="olymp-multimedia-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-multimedia-icon"></use></svg>&ndash;&gt;
					<i class="fa fa-graduation-cap fa-2x"></i>
					<span>Skill Learn</span>
				</b-nav-item>-->
				<b-nav-item :active="post.type === 'collab'" @click="post.type = 'collab'">
					<i class="fa fa-users fa-2x"></i>
					<!--<svg class="olymp-multimedia-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-multimedia-icon"></use></svg>-->
					<span>Collaboration</span>
				</b-nav-item>
			</b-nav>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane active" role="tabpanel" aria-expanded="true">
					<b-form @submit.prevent.stop>
						<div class="author-thumb">
							<img :src="userData.photoURL" height="36" width="36" :alt="user.displayName">
						</div>
						<b-form-group class="form-group with-icon label-floating is-empty" :label="postTypeLabels[post.type]" label-class="control-label" label-for="postBody">
							<b-form-textarea id="postBody" class="form-control" v-model="post.body"></b-form-textarea>
						</b-form-group>
						<!--<b-form-group class="form-group with-icon label-floating label-static is-empty tags-control" label="Add Skills here" label-class="control-label" label-for="postSkills">-->
						<div class="" style="border-bottom: 1px solid #e6ecf5;padding-left: 70px;">
        
							<!-- <md-chips class="md-primary" style="font-size: .875rem;" v-model="post.skills" md-placeholder="Add Skills here..." @keydown.enter.prevent.stop="" :md-format="formatName"  md-static></md-chips> -->
              <md-chip v-for="skill in post.skills" :key="skill" class="md-primary" style="font-size: .875rem;" md-deletable @md-delete="removeSkill(skill)">{{ skill }}</md-chip>
              <md-autocomplete v-model="skill" :md-options="skillsList" @md-selected="addSkill" @md-changed="searchSkills" @md-opened="searchSkills" md-dense>
                <label>Add skills you are looking for here...</label>

	              <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item }}</template>
              </md-autocomplete>
						</div>
						<!--</b-form-group>-->
						<div class="add-options-message">
							<a href="#" @click.prevent="" class="options-message" v-b-tooltip.hover title="ADD PHOTOS">
								<svg class="olymp-camera-icon" data-toggle="modal" data-target="#update-header-photo"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-camera-icon"></use></svg>
							</a>
							<!--<a href="#" class="options-message" v-b-tooltip.hover title="TAG YOUR FRIENDS">
								<svg class="olymp-computer-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
							</a>-->
							<!--<a href="#" class="options-message" v-b-tooltip.hover title="ADD LOCATION">
								<svg class="olymp-small-pin-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-small-pin-icon"></use></svg>
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
    .md-input,
    .md-input::placeholder {
      font-size: 0.875rem !important;
    }
    .md-chip {
      /*font-size: .875rem !important;*/
      background-color: #ff5e3a;
      color: #fff;
    }
  }
  .md-chip {
    /*font-size: .875rem !important;*/
    background-color: #ff5e3a;
    color: #fff;
    line-height: 24px;
    margin: 5px 0;
  }
}
.md-menu-content.md-theme-default {
  background-color: #fff;
}
</style>
<script type="text/javascript">
import _ from "lodash";
// import Defiant from "defiant.js/dist/defiant";
import SkillsList from "../../assets/skills.json";

export default {
  name: "NewsFeedForm",
  data() {
    return {
      skillsList: [],
      skill: null,
      postTypeLabels: {
        collab: "What do you want to collaborate on?",
        "skill-share": "Need help with a project?",
        "skill-learn": "What do you want to learn?"
      },
      post: {
        author: null,
        authorRef: null,
        type: "skill-share",
        body: "",
        chats: {},
        chats_with: {},
        chat_count: 0,
        comment_count: 0,
        like_count: 0,
        share_count: 0,
        recent_likes: [],
        skills: [],
        attachments: [],
        publish: true,
        created_at: null,
        softDeleted: false,
        closed: false
      },
      tagInputConfig: {
        seperators: [";", ","],
        skillsList: []
      }
    };
  },
  computed: {},
  methods: {
    searchSkills(searchTerm) {
      return new Promise(resolve => {
        if (!searchTerm || searchTerm.length < 3) {
          resolve(this.skillsList);
        } else {
          const snapshot = Defiant.getSnapshot(SkillsList);
          this.skillsList = JSON.search(
            snapshot,
            `//data[contains(., "${searchTerm}")]`
          );
          resolve(this.skillsList);

          /*Defiant.getSnapshot(SkillsList, function(snapshot) {
            // executed when the snapshot is created
            const found = JSON.search(snapshot, `//data[contains(., "${searchTerm}")]`);
            resolve(this.skillsList = found);
          });*/
        }
      });
    },
    addSkill(skill) {
      this.post.skills.push(skill);
      this.$nextTick(() => {
        this.skill = null;
      });
      return null;
    },
    removeSkill(skill) {
      this.post.skills = _.without(this.post.skills, skill);
    },
    createItem(e) {
      // Add author
      this.post.author = {
        id: this.user.id,
        displayName: this.user.name,
        photoURL: this.user.photoURL,
        userName: this.userData.userName
      };
      this.post.authorRef = this.$db.collection("users").doc(this.user.id); // document reference
      this.$store.dispatch("newsFeed/set", this.post).then(result => {
        this.resetPost();
      });
    },
    resetPost() {
      this.post = {
        author: null,
        authorRef: null,
        type: "skill-share",
        body: "",
        chats: {},
        chats_with: {},
        chat_count: 0,
        comment_count: 0,
        like_count: 0,
        share_count: 0,
        recent_likes: [],
        skills: [],
        attachments: [],
        publish: true,
        created_at: null,
        softDeleted: false,
        closed: false
      };
    },
    formatName(str) {
      let words = str.split(" ").filter(str => str !== "");
      // remove accents / diacritics
      words = words.map(str =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      );
      // capitalize
      words = words.map(str => str[0].toUpperCase() + str.slice(1));
      return words.join(" ");
    }
  },
  mounted() {}
};
</script>
