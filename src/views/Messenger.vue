<template>
	<div class="container" :style="{ height : containerHeightStyle }">
		<div class="row m-0">
			<div class="col col-12 p-0">
				<div class="ui-block messages-ui-block">
					<div class="row m-0">
						<div class="col col-xl-5 col-lg-6 col-md-12 col-sm-12 padding-r-0 p-0">
							<!-- Notification List Chat Messages -->

							<transition-group tag="ul" class="notification-list chat-message" name="slideleft" :style="{ height : containerHeightStyle }" v-if="orderedChats">
								<li class="" :class="{'chat-group': chat.members.length > 2, 'text-white bg-primary': (activeChat && chat.id === activeChat.id) }"
								    @click.prevent="openChat(chat)" v-for="chat in orderedChats" :key="chat.id">
									<div class="author-thumb">
										<img :src="otherMemberPhoto(chat)" width="36" :alt="otherMember(chat).displayName">
									</div>
									<div class="notification-event">
										<router-link :to="`/${otherMember(chat).userName}`" @click.prevent="" class="h6 notification-friend" v-text="otherMember(chat).displayName"></router-link>
										<span class="chat-message-item" v-text="chat.latestMessage">Hi James! It’s Diana, I just wanted to let you know that we have to reschedule...</span>
										<span class="notification-date">
											<time v-if="chat && getTimestamp(chat)" class="entry-date updated" :datetime="getTimestamp(chat).toISO()">
												<timeago :datetime="getTimestamp(chat)" :auto-update="300"></timeago>
											</time>
										</span>
									</div>
									<span class="notification-icon">
										<svg class="olymp-chat---messages-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
									</span>

									<div class="more">
										<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									</div>
								</li>

								<!--<li class="chat-group">
									<div class="author-thumb">
										<img src="/img/avatar11-sm.jpg" alt="author">
										<img src="/img/avatar12-sm.jpg" alt="author">
										<img src="/img/avatar13-sm.jpg" alt="author">
										<img src="/img/avatar10-sm.jpg" alt="author">
									</div>
									<div class="notification-event">
										<a href="#" class="h6 notification-friend">You, Faye, Ed & Jet +3</a>
										<span class="last-message-author">Ed:</span>
										<span class="chat-message-item">Yeah! Seems fine by me!</span>
										<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">March 16th at 10:23am</time></span>
									</div>
									<span class="notification-icon">
															<svg class="olymp-chat-&#45;&#45;messages-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-chat-&#45;&#45;messages-icon"></use></svg>
														</span>
									<div class="more">
										<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									</div>
								</li>-->
							</transition-group>

							<!-- ... end Notification List Chat Messages -->

						</div>

						<div class="col col-xl-7 col-lg-6 col-md-12 col-sm-12 padding-l-0 p-0">


							<!-- Chat Field -->

							<div class="chat-field" :style="{ height : containerHeightStyle }">
								<div class="ui-block-title" v-if="activeChat">
									<h6 class="title" v-if="activeChat" v-text="otherMember(activeChat).displayName"></h6>

									<div class="more">
										<!--<b-btn v-if="activeChat.collab" variant="danger" size="sm" @click.prevent="cancelCollab">Cancel Request</b-btn>-->
										<!--<b-btn v-else variant="info" size="sm" @click.prevent="showCreateCollabModal">Request Collab</b-btn>-->
										<template v-if="activeChat.topic">
											<template v-if="activeChatAuthor && activeChatAuthor.id === user.id">
												<b-btn v-if="activeChat.collab && activeChat.collab.request_id" variant="danger" size="sm" @click.prevent="collabRequestCancelModal = true">Cancel Request</b-btn>
												<b-btn v-else variant="info" size="sm" @click.prevent="showCreateCollabModal">Request Collab</b-btn>
											</template>
										</template>
										<template v-else>
											<b-btn variant="info" size="sm" @click.prevent="showCreateCollabModal">Request Collab</b-btn>
										</template>
									</div>
								</div>
								<div class="mCustomScrollbar" data-mcs-theme="dark">
									<div class="text-center" v-if="loadingMessages">
										<md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate" class="my-5"></md-progress-spinner>
									</div>
									<template v-else>
										<transition-group tag="ul" class="notification-list chat-message chat-message-field" name="slideUp" >
											<li class="" v-for="message in chats.messages.items" :key="message.id">
												<div class="author-thumb">
													<img :src="message.author.photoURL" width="36" :alt="message.author.displayName">
												</div>
												<div class="notification-event" style="width: 90%;">
													<div style="width: 100%;height: 20px;">
														<router-link :to="`/${message.author.userName}`" class="h6 notification-friend" v-text="message.author.displayName"></router-link>
														<span class="notification-date">
														<time v-if="message.created_at && getTimestamp(message)" class="entry-date updated" :datetime="getTimestamp(message).toISO()">
															<timeago :datetime="getTimestamp(message)" :auto-update="300"></timeago>
														</time>
													</span>
													</div>
													<div class="chat-message-item" v-html="message.body"></div>
												</div>
											</li>
										</transition-group>

										<template v-if="activeChat && activeChat.collab && activeChat.collab.request_id && !activeChat.collab.collab_id">
											<b-jumbotron class="text-center mb-0 py-5" :lead="`${activeChat.membersData[activeChat.collab.requested_by].displayName} has sent an invitation to collaborate.`"
											             v-if="activeChat.collab.requested_by !== user.id">
												<b-btn variant="primary" @click="acceptCollab">Accept</b-btn>&nbsp;&nbsp;&nbsp;
												<b-btn variant="dark" @click="declineCollab">Decline</b-btn>
											</b-jumbotron>
										</template>
									</template>
								</div>

								<form style="bottom: 0;position: absolute;width: 100%;" @submit.prevent="postMessage()">
									<b-form-group class="form-group label-floating label-static is-empty"
									              label="Write your reply here..." label-class="control-label" label-for="chatMessage">
										<b-form-textarea class="form-control bg-white" id="chatMessage" v-model="chatMessage" ref="textarea"></b-form-textarea>
									</b-form-group>
										<!--<html-textarea id="chatMessage" v-model="chatMessage" @enter-pressed="postMessage()" ></html-textarea>-->

									<div class="add-options-message">
										<!--<a href="#" class="options-message">
											<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
										</a>-->
										<!--<a href="#" class="options-message">
											<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
										</a>-->
										<div class="options-message smile-block">
											<!--<svg  class="olymp-happy-sticker-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-happy-sticker-icon"></use></svg>-->
											<!--<ul class="more-dropdown more-with-triangle triangle-bottom-right">
												<li v-for="i in 27" :key="i" @click="chatMessage += `:icon-chat${i}:`">
													<b-link href="#">
														<img :src="`/img/icon-chat${i}.png`" alt="icon">
													</b-link>
												</li>
											</ul>-->
										</div>

										<b-button type="submit" :disabled="!activeChat && chatMessage.length === 0" variant="primary" size="sm">Post Reply</b-button>
									</div>

								</form>

							</div>

							<!-- ... end Chat Field -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<CreateCollabModal is-request :active-chat="activeChat" />

		<md-dialog-confirm
				:md-active.sync="collabRequestCancelModal"
				md-title="Cancel Collab Request"
				md-content="Are you sure you want to cancel this Collab Request?"
				md-confirm-text="Cancel Request"
				md-cancel-text="Nevermind"
				@md-cancel="collabRequestCancelModal = false"
				@md-confirm="cancelCollabRequest" />
	</div>
