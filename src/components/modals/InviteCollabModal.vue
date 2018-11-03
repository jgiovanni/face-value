<template>
	<b-modal id="create-friend-group-add-friends" class="window-popup create-friend-group create-friend-group-add-friends" title-tag="h6" :title="`Invite Users to ${collab && collab.name}`" size="sm" hide-footer centered
	@hidden="modalClosing">
		<form class="form-group label-floating is-select">

			<select class="selectpicker form-control style-2 show-tick" multiple data-max-options="2" data-live-search="true">
				<option title="Green Goo Rock" data-content='<div class="inline-items">
										<div class="author-thumb">
											<img src="img/avatar52-sm.jpg" alt="author">
										</div>
											<div class="h6 author-title">Green Goo Rock</div>

										</div>'>Green Goo Rock
				</option>

				<option title="Mathilda Brinker" data-content='<div class="inline-items">
											<div class="author-thumb">
												<img src="img/avatar74-sm.jpg" alt="author">
											</div>
											<div class="h6 author-title">Mathilda Brinker</div>
										</div>'>Mathilda Brinker
				</option>

				<option title="Marina Valentine" data-content='<div class="inline-items">
											<div class="author-thumb">
												<img src="img/avatar48-sm.jpg" alt="author">
											</div>
											<div class="h6 author-title">Marina Valentine</div>
										</div>'>Marina Valentine
				</option>

				<option title="Dave Marinara" data-content='<div class="inline-items">
											<div class="author-thumb">
												<img src="img/avatar75-sm.jpg" alt="author">
											</div>
											<div class="h6 author-title">Dave Marinara</div>
										</div>'>Dave Marinara
				</option>

				<option title="Rachel Howlett" data-content='<div class="inline-items">
											<div class="author-thumb">
												<img src="img/avatar76-sm.jpg" alt="author">
											</div>
											<div class="h6 author-title">Rachel Howlett</div>
										</div>'>Rachel Howlett
				</option>

			</select>
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
  props: {
    collab: {
      type: Object
    }
  },
  mixins: [Collab],
  data() {
    return {};
  },
  methods: {
    modalClosing() {
      this.$parent.selectedCollab = null;
      this.hideModal("create-friend-group-add-friends");
    },
    updateCollab() {
      this.$validator.validateAll("collabCreate").then(result => {
        if (result) {
          if (result) {
            // Create Collab
            this.$store
              .dispatch("collabs/patch", this.collab)
              .then(response => {
                console.log("Collab: ", response);
                this.modalClosing();
              });
          }
          return false;
        }
      });
    },
  },
  mounted() {}
};
</script>
