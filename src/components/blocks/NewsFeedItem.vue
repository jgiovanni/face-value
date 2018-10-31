<template>
	<div class="ui-block">
		<article class="hentry post">

			<div class="post__author author vcard inline-items">
				<img :src="item.author.photoURL" width="36" alt="author">

				<div class="author-date">
					<router-link class="h6 post__author-name fn" :to="`/${item.author.userName}`" v-text="item.author.displayName"></router-link>
					<template v-if="item.type === 'collab'">
						looking to collaborate
					</template>
					<div class="post__date">
						<time v-if="this.item.created_at && timestamp" class="published" :datetime="timestamp.toISO()">
							<timeago :datetime="timestamp" :auto-update="300"></timeago>
						</time>
					</div>
				</div>

				<div class="more" v-if="userIsAuthor">
					<svg class="olymp-three-dots-icon">
						<use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
					</svg>
					<ul class="more-dropdown">
						<!--<li>
							<a href="#" @click.prevent="">Edit Post</a>
						</li>-->
						<li>
							<a href="#" @click.prevent="deletePost"><i class="fa fa-trash"></i>&nbsp;Delete Post</a>
						</li>
						<!--<li>
							<a href="#" @click.prevent="">Turn Off Notifications</a>
						</li>-->
						<!--<li>
							<a href="#" @click.prevent="">Select as Featured</a>
						</li>-->
					</ul>
				</div>

			</div>

			<p class="mb-2" v-html="item.body"></p>

			<div class="mb-3">
				<md-chip v-for="chip in item.skills" :key="chip" md-clickable @click="searchSkill(chip)">{{ chip }}</md-chip>
			</div>

			<div class="post-additional-info inline-items">

				<a href="#" @click.prevent="likePost" class="post-add-icon inline-items" :aria-disabled="userIsAuthor" :class="{ 'disabled': userIsAuthor, 'active': liked }">
					<svg class="olymp-heart-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
					<span v-text="item.like_count">24</span>
				</a>

				<ul class="friends-harmonic">
					<li v-for="liker in item.recent_likes" :key="liker.user.id">
						<router-link :to="`/${liker.userName}`">
							<img :src="liker.user.photoURL" :alt="liker.user.name">
						</router-link>
					</li>
				</ul>

				<div class="names-people-likes">
					<Aggregator :item="item" count-prop="like_count" :user-included="liked" recents-prop="recent_likes" verb="liked" />
				</div>

				<div class="comments-shared">
					<a href="#" @click.prevent="startConversation" class="post-add-icon inline-items" :class="{'active': hasChatted}" v-if="!userIsAuthor">
						<svg class="olymp-speech-balloon-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
						Direct Message {{ item.author.displayName }}
						<!--<span v-text="item.comments_count">17</span>-->
					</a>

					<!--<a href="#" class="post-add-icon inline-items">
						<svg class="olymp-share-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
						<span v-text="item.share_count">24</span>
					</a>-->
				</div>


			</div>

			<div class="control-block-button post-control-button">

				<a href="#" @click.prevent="likePost" class="btn btn-control" :aria-disabled="userIsAuthor" :class="{ 'disabled': userIsAuthor, 'active': liked }">
					<svg class="olymp-like-post-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-like-post-icon"></use></svg>
				</a>

				<a href="#" @click.prevent="startConversation" class="btn btn-control" :class="{'active': hasChatted}" v-if="!userIsAuthor">
					<svg class="olymp-comments-post-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
				</a>

				<!--<a href="#" @click.prevent="sharePost" class="btn btn-control">
					<svg class="olymp-share-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
				</a>-->

			</div>

		</article>

			<!-- Comment Form  -->
			<form v-show="showMessageForm" class="comment-form inline-items" @submit.prevent="sendMessage" @reset.prevent="resetForm">

				<div class="post__author author vcard inline-items">
					<img :src="user.photoURL" alt="author">

					<div class="form-group with-icon-right ">
						<b-form-textarea class="form-control" v-model="message" placeholder="Type Message Here..."></b-form-textarea>
						<div class="add-options-message">
							<a href="#" class="options-message" @click.prevent="" data-toggle="modal" data-target="#update-header-photo">
								<svg class="olymp-camera-icon">
									<use xlink:href="/svg-icons/sprites/icons.svg#olymp-camera-icon"></use>
								</svg>
							</a>
						</div>
					</div>
				</div>

				<button type="submit" class="btn btn-md-2 btn-primary">Send Message</button>

				<button type="reset" class="btn btn-md-2 btn-border-think c-grey btn-transparent custom-color">Cancel</button>

			</form>
			<!-- ... end Comment Form  -->

		<md-dialog-confirm
				v-if="dialogActive"
				:md-active.sync="dialogActive"
				md-title="Delete this post?"
				md-content="Deleting this post is irreversible."
				md-confirm-text="Yes, Delete"
				md-cancel-text="Cancel"
				@md-cancel="onDialogCancel"
				@md-confirm="onDialogConfirm" />
	</div>
</template>
<style lang="scss">
.post-control-button {
  .btn-control {
    line-height: 29px !important;

    &.active {
      background-color: #ff5e3a;
    }
  }
}
.post-add-icon {
  &.active {
    color: #ff5e3a;
    fill: #ff5e3a;
  }
}