</template>
<style lang="scss">
.messages-page {
  .header-spacer {
    height: 69px;
  }
  > .container {
    .messages-ui-block {
      height: 100%;
    }
  }
}
.md-progress-spinner {
  svg {
    stroke: #ff5e3a;
  }
}
</style>
<script type="text/javascript">
import _ from "lodash";
import { mapState } from "vuex";
import { DateTime } from "luxon";
import { Picker } from "emoji-mart-vue";
import Collab from "../mixins/collab";
import CreateCollabModal from "../components/modals/CreateCollabModal";

export default {
  name: "Messenger",
  components: { CreateCollabModal, Picker },
  mixins: [Collab],
  data() {
    return {
      windowHeight: 0,
      activeChat: null,
      chatMessage: "",
      showEmojiPicker: false,
      loadingMessages: false
    };
  },
  computed: {
    ...mapState(["chats", "collabs"]),
    orderedChats() {
      return this.chats ? _.toArray(this.chats.items).reverse() : [];
    },
    containerHeightStyle() {
      return `calc(${this.windowHeight}px - 70px)`;
    },
    activeChatAuthor() {
      let author;
      this.activeChat &&
        _.some(this.activeChat.membersData, (member, key) => {
          if (member.topicAuthor) {
            author = member;
            author.id = key;
            return true;
          }
        });
      return author;
    }
  },
  watch: {
    orderedChats(val, oldVal) {
      if (oldVal.length === 0 && oldVal !== val) {
        this.openChat(_.first(val));
      }
    }
  },
  methods: {
    getTimestamp(chat) {
      const timestamp = chat.updated_at || chat.created_at;
      return DateTime.fromMillis(timestamp.seconds * 1000);
    },
    otherMember(chat) {
      return _.find(chat.membersData, (member, key) => key !== this.user.id);
    },
    otherMemberPhoto(chat) {
      return _.find(chat.membersData, (member, key) => key !== this.user.id)
        .photoURL;
    },
    closeChat() {
      // this.activeChat = null;
      this.$store.dispatch("chats/messages/closeDBChannel", {
        clearModule: true
      });
    },
    openChat(chat) {
      let self = this;
      if (this.activeChat && this.activeChat.id === chat.id) return false;
      this.loadingMessages = true;
      const oldChatId = this.activeChat && this.activeChat.id;
      if (oldChatId) {
        self.$store.state.chats.messages._conf.firestorePath = self.$store.state.chats.messages._conf.firestorePath.replace(
          oldChatId,
          chat.id
        );
      }
      this.activeChat = null;
      this.$nextTick(() => {
        self.$store
          .dispatch("chats/messages/closeDBChannel", { clearModule: true })
          .then(() => {
            self.chats.messages.items = {};
            self.$nextTick(function() {
              self.activeChat = chat;
              self.$store
                .dispatch("chats/messages/openDBChannel", { chatId: chat.id })
                .then(() => {
                  // this.$root.$emit("openChatModal", chat);
                  self.$nextTick(function() {
                    const scrollBox = $(".mCustomScrollbar");
                    scrollBox.scrollTop(scrollBox.prop("scrollHeight"));
                    scrollBox.perfectScrollbar("update");
                    setTimeout(function() {
                      self.loadingMessages = false;
                    }, 200);
                  });
                })
                .catch(console.error);
            });
          });
      });
    },
    postMessage(forcedMessage) {
      const message = forcedMessage || this.chatMessage;
      if (this.activeChat) {
        this.$store
          .dispatch("chats/messages/postMessage", {
            message,
            chat: this.activeChat
          })
          .then(() => {
            this.chatMessage = "";
            const scrollBox = $(".mCustomScrollbar");
            scrollBox.scrollTop(scrollBox.prop("scrollHeight"));
            scrollBox.perfectScrollbar("update");
          });
      }
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowHeight);

      //Init
      this.getWindowHeight();

      $(".mCustomScrollbar").perfectScrollbar({
        wheelPropagation: false
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowHeight);
  }
};
</script>
