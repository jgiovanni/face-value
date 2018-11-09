<template>
	<b-modal id="edit-friend-group" class="window-popup create-friend-group create-friend-group-1" title-tag="h6" title="Edit Collab" size="sm" hide-footer centered
	@hidden="modalClosing">
		<!--<b-link class="close icon-close" data-dismiss="modal" aria-label="Close">
			<svg class="olymp-close-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
		</b-link>-->
		<form v-if="collab" @submit.prevent="updateCollab" data-vv-scope="collabCreate">
			<b-form-group class="form-group label-floating" :class="{ 'is-empty': !collab.name }"
			              :state="errorState('collabName')"
			              :invalid-feedback="errors.first('collabName', 'collabCreate')"
			              label="Collab Name" label-class="control-label" label-for="collabName">
				<b-input v-validate="'required|min:5'" v-model.trim="collab.name"
				         data-vv-as="Collab Name" :state="errorState('collabName', 'collabCreate')"
				         id="collabName" name="collabName" type="text"></b-input>
			</b-form-group>
			<b-form-group class="form-group label-floating" :class="{ 'is-empty': !collab.description }"
			              :state="errorState('collabDescription', 'collabCreate')"
			              :invalid-feedback="errors.first('collabDescription', 'collabCreate')"
			              label="Collab Description" label-class="control-label" label-for="collabName">
				<b-textarea v-validate="'min:5'" v-model.trim="collab.description"
				            data-vv-as="Collab Description" :state="errorState('collabDescription', 'collabCreate')"
				            key="collab-name-input" id="collabDescription" name="collabDescription" type="text"></b-textarea>
			</b-form-group>
			<Slim :options="slimOptions"/>
		</form>
		<b-btn type="submit" @click="updateCollab" size="lg" variant="blue" block>Save Changes</b-btn>
	</b-modal>
</template>
<style>
.md-radio.md-theme-default .md-radio-container {
  border: 2px solid rgba(0, 0, 0, 0.54);
}
</style>
<script type="text/javascript">
import Collab from "../../mixins/collab";
import Slim from "../../vendor/slim/slim.vue";
import Firebase from "firebase/app";
const storage = Firebase.storage;

export default {
  name: "EditCollabModal",
  components: { Slim },
  props: {
    collab: {
      type: Object
    }
  },
  mixins: [Collab],
  data() {
    return {};
  },
  computed: {
    slimOptions() {
      if (this.collab) {
        return {
          ratio: "1:1",
          size: {
            width: 300,
            height: 300
          },
          download: false,
          push: false,
          label:
            '<svg class="olymp-computer-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg><h6>Upload Photo</h6><span>Drop Image here or browse your computer.</span>',
          service: this.slimService,
          serviceFormat: "file",
          didInit: this.slimInit
        };
      }
    }
  },
  methods: {
    modalClosing() {
      this.$parent.selectedCollab = null;
      this.hideModal("edit-friend-group");
    },
    updateCollab() {
      this.$validator.validateAll("collabCreate").then(result => {
        if (result) {
          if (result) {
            // Update Collab
            this.$store
              .dispatch("collabs/patch", this.collab)
              .then(response => {
                // Update collab request details
                let requestRef = this.$db.collection("collabRequests");
                requestRef
                  .where("collab", "==", this.collab.id)
                  .limit(1)
                  .get()
                  .then(querySnapshot => {
                    if (querySnapshot.size) {
                      querySnapshot.docs[0].ref.update({
                        collab_name: this.collab.name,
                        collab_description: this.collab.description
                      });
                    }
                  })
                  .catch(console.error);
                console.log("Collab: ", response);
                this.modalClosing();
              });
          }
          return false;
        }
      });
    },
    // called when slim has initialized
    slimInit(data, slim) {
      // current slim data object and slim reference
      // console.log(data);
      if (this.collab && this.collab.avatarUR) {
        slim.load(this.collab.avatarURL, { blockPush: true });
      }
      /*setTimeout(() => {
        slim._options.instantEdit = true;
      }, 1000);*/
    },
    // called when upload button is pressed or automatically if push is enabled
    slimService(file, progress, success, failure, slim) {
      console.log("Avatar Image Uploaded");
      let self = this;
      // slim instance reference
      // console.log(slim);
      // form data to post to server
      // set serviceFormat to "file" to receive an array of files
      // console.log(file);
      // call these methods to handle upload state
      // console.log(progress, success, failure);

      const storageRef = storage().ref();
      const photoUrlRef = storageRef.child(
        `collabs/${this.collab.id}/photo.jpg`
      );
      const uploadTask = photoUrlRef.put(file[0], {
        contentType: "image/jpeg",
        uploader: this.user.id
      });

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progressState =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress(progressState);
        },
        function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
          failure();
        },
        function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            self.$store
              .dispatch("collabs/patch", {
                id: self.collab.id,
                avatarURL: downloadURL
              })
              .then(success)
              .catch(failure);
          });
        }
      );
    }
  },
  mounted() {}
};
</script>
