import _ from "lodash";
import { mapState } from "vuex";

export default {
  data() {
    return {
      collabRequestCancelModal: false
    };
  },
  computed: {
    ...mapState(["collabs", "collabRequests"])
  },
  methods: {
    requestCollab(collabId) {
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
      // Create Collab Request
      return this.$store
        .dispatch("collabRequests/set", {
          chat: this.activeChat.id,
          collab: collabId,
          from: this.userAuthorObject,
          hasPermission,
          to: requestingList,
          confirmed: {},
          confirmedList: [],
          unconfirmedList: requestingList,
          users: this.activeChat.membersData
        })
        .then(collabRequestId => {
          // Send collab invitation in chat
          return this.$store.dispatch("chats/messages/postMessage", {
            message: "Collab Requested",
            chat: this.activeChat,
            additionalMessageData: {},
            additionalChatData: {
              collab: {
                collab_id: collabId,
                request_id: collabRequestId,
                requested_by: this.user.id
              }
            }
          });
        })
        .catch(console.error);
      // postMessage("");
    },
    createCollab() {
      this.$validator.validateAll("collabCreate").then(result => {
        if (result) {
          return this.$store
            .dispatch("collabs/set", {
              chat: this.activeChat.id,
              confirmed: [],
              users: this.activeChat.membersList
            })
            .then(result => {
              if (this.isRequest) {
                return this.requestCollab();
              }
            });
        } else return false;
      });
    },
    deleteCollab() {},
    acceptCollabRequest(request) {
      let currentUser;
      let confirmed = {};
      _.some(request.users, (member, key) => {
        if (key === this.user.id) {
          currentUser = member;
          currentUser.id = key;
        }
      });
      if (currentUser) {
        confirmed[currentUser.id] = currentUser;
        this.$store
          .dispatch("collabRequests/patch", {
            id: request.id,
            confirmed: {
              ...confirmed
            }
          })
          .catch(console.error);
        this.$store
          .dispatch("collabs/patch", {
            id: request.collab,
            confirmed: {
              ...confirmed
            }
          })
          .catch(console.error);
      }
    },
    declineCollabRequest() {
      this.$store
        .dispatch("collabRequests/patch", {
          id: this.activeChat.collab.request_id
        })
        .then(() => {
          this.collabRequestCancelModal = false;
        });
    },
    cancelCollabRequest() {
      this.$store
        .dispatch("collabRequests/delete", this.activeChat.collab.request_id)
        .then(() => {
          this.collabRequestCancelModal = false;
          return this.$store.dispatch("chats/messages/postMessage", {
            message: "Collab Request Cancelled",
            chat: this.activeChat,
            additionalMessageData: {},
            additionalChatData: {
              collab: null
            }
          });
        })
        .catch(console.error);
    }
  }
};
