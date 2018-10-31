<template>
	<div>
		<!-- Fixed Sidebar Right -->

		<div class="fixed-sidebar right" :class="{ 'open': sidebarState }">
			<div class="fixed-sidebar-right sidebar--small" id="sidebar-right">

				<div class="mCustomScrollbar" data-mcs-theme="dark">
					<transition-group tag="ul" class="chat-users" name="slideRight">
						<li class="inline-items" @click.prevent="openChatModal(chat)" v-for="chat in chats.items" :key="chat.id">
							<div class="author-thumb">
								<img alt="author" :src="otherMemberPhoto(chat)" width="34" class="avatar">
								<span class="icon-status" :class="[otherMemberStatus(chat)]"></span>
							</div>
						</li>
					</transition-group>
				</div>

				<div class="search-friend inline-items">
					<a href="#" @click.prevent="toggleSidebar" class="">
						<svg class="olymp-menu-icon">
							<use xlink:href="/svg-icons/sprites/icons.svg#olymp-menu-icon"></use>
						</svg>
					</a>
				</div>

				<router-link to="/messages" class="olympus-chat inline-items">
					<svg class="olymp-chat---messages-icon">
						<use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
					</svg>
				</router-link>

			</div>

			<div class="fixed-sidebar-right sidebar--large" id="sidebar-right-1">

				<div class="mCustomScrollbar" data-mcs-theme="dark">

					<div class="ui-block-title ui-block-title-small">
						<a href="#" class="title">Close Friends</a>
						<a href="#">Settings</a>
					</div>

					<transition-group tag="ul" class="chat-users" name="slideRight">
					<li class="inline-items" @click.prevent="openChatModal(chat)" v-for="chat in filteredChats" :key="chat.id">

						<div class="author-thumb">
							<img alt="author" :src="otherMemberPhoto(chat)" width="34" class="avatar">
							<span class="icon-status" :class="[otherMemberStatus(chat)]"></span>
						</div>

						<div class="author-status">
							<a href="#" class="h6 author-name" v-text="otherMember(chat).displayName"></a>
							<span class="status" v-text="chat.latestMessage"></span>
						</div>

						<div class="more">
							<svg class="olymp-three-dots-icon">
								<use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
							</svg>

							<ul class="more-icons">
								<li>
									<svg v-b-tooltip.hover
									     title="START CONVERSATION"
									     class="olymp-comments-post-icon">
										<use xlink:href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
									</svg>
								</li>

								<li>
									<svg v-b-tooltip.hover
									     title="ADD TO CONVERSATION"
									     class="olymp-add-to-conversation-icon">
										<use xlink:href="/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
									</svg>
								</li>

								<li>
									<svg v-b-tooltip.hover
									     title="BLOCK FROM CHAT"
									     class="olymp-block-from-chat-icon">
										<use xlink:href="/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
									</svg>
								</li>
							</ul>

						</div>

					</li>
					</transition-group>

				</div>

				<div class="search-friend inline-items">
					<b-form-group class="form-group">
						<b-input class="form-control" placeholder="Search..." v-model="chatsSearch" type="text"></b-input>
					</b-form-group>

					<a href="29-YourAccount-AccountSettings.html" class="settings" @click.prevent="" style="visibility: hidden;">
						<svg class="olymp-settings-icon">
							<use xlink:href="/svg-icons/sprites/icons.svg#olymp-settings-icon"></use>
						</svg>
					</a>

					<a href="#" @click.prevent="toggleSidebar" class="">
						<svg class="olymp-close-icon">
							<use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use>
						</svg>
					</a>
				</div>

				<a href="#" class="olympus-chat inline-items js-chat-open">

					<h6 class="olympus-chat-title">CHAT</h6>
					<svg class="olymp-chat---messages-icon">
						<use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
					</svg>
				</a>

			</div>
		</div>

		<!-- ... end Fixed Sidebar Right -->


		<!-- Fixed Sidebar Right-Responsive -->

		<div class="fixed-sidebar right fixed-sidebar-responsive">

			<div class="fixed-sidebar-right sidebar--small" id="sidebar-right-responsive">

				<a href="#" class="olympus-chat inline-items js-chat-open">
					<svg class="olymp-chat---messages-icon">
						<use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
					</svg>
				</a>

			</div>

		</div>

		<!-- ... end Fixed Sidebar Right-Responsive -->
	</div>
</template>
<style lang="scss">
.chat-users {
  .status {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 150px;
  }
}
.icon-status.on-campus {
	background-color: #32e4cd;
}

</style>
<script type="text/javascript">
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "ChatSidebar",
  data() {
    return {
      sidebarState: false,
      chatsSearch: "",
      activeChat: null
    };
  },
  computed: {
    ...mapState(["chats", "status"]),
    filteredChats() {
      let self = this;
      return (
        this.chats &&
        _.filter(this.chats.items, item => {
          let test = true;
          if (self.chatsSearch && self.chatsSearch.length)
            test = !!_.some(item.membersData, member =>
              member.displayName.includes(self.chatsSearch)
            );
          return test;
        })
      );
    }
  },
  methods: {
    otherMember(chat) {
      return _.find(chat.membersData, (member, key) => key !== this.user.id);
    },
    otherMemberStatus(chat) {
      const id = this.otherMember(chat).id;
      if (this.status[id]) return this.status[id].state;
      return "disconected";
    },
    otherMemberPhoto(chat) {
      return _.find(chat.membersData, (member, key) => key !== this.user.id)
        .photoURL;
    },
    toggleSidebar() {
      this.sidebarState = !this.sidebarState;
    },
    openChatModal(chat) {
      let self = this;
      const oldChatId = this.activeChat && this.activeChat.id;
      if (oldChatId) {
        self.$store.state.chats.messages._conf.firestorePath = self.$store.state.chats.messages._conf.firestorePath.replace(
          oldChatId,
          chat.id
        );
      }
      this.activeChat = null;
      this.$store
        .dispatch("chats/messages/closeDBChannel", { clearModule: true })
        .then(() => {
          self.chats.messages.items = {};
          self.$nextTick(function() {
            this.activeChat = chat;
            this.$store
              .dispatch("chats/messages/openDBChannel", { chatId: chat.id })
              .then(() => {
                this.$root.$emit("openChatModal", chat);
              })
              .catch(console.error);
          });
        });
    }
  },
  created() {
    let self = this;
  }
};
</script>
