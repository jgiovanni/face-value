<template>
	<b-modal id="update-header-photo" class="window-popup update-header-photo" title-tag="h6" title="Update Header Photo" hide-footer centered size="lg">
		<Slim v-if="userData" :options="slimOptions"/>
	</b-modal>
</template>
<style lang="scss">
button.close {
  padding: 0 !important;
  margin: 0 !important;
}
.slim {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
<script type="text/javascript">
import firebase from "firebase/app";
import Slim from "../../vendor/slim/slim.vue";
const storage = firebase.storage;
const DefaultHeader = require("../../vendor/img/top-header-ocadu.jpg");

export default {
  name: "HeaderUploadModal",
  components: { Slim },
  data() {
    return {};
  },
  computed: {
    slimOptions() {
      if (this.userData) {
        return {
          ratio: "3:1",
          size: {
            width: 1920,
            height: 640
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
    // called when slim has initialized
    slimInit(data, slim) {
      // current slim data object and slim reference
      slim.load(this.userData.headerURL || DefaultHeader, { blockPush: true });
      /*setTimeout(() => {
        slim._options.instantEdit = true;
      }, 1000);*/
    },
    // called when upload button is pressed or automatically if push is enabled
    slimService(file, progress, success, failure, slim) {
      console.log("Header Image Uploaded");
      let self = this;
      // slim instance reference
      // console.log(slim);
      // form data to post to server
      // set serviceFormat to "file" to receive an array of files
      // console.log(file);
      // call these methods to handle upload state
      // console.log(progress, success, failure);

      const storageRef = storage().ref();
      const headerUrlRef = storageRef.child(`users/${this.user.id}/header.jpg`);
      const uploadTask = headerUrlRef.put(file[0], {
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
            self.$store.dispatch("userData/patch", {
              headerURL: downloadURL
            }).then(success).catch(failure);
          });
        }
      );
    }
  },
  mounted() {}
};
</script>
