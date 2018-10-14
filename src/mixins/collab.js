import _ from "lodash";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["collabs"])
  },
  methods: {
    requestCollab() {
      let self = this;
      // Package Collab Request data
      let hasPermission = {};
      _.each(this.activeChat.membersList, member => {
        hasPermission[member] = true;
      });
      const requestingList = _.filter(
        this.activeChat.membersList,
        member => member !== self.user.id
      );
      // Create Collab Request
      this.$store
        .dispatch("collabs/requests/set", {
          chat: this.activeChat.id,
          from: {
            id: this.user.id,
            displayName: this.userData.name,
            photoUrl: this.userData.photoURL,
            userName: this.userData.userName
          },
          hasPermission,
          to: requestingList,
          confirmed: {},
          confirmedList: [],
          unconfirmedList: requestingList
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
                collab_id: null,
                request_id: collabRequest.id,
                requested_by: this.user.id
              }
            }
          });
        })
        .catch(console.error);
      // postMessage("");
    },
    acceptCollab() {},
    declineCollab() {},
    cancelCollab() {}
  }
};
