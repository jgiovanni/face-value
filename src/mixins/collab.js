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
    requestCollab(collabId, collabData) {
      const hasChat = this.activeChat ? this.activeChat.id : null;
      // Create Collab Request
      return this.$store
        .dispatch("collabRequests/set", {
          chat: hasChat,
          collab: collabId,
          collab_name: collabData.name,
          collab_description: collabData.description,
          from: this.userAuthorObject,
          confirmed: collabData.confirmed,
          confirmedList: collabData.confirmedList,
          unconfirmed: collabData.unconfirmed,
          unconfirmedList: collabData.unconfirmedList,
          users: collabData.users,
          declined: {},
          declinedList: [],
          ended: false
        })
        .then(collabRequestId => {
          // Send collab invitation in chat
          if (hasChat) {
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
          }
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
              this.$ga.event("Collab", "create", this.item.id);
              if (this.isRequest) {
                return this.requestCollab();
              }
            });
        } else return false;
      });
    },
    deleteCollab() {},
    acceptCollabRequest(request) {
      let currentUserObj = _.pick(request.unconfirmed, this.user.id);
      let confirmed = request.confirmed;
      let unconfirmed = request.unconfirmed;
      if (currentUserObj) {
        _.merge(currentUserObj, this.userAuthorObject); // update user object if changed
        confirmed[currentUserObj.id] = currentUserObj;
        unconfirmed = _.omit(unconfirmed, currentUserObj.id);
        this.$store
          .dispatch("collabRequests/patch", {
            id: request.id,
            confirmed,
            confirmedList: Object.keys(confirmed),
            unconfirmed,
            unconfirmedList: Object.keys(unconfirmed)
          })
          .catch(console.error);
        this.$store
          .dispatch("collabs/patch", {
            id: request.collab,
            confirmed,
            confirmedList: Object.keys(confirmed),
            unconfirmed,
            unconfirmedList: Object.keys(unconfirmed)
          })
          .catch(console.error);
      }
    },
    declineCollabRequest(request) {
      let currentUserObj = _.pick(request.unconfirmed, this.user.id);
      let declined = request.declined || {};
      let unconfirmed = request.unconfirmed;
      if (currentUserObj) {
        _.merge(currentUserObj, this.userAuthorObject); // update user object if changed
        declined[currentUserObj.id] = currentUserObj;
        unconfirmed = _.omit(unconfirmed, currentUserObj.id);
        this.$store
          .dispatch("collabRequests/patch", {
            id: request.id,
            unconfirmed,
            unconfirmedList: Object.keys(unconfirmed),
            declined,
            declinedList: Object.keys(declined)
          })
          .catch(console.error);
        this.$store
          .dispatch("collabs/patch", {
            id: request.collab,
            unconfirmed,
            unconfirmedList: Object.keys(unconfirmed),
            declined,
            declinedList: Object.keys(declined)
          })
          .catch(console.error);
      }
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
