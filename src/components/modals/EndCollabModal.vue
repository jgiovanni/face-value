<template>
	<b-modal id="end-collab" title="End Collab" ok-title="Complete Collab" @ok="finalizeCollab" centered>
		<template v-if="collab">
			<b-form-group label="Was the Collab successful?" label-class="control-label" label-for="collabSuccess"
			              horizontal>
				<md-radio v-model="success" :value="true">Yes</md-radio>
				<md-radio v-model="success" :value="false">No</md-radio>
				<!--<b-form-radio-group id="collabSuccess" name="collabSuccess" buttons v-model="selectedCollab.success"
														button-variant="outline-primary"
														:options="[{ text: 'Yes', value: true }, { text: 'No', value: false }]">
				</b-form-radio-group>-->
			</b-form-group>
		</template>
	</b-modal>
</template>
<style lang="scss">
#collabSuccess {
  .btn:not(.active) {
    color: #000;
  }
}
</style>
<script type="text/javascript">
export default {
  name: "EndCollabModal",
  props: ["collab"],
  data() {
    return {
      success: null
    };
  },
  methods: {
    finalizeCollab() {
      this.$store
        .dispatch("collabs/patch", {
          id: this.collab.id,
          success: this.success,
          ended: true
        })
        .then(() => {
          let requestRef = this.$db.collection("collabRequests");
          requestRef
            .where("collab", "==", this.collab.id)
            .limit(1)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.size) {
                requestRef.doc(querySnapshot.docs[0].id).delete();
              }
            })
            .catch(console.error);
        })
        .catch(console.error);
    },
    modalHidden() {
      this.success = null;
      this.$emit("hidden");
    }
  },
  mounted() {}
};
</script>
