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
										<router-link :to="`/user/${otherMember(chat).userName}`" @click.prevent="" class="h6 notification-friend" v-text="otherMember(chat).displayName"></router-link>
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

									<!--<div class="more">
										<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									</div>-->
								</li>

								<!--<li class="chat-group">
									<div class="author-thumb">
										<img src="img/avatar11-sm.jpg" alt="author">
										<img src="img/avatar12-sm.jpg" alt="author">
										<img src="img/avatar13-sm.jpg" alt="author">
										<img src="img/avatar10-sm.jpg" alt="author">
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
										<b-btn v-if="activeChat.collab" variant="danger" size="sm" @click.prevent="cancelCollab">Cancel Request</b-btn>
										<b-btn v-else variant="info" size="sm" @click.prevent="requestCollab">Request Collab</b-btn>
									</div>

									<!--<b-dropdown class="more" right variant="link" size="sm" no-caret v-if="activeChat">
										<template slot="button-content">
											<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
										</template>
										<b-dropdown-item v-if="activeChat.collab" @click.prevent="cancelCollab">Cancel Request</b-dropdown-item>
										<b-dropdown-item v-else @click.prevent="requestCollab">Request Collab</b-dropdown-item>
									</b-dropdown>-->
								</div>
								<div class="mCustomScrollbar" data-mcs-theme="dark">
									<transition-group tag="ul" class="notification-list chat-message chat-message-field" name="slideUp">
										<li class="" v-for="message in chats.messages.items" :key="message.id">
											<div class="author-thumb">
												<img :src="message.author.photoUrl" width="36" :alt="message.author.displayName">
											</div>
											<div class="notification-event" style="width: 90%;">
												<div style="width: 100%;height: 20px;">
													<router-link :to="`/users/${message.author.userName}`" class="h6 notification-friend" v-text="message.author.displayName"></router-link>
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

									<template v-if="activeChat && activeChat.collab.request_id && !activeChat.collab.collab_id">
										<b-jumbotron class="text-center mb-0 py-5" :lead="`${activeChat.membersData[activeChat.collab.requested_by].displayName} has sent an invitation to collaborate.`" v-if="activeChat.collab.requested_by !== user.id">
											<b-btn variant="primary" @click="acceptCollab">Accept</b-btn>&nbsp;&nbsp;&nbsp;
											<b-btn variant="dark" @click="declineCollab">Decline</b-btn>
										</b-jumbotron>
									</template>
								</div>

								<form style="bottom: 0;position: absolute;width: 100%;" @submit.prevent="postMessage()">
									<b-form-group class="form-group label-floating is-empty"
									              label="Write your reply here..." label-class="control-label" label-for="chatMessage">
										<b-form-textarea class="form-control" id="chatMessage" v-model="chatMessage"></b-form-textarea>
									</b-form-group>

									<div class="add-options-message">
										<!--<a href="#" class="options-message">
											<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
										</a>-->
										<!--<a href="#" class="options-message">
											<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
										</a>-->
										<div class="options-message smile-block">
											<svg class="olymp-happy-sticker-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-happy-sticker-icon"></use></svg>

											<ul class="more-dropdown more-with-triangle triangle-bottom-right">
												<li>
													<a href="#">
														<img src="img/icon-chat1.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat2.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat3.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat4.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat5.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat6.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat7.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat8.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat9.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat10.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat11.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat12.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat13.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat14.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat15.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat16.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat17.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat18.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat19.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat20.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat21.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat22.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat23.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat24.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat25.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat26.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat27.png" alt="icon">
													</a>
												</li>
											</ul>
										</div>

										<b-button type="submit" :disabled="!activeChat" variant="primary" size="sm">Post Reply</b-button>
									</div>

								</form>

							</div>

							<!-- ... end Chat Field -->
						</div>
					</div>
				</div>
			</div>
		</div>
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
</style>
<script type="text/javascript">
import _ from "lodash";
import { mapState } from "vuex";
import { DateTime } from "luxon";
import Collab from "../mixins/collab";

export default {
  name: "Messenger",
	mixins: [Collab],
  data() {
    return {
      windowHeight: 0,
      activeChat: null,
      chatMessage: null
    };
  },
  computed: {
    ...mapState(["chats", "collabs"]),
    orderedChats() {
      return this.chats ? _.toArray(this.chats.items).reverse() : [];
    },
    containerHeightStyle() {
      return `calc(${this.windowHeight}px - 70px)`;
    }
  },
  watch: {
    orderedChats(val, oldVal) {
      if (oldVal.length === 0 && oldVal !== val) {
        // this.openChat(_.first(val));
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
        .photoUrl;
    },
    openChat(chat) {
      this.activeChat = chat;
      let self = this;
      this.$store
        .dispatch("chats/messages/openDBChannel", { chatId: chat.id })
        .then(() => {
          // this.$root.$emit("openChatModal", chat);
          self.$nextTick(function() {
            const scrollBox = $(".mCustomScrollbar");
            scrollBox.scrollTop(scrollBox.prop("scrollHeight"));
            scrollBox.perfectScrollbar("update");
          });
        })
        .catch(console.error);
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
            this.chatMessage = null;
            const scrollBox = $(".mCustomScrollbar");
            scrollBox.scrollTop(scrollBox.prop("scrollHeight"));
            scrollBox.perfectScrollbar("update");
          });
      }
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    },
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