.post .md-chip {
  /*font-size: .875rem !important;*/
  background-color: #ff5e3a;
  color: #fff;
  height: 24px !important;
  .md-ripple {
    line-height: 24px;
  }
}
</style>
<script type="text/javascript">
import _ from "lodash";
import firebase from "firebase/app";
import { mapState } from "vuex";
import { DateTime } from "luxon";
import Aggregator from "../Aggregator";

export default {
  name: "NewsFeedItem",
  components: { Aggregator },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogActive: false,
      dialogValue: null,
      showMessageForm: false,
      message: null
    };
  },
  computed: {
    ...mapState(["likes"]),
    liked() {
      return _.find(this.likes, like => like.newsFeed === this.item.id);
    },
    userIsAuthor() {
      return this.user && this.user.id === this.item.author.id;
    },
    timestamp() {
      return DateTime.fromMillis(this.item.created_at.seconds * 1000);
    },
    hasChatted() {
      return this.item.chats_with[this.user.id];
    }
  },
  methods: {
    likePost() {
      if (!this.userIsAuthor) {
        if (this.liked) {
          // un-like
          this.$db
            .collection("likes")
            .doc(`${this.user.id}_${this.item.id}`)
            .delete()
            .catch(console.log);

          this.$db
            .collection("newsFeed")
            .doc(this.item.id)
            .collection("likes")
            .doc(this.liked.newsFeedLike)
            .delete()
            .catch(console.log);
          this.item.like_count--;
        } else {
          // like
          this.$db
            .collection("newsFeed")
            .doc(this.item.id)
            .collection("likes")
            .add({
              like: `${this.user.id}_${this.item.id}`,
              user: {
                id: this.user.id,
                photoURL: this.user.photoURL,
                displayName: this.user.name,
                userName: this.userData.userName
              },
              created_at: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(doc => {
              this.$db
                .collection("likes")
                .doc(`${this.user.id}_${this.item.id}`)
                .set({
                  user: this.user.id,
                  userDisplayName: this.user.name,
                  userName: this.userData.userName,
                  newsFeed: this.item.id,
                  newsFeedLike: doc.id,
                  newsFeedAuthor: this.item.author,
                  created_at: firebase.firestore.FieldValue.serverTimestamp()
                })
                .catch(console.log);
              this.item.like_count++;
            })
            .catch(console.log);
        }
      }
    },
    deletePost() {
      this.dialogActive = true;
    },
    startConversation() {
      if (this.hasChatted) {
        const chat = _.find(
          this.$store.state.chats.items,
          item => item.topic.id === this.item.id
        );
        this.$store
          .dispatch("chats/messages/openDBChannel", { chatId: chat.id })
          .then(() => {
            this.$root.$emit("openChatModal", chat);
            this.resetForm();
          })
          .catch(console.error);
        return false;
      }
      this.showMessageForm = !this.showMessageForm;
      /*this.$store.dispatch("conversations/set", conversation).then(result => {
          debugger;
        });*/
    },
    resetForm() {
      this.message = "";
      this.showMessageForm = false;
    },
    sendMessage() {
      const me = {
        enabled: true,
        displayName: this.user.name,
        photoURL: this.user.photoURL,
        userName: this.userData.userName
      };
      const author = {
        enabled: true,
        displayName: this.item.author.displayName,
        photoURL: this.item.author.photoURL,
        userName: this.item.author.userName
      };
      let conversation = {
        latestMessage: this.message,
        topic: {
          id: this.item.id,
          skills: this.item.skills
        },
        members: {},
        membersData: {}
      };
      const msg = {
        body: conversation.latestMessage,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        created_by: this.user.id,
        author: {
          id: this.user.id,
          displayName: this.user.name,
          photoURL: this.user.photoURL,
          userName: this.userData.userName
        }
      };
      // Add initial Users to conversation
      conversation.membersList = [this.user.id, this.item.author.id];
      conversation.members[this.user.id] = true;
      conversation.members[this.item.author.id] = true;
      conversation.membersData[this.user.id] = me;
      conversation.membersData[this.item.author.id] = author;

      this.$store
        .dispatch("chats/set", conversation)
        .then(() => {
          // Find new chat
          const thisChat = _.find(
            this.$store.state.chats.items,
            item => item.latestMessage === conversation.latestMessage
          );
          // add id to the list of chats associated with this top
          this.item.chats[thisChat.id] = true;
          this.item.chats_with[this.user.id] = true;
          this.$store
            .dispatch("newsFeed/patch", this.item)
            .catch(console.error);
          // open chat channel and 2-way bind
          this.$store
            .dispatch("chats/messages/openDBChannel", { chatId: thisChat.id })
            .then(() => {
              this.$store
                .dispatch("chats/messages/set", msg)
                .catch(console.error);
              this.$root.$emit("openChatModal", thisChat);
              this.resetForm();
            })
            .catch(console.error);

          // this.$store.dispatch('chats/messages/set', msg).then(console.log).catch(console.error);
        })
        .catch(console.error);
    },
    searchSkill(skill) {
      return this.$router.push({
        path: "",
        query: { skill }
      });
    },
    chatWithAuthor() {},
    onDialogConfirm() {
      this.$store.dispatch("newsFeed/delete", this.item.id);
      /*this.$store.dispatch('newsFeed/patch', {
          id: this.item.id,
	        softDeleted: true,
	        publish: false,
	        deleted_at: firebase.firestore.FieldValue.serverTimestamp()
        });*/
    },
    onDialogCancel() {
      this.dialogActive = false;
    }
  },
  mounted() {}
};
</script>
