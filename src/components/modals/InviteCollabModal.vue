<template>
  <b-modal
    id="create-friend-group-add-friends"
    class="window-popup create-friend-group create-friend-group-add-friends"
    title-tag="h6"
    :title="`Invite Students to '${collab && collab.name}'`"
    size="sm"
    hide-footer
    centered
    @hidden="modalClosing"
  >
    <form class="form-group label-floating is-select" v-if="collab">
      <div class="notification-list friend-requests" v-if="Object.keys(selectedUsers)">
        <label>Students to invite:</label>
        <div
          class="inline-items"
          v-for="(user, uid) in selectedUsers"
          :key="uid"
        >
          <div class="author-thumb">
            <img
              :src="user.photoURL || '/img/logo.png'"
              width="36"
              :alt="user.displayName"
            />
          </div>
          <div class="author-name fn">
            <div class="h6 author-title">{{ user.displayName }}</div>
            <!--
              <span class="author-subtitle">
                <template v-if="collab.confirmedList.includes(uid)">Confirmed</template>
                <template v-else>Pending</template>
              </span>
            -->
          </div>
          <md-button
            class="md-icon-button md-list-action"
            style="float: right;"
            @click="removeUser(user)"
          >
            <md-icon class="md-primary">close</md-icon>
          </md-button>
        </div>
      </div>
      <hr>
      <md-autocomplete
        v-model="selectedUser"
        :md-options="filteredUsers"
        @md-selected="addUser"
        @md-changed="debouncedSearchUsers"
        md-dense
      >
        <label>Search for students to invite...</label>

        <template slot="md-autocomplete-item" slot-scope="{ item }">
          <div class="inline-items">
            <div class="author-thumb">
              <img
                :src="item.photoURL || '/img/logo.png'"
                width="28"
                :alt="item.displayName"
              />
            </div>
            <div class="h6 author-title">{{ item.displayName }}</div>
          </div>
        </template>
      </md-autocomplete>
    </form>

    <b-btn type="submit" @click="updateCollab" size="lg" variant="blue" block
      >Save Changes</b-btn
    >
  </b-modal>
</template>
<style>
.md-radio.md-theme-default .md-radio-container {
  border: 2px solid rgba(0, 0, 0, 0.54);
}
.modal-open .md-menu-content {
  z-index: 9999;
  width: 100% !important;
  max-width: 252px !important;
}
</style>
<script type="text/javascript">
import _ from "lodash";
import algoliaSearch from "algoliasearch";
import Firebase from "firebase/app";
import { mapState } from "vuex";
import Collab from "../../mixins/collab";
import searchUsers from "../../mixins/searchUsers";
import Slim from "../../vendor/slim/slim.vue";

const storage = Firebase.storage;
const algolia = algoliaSearch("B2P40N4H7I", "cf6d307763e48368538e853f7163c2c7");
const AlgoliaSearchIndex = algolia.initIndex("users");

export default {
  name: "InviteCollabModal",
  props: {
    collab: {
      type: Object
    }
  },
  mixins: [Collab, searchUsers],
  data() {
    return {
      selectedUsers: {},
      selectedUser: null,
      searchedUsers: []
    };
  },
  computed: {
    // ...mapState(["searchedUsers"]),
    filteredUsers() {
      return (
        (this.searchedUsers &&
          _.filter(
            this.searchedUsers,
            item => !this.collab.confirmedList.includes(item.objectID)
          )) ||
        []
      );
    }
  },
  methods: {
    modalClosing() {
      this.$parent.selectedCollab = null;
      this.hideModal("create-friend-group-add-friends");
    },
    debouncedSearchUsers: _.debounce(function(e) {
      return this.searchUsers(e);
    }, 200),
    searchUsers(searchTerm) {
      // let ignoreCollabUsers = _.map(this.collab.confirmedList, id => ["uid", "!=", id] );
      return new Promise(resolve => {
        if (!searchTerm || searchTerm.length < 2) {
          resolve(this.filteredUsers);
        } else {
          this.search(searchTerm)
            .then(response => {
              console.log(response);
              this.searchedUsers = response;
              resolve(this.filteredUsers);
            })
            .catch(err => {
              console.warn(err);
            });
        }
      });
    },
    addUser(selectedUser) {
      this.selectedUsers = this.selectedUsers || {};
      this.$set(this.selectedUsers, selectedUser.objectID, selectedUser);
      this.$nextTick(() => {
        this.selectedUser = null;
      });
      return null;
    },
    removeUser(selectedUser) {
      this.$delete(this.selectedUsers, selectedUser.objectID);
    },
    updateCollab() {
      let self = this;
      this.$validator.validateAll("collabCreate").then(result => {
        if (result) {
          // Create Collab
          let updatedCollab = this.collab;
          _.merge(updatedCollab.users, this.selectedUsers);
          _.merge(updatedCollab.unconfirmed, this.selectedUsers);
          updatedCollab.usersList = Object.keys(updatedCollab.users);
          updatedCollab.unconfirmedList = Object.keys(updatedCollab.unconfirmed);
          this.$store
            .dispatch("collabs/patch", updatedCollab)
            .then(response => {
              let requestRef = self.$db.collection("collabRequests");
              requestRef
                .where("collab", "==", response)
                .limit(1)
                .get()
                .then(querySnapshot => {
                  if (querySnapshot.size) {
                    requestRef.doc(querySnapshot.docs[0].id).update({
                      unconfirmed: updatedCollab.unconfirmed,
                      unconfirmedList: updatedCollab.unconfirmedList,
                      users: updatedCollab.users,
                      usersList: updatedCollab.usersList
                    });
                  } else {
                    self.requestCollab(response, updatedCollab);
                  }
                })
                .catch(console.error);
              this.$root.$emit("showAlert", "Students invited Successfully!");
              this.modalClosing();
            });
        } else return false;
      });
    }
  },
  mounted() {}
};
</script>
