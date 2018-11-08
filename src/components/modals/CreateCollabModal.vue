<template>
	<b-modal id="create-friend-group-1" class="window-popup create-friend-group create-friend-group-1" title-tag="h6" :title="isRequest ? 'Send Collab Request' : 'Create a Collab'" hide-footer centered
						@hidden="modalHidden">
		<!--<b-link class="close icon-close" data-dismiss="modal" aria-label="Close">
			<svg class="olymp-close-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
		</b-link>-->
		<form @submit.prevent="createCollab" data-vv-scope="collabCreate">
			<b-card no-body>
				<b-tabs pills card v-model="tabIndex" class="nav-justified">
					<b-tab title="New Collab" active>
						<template v-if="tabIndex === 0">
							<b-form-group class="form-group label-floating" :class="{ 'is-empty': !collabName }"
							              :state="errorState('collabName', 'collabCreate')"
							              :invalid-feedback="errors.first('collabName', 'collabCreate')"
							              label="Collab Name" label-class="control-label" label-for="collabName">
								<b-input v-validate="'required|min:5'" v-model="collabName"
								         data-vv-as="Collab Name" :state="errorState('collabName', 'collabCreate')"
								         key="collab-name-input" id="collabName" name="collabName" type="text"></b-input>
							</b-form-group>
							<b-form-group class="form-group label-floating" :class="{ 'is-empty': !collabDescription }"
							              :state="errorState('collabDescription', 'collabCreate')"
							              :invalid-feedback="errors.first('collabDescription', 'collabCreate')"
							              label="Collab Description" label-class="control-label" label-for="collabName">
								<b-textarea v-validate="'min:5'" v-model="collabDescription"
								         data-vv-as="Collab Description" :state="errorState('collabDescription', 'collabCreate')"
								         key="collab-name-input" id="collabDescription" name="collabDescription" type="text"></b-textarea>
							</b-form-group>
						</template>

					</b-tab>
					<b-tab title="Existing Collab" :disabled="collabs && Object.keys(collabs.items).length === 0">
						<template v-if="tabIndex === 1">
							<b-form-group class="form-group label-floating" :class="{ 'is-empty': !selectedCollab }"
							              :state="errorState('collabObj', 'collabCreate')"
							              :invalid-feedback="errors.first('collabObj', 'collabCreate')"
									label="Select a Collab" label-class="control-label" label-for="collabObj">
								<b-form-select v-model="selectedCollab" :options="collabs.items" text-field="name" value-field="id"
								               v-validate="'required'"
								               data-vv-as="Collab" :state="errorState('collabObj', 'collabCreate')"
								               key="collab-object-select" id="collabObj" name="collabObj"></b-form-select>
							</b-form-group>
						</template>
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
#collabObj.form-control.custom-select {
  height: auto;
}
</style>
<script type="text/javascript">
import cloneDeep from "lodash/cloneDeep";
import pick from "lodash/pick";
import omit from "lodash/omit";
import isObject from "lodash/isObject";
import mergeObjects from "lodash/merge";
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
      tabIndex: 0,
      selectedCollab: null,
      collabName: null,
      collabDescription: null,
      collabAvatar: null
    };
  },
  methods: {
    createCollab() {
      this.$validator.validateAll("collabCreate").then(result => {
        if (result) {
          // Create Collab
          let newCollab;
          let existingCollab = this.selectedCollab
            ? cloneDeep(this.collabs.items[this.selectedCollab])
            : null;
          const chatId = this.activeChat ? this.activeChat.id : null;
          let users = {};
          if (this.activeChat) users = this.activeChat.membersData;
          else users[this.user.id] = this.userAuthorObject;
          switch (this.tabIndex) {
            default:
            case 0:
              newCollab = {
                name: this.collabName,
                description: this.collabDescription,
                chat: chatId,
                confirmed: {
                  [this.user.id]: this.userAuthorObject
                },
                confirmedList: [this.user.id],
                unconfirmed: omit(users, this.user.id),
                unconfirmedList: Object.keys(omit(users, this.user.id)),
                users,
                usersList: Object.keys(users),
                ended: false
              };
              // newCollab.confirmed[this.user.id] = this.userAuthorObject;
              this.$store.dispatch("collabs/set", newCollab).then(response => {
                console.log("Collab: ", response);
                if (this.isRequest) {
                  return this.requestCollab(response, newCollab).then(() => {
                    this.resetModal();
                    this.hideModal("create-friend-group-1");
                  });
                } else {
                  this.resetModal();
                  this.hideModal("create-friend-group-1");
                }
              });
              break;
            case 1:
              if (!isObject(existingCollab)) return false;
              mergeObjects(existingCollab.users, users);
              this.$store
                .dispatch("collabs/patch", existingCollab)
                .then(response => {
                  console.log("Collab: ", response);
                  if (this.isRequest) {
                    return this.requestCollab(
                      existingCollab.id,
                      existingCollab
                    ).then(() => {
                      this.resetModal();
                      this.hideModal("create-friend-group-1");
                    });
                  } else {
                    this.resetModal();
                    this.hideModal("create-friend-group-1");
                  }
                });
              break;
          }
        } else return false;
      });
    },
    resetModal() {
      this.tabIndex = 0;
      this.selectedCollab = null;
      this.collabName = null;
      this.collabAvatar = null;
    },
    modalHidden() {
      this.resetModal();
    }
  },
  mounted() {}
};
</script>
