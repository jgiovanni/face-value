<template>
	<b-modal id="create-friend-group-1" class="window-popup create-friend-group create-friend-group-1" title-tag="h6" :title="isRequest ? 'Send Collab Request' : 'Create a Collab'" hide-footer centered>
		<!--<b-link class="close icon-close" data-dismiss="modal" aria-label="Close">
			<svg class="olymp-close-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
		</b-link>-->
		<form @submit.prevent="createCollab" data-vv-scope="collabCreate">
			<b-card no-body>
				<b-tabs pills card class="nav-justified">
					<b-tab title="New Collab" active>
						<b-form-group class="form-group label-floating" :class="{ 'is-empty': !collabName }"
						              :state="errorState('collabName')"
						              :invalid-feedback="errors.first('collabName', 'collabCreate')"
						              label="Collab Name" label-class="control-label" label-for="collabName">
							<b-input v-validate="'required|min:5'" v-model.trim="collabName"
							         data-vv-as="Collab Name" :state="errorState('collabName', 'collabCreate')"
							         id="collabName" name="collabName" type="text"></b-input>
						</b-form-group>
					</b-tab>
					<b-tab title="Existing Collab" :disabled="collabs && Object.keys(collabs.items).length === 0">
						<b-form-select v-model="selectedCollab" :options="collabs.items" text-field="name" value-field="id" />
					</b-tab>
				</b-tabs>
			</b-card>

			<!--<b-form-group class="form-group with-button">
				<b-file class="form-control" plain placeholder="Collab Avatar (120x120px min)"></b-file>
				<button class="bg-grey">
					<svg class="olymp-computer-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
				</button>
			</b-form-group>-->
		</form>

		<b-btn type="submit" @click="createCollab" size="lg" variant="blue" block>{{ isRequest ? "Send Request" : "Create Collab" }}</b-btn>
	</b-modal>
</template>
<style>
.md-radio.md-theme-default .md-radio-container {
  border: 2px solid rgba(0, 0, 0, 0.54);
}
</style>
<script type="text/javascript">
import Collab from "../../mixins/collab";
export default {
  name: "CreateCollabModal",
  props: {
    isRequest: {
      type: Boolean,
      default: false
    },
    activeChat: {
      type: [Object, null],
      default: null
    }
  },
  mixins: [Collab],
  data() {
    return {
      actionType: "new",
      selectedCollab: null,
      collabName: null,
      collabAvatar: null
    };
  },
  methods: {
    createCollab() {
      this.$validator.validateAll("collabCreate").then(result => {
        if (result) {
          if (result) {
            // Create Collab
	          const chatId = this.activeChat ? this.activeChat.id : null;
	          let users = {};
	          if (this.activeChat) users = this.activeChat.membersData;
	          else users[this.user.id] = this.userAuthorObject;
            this.$store
              .dispatch("collabs/set", {
                name: this.collabName,
                chat: chatId,
                confirmed: [],
                users
              })
              .then(response => {
                console.log("Collab: ", response);
                if (this.isRequest) {
                  return this.requestCollab(response).then(response1 => {
                    this.selectedCollab = null;
                    this.collabName = null;
                    this.collabAvatar = null;
                    this.hideModal("create-friend-group-1");
                  });
                } else {
                  this.selectedCollab = null;
                  this.collabName = null;
                  this.collabAvatar = null;
                  this.hideModal("create-friend-group-1");
                }
              });
          }
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>
