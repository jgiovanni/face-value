import _ from "lodash";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["collabs", "collabRequests"])
  },
  methods: {
    requestCollab() {
      let self = this;
      // Package Collab Request data
      let users = [];
      let hasPermission = {};
      _.each(this.activeChat.membersList, member => {
        hasPermission[member] = true;
        users.push(member);
      });
      const requestingList = _.filter(
        this.activeChat.membersList,
        member => member !== self.user.id
      );
      // Create Collab
      this.$store
        .dispatch("collabs/set", {
          chat: this.activeChat.id,
          confirmed: [],
          users
        })
        .then(result => {
          // Find created collab
          const collabItem = _.find(
            this.$store.state.collabs.items,
            item => item.chat === self.activeChat.id
          );
          // Create Collab Request
          this.$store
            .dispatch("collabRequests/set", {
              chat: this.activeChat.id,
              collab: collabItem.id,
              from: {
                id: this.user.id,
                displayName: this.userData.name,
                photoURL: this.userData.photoURL,
                userName: this.userData.userName
              },
              hasPermission,
              to: requestingList,
              confirmed: {},
              confirmedList: [],
              unconfirmedList: requestingList,
              users
            })
            .then(() => {
              // Find created collab request
              const collabRequest = _.find(
                this.$store.state.collabs.requests.items,
                item => item.chat === self.activeChat.id
              );
              // Send collab invitation in chat
              this.$store.dispatch("chats/messages/postMessage", {
                message: "Collab Requested",
                chat: this.activeChat,
                additionalMessageData: {},
                additionalChatData: {
                  collab: {
                    collab_id: collabItem.id,
                    request_id: collabRequest.id,
                    requested_by: this.user.id
                  }
                }
              });
            })
            .catch(console.error);
        });
      // postMessage("");
    },
    acceptCollab() {},
    declineCollab() {},
    cancelCollab() {}
  }
};
