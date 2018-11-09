<template>
	<div class="ui-block">
		<div class="ui-block-title">
			<h6 class="title">My Skills</h6>
		</div>
		<div class="ui-block-content">
			<form @submit.prevent="updateProfile">
				<div class="row">
					<div class="col col-12">
						<div class="form-group label-floating">
							<md-chip v-for="(val, skill) in userData.skills" :key="skill" class="md-primary" style="font-size: .875rem;" md-deletable @md-delete="removeSkill(skill)">{{ skill }}</md-chip>
							<md-autocomplete v-model="skill" :md-options="skillsList" @md-selected="addSkill" @md-changed="searchSkills" @md-opened="searchSkills" md-dense>
								<label>Add your skills here...</label>
								<template slot="md-autocomplete-item" slot-scope="{ item }">{{ item }}</template>
							</md-autocomplete>
						</div>
					</div>
					<div class="col col-lg-6 col-md-6 col-sm-12 col-12">
						<button type="reset" class="btn btn-secondary btn-lg full-width">Restore all Attributes</button>
					</div>
					<div class="col col-lg-6 col-md-6 col-sm-12 col-12">
						<button type="submit" class="btn btn-primary btn-lg full-width">Save all Changes</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
<style>
.md-chip {
  /*font-size: .875rem !important;*/
  background-color: #ff5e3a;
  color: #fff;
  margin: 5px 0;
}
</style>
<script type="text/javascript">
import _ from "lodash";
import SkillsList from "../../assets/skills.json";
import algoliaAdmin from "../../mixins/algoliaAdmin";

export default {
  name: "Skills",
	mixins: [algoliaAdmin],
  data() {
    return {
      skillsList: [],
      skill: null,
      originalSkills: {}
    };
  },
  metaInfo () {
    return {
      title: (this.$route.meta && this.$route.meta.title) + " | " + this.$route.name
    }
  },
  methods: {
    searchSkills(searchTerm) {
      return new Promise(resolve => {
        if (!searchTerm || searchTerm.length < 3) {
          resolve(this.skillsList);
        } else {
          const snapshot = Defiant.getSnapshot(SkillsList);
          this.skillsList = JSON.search(
            snapshot,
            `//data[contains(., "${searchTerm}")]`
          );
          resolve(this.skillsList);

          /*Defiant.getSnapshot(SkillsList, function(snapshot) {
            // executed when the snapshot is created
            const found = JSON.search(snapshot, `//data[contains(., "${searchTerm}")]`);
            resolve(this.skillsList = found);
          });*/
        }
      });
    },
    addSkill(skill) {
      this.userData.skills = this.userData.skills || {};
      this.$set(this.userData.skills, skill, true);
      this.$nextTick(() => {
        this.skill = null;
      });
      return null;
    },
    removeSkill(skill) {
      this.$delete(this.userData.skills, skill);
    },
    updateProfile() {
      this.$store.dispatch("userData/patch", this.userData).then(() => {
        this.updateUsersIndicies(this.userData);
        this.$root.$emit("showAlert", "Skills Updated Successfully!");
      });
    }
  },
  mounted() {}
};
</script>
