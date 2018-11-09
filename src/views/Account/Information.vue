<template>
  <div class="ui-block">
    <div class="ui-block-title">
      <h6 class="title">Personal Information</h6>
    </div>
    <div class="ui-block-content">
      <!-- Personal Information Form -->
      <form @submit.prevent="updateProfile">
        <div class="row">
          <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
            <b-form-group
              class="form-group label-floating"
              :class="{ 'is-empty': !userData.name }"
              :state="errorState('name')"
              :invalid-feedback="errors.first('name')"
              label="Your Full Name"
              label-class="control-label"
              label-for="name"
            >
              <b-input
                v-validate="'required'"
                v-model="userData.name"
                :state="errorState('name')"
                id="name"
                name="name"
                type="text"
              ></b-input>
            </b-form-group>

            <b-form-group
              class="form-group label-floating"
              :class="{ 'is-empty': !userData.program }"
              :state="errorState('program')"
              :invalid-feedback="errors.first('program')"
              label="Your Program/Major"
              label-class="control-label"
              label-for="program"
            >
              <b-form-select
                id="program"
                name="program"
                v-model="userData.program"
                class="mb-3"
                style="height: auto;"
              >
                <optgroup label="Undergraduate Programs">
                  <option
                    v-for="opt in programOptions.undergraduate"
                    :key="opt"
                    :value="opt"
                    >{{ opt }}</option
                  >
                </optgroup>
                <optgroup label="Graduate Programs">
                  <option
                    v-for="opt in programOptions.graduate"
                    :key="opt"
                    :value="opt"
                    >{{ opt }}</option
                  >
                </optgroup>
              </b-form-select>
            </b-form-group>

            <b-form-group
              class="form-group label-floating"
              :state="errorState('programYear')"
              :invalid-feedback="errors.first('programYear')"
              label="Your Graduation Year"
              label-class="control-label"
              label-for="programYear"
            >
              <b-input
                v-validate="'required|date_format:YYYY'"
                v-model="userData.programYear"
                :state="errorState('programYear')"
                placeholder="2020"
                min="2018"
                id="programYear"
                name="programYear"
                type="number"
              ></b-input>
            </b-form-group>
          </div>

          <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
            <b-form-group
              class="form-group label-floating"
              :class="{ 'is-empty': !userData.email }"
              :state="errorState('email')"
              :invalid-feedback="errors.first('email')"
              label="Your Email"
              label-class="control-label"
              label-for="email"
            >
              <b-input
                v-validate="'required'"
                v-model="userData.email"
                :state="errorState('email')"
                disabled
                id="email"
                name="email"
                type="email"
              ></b-input>
            </b-form-group>

            <b-form-group
              class="form-group label-floating"
              :class="{ 'is-empty': !userData.userName }"
              :state="errorState('userName')"
              :disabled="userData.userNameChanged"
              :invalid-feedback="errors.first('userName')"
              description="You can change your user name once."
              label="User Name"
              label-class="control-label"
              label-for="userData"
            >
              <b-input
                v-model="userData.userName"
                disabled
                :state="errorState('userName')"
                v-validate="'required|alpha_num|min:5'"
                data-vv-as="User Name"
                id="userData"
                name="userName"
                type="text"
              ></b-input>
            </b-form-group>

            <b-form-group class="form-group label-floating">
              <label
                style="z-index: 1"
                class="control-label pb-1"
                for="profileURL"
                >Public Profile URL</label
              >
              <b-input-group>
                <b-input
                  readonly
                  :value="webHost + profileUrl"
                  style="z-index: 0;"
                  id="profileURL"
                  name="profileURL"
                ></b-input>
                <b-input-group-append>
                  <b-btn
                    style="height: 100%;"
                    variant="secondary"
                    @click="copyToClipboard"
                    v-b-tooltip.hover
                    title="Copy to clipboard"
                    ><i class="fa fa-clipboard fa-2x"></i
                  ></b-btn>
                </b-input-group-append>
              </b-input-group>

              <!--
                <h5><b-link class="heading-title" :to="profileUrl" v-text="webHost + profileUrl"></b-link></h5>
              -->
            </b-form-group>
          </div>

          <div class="col col-12">
            <b-form-group
              class="form-group label-floating"
              :class="{ 'is-empty': !userData.about }"
              :state="errorState('about')"
              :invalid-feedback="errors.first('about')"
              label="Write a little description about you"
              label-class="control-label"
              label-for="about"
            >
              <b-textarea
                v-validate="'min:3'"
                v-model="userData.about"
                :state="errorState('about')"
                id="about"
                name="about"
              ></b-textarea>
            </b-form-group>

            <!--
              <div class="form-group label-floating">
              	<md-chip v-for="(val, skill) in userData.skills" :key="skill" class="md-primary" style="font-size: .875rem;" md-deletable @md-delete="removeSkill(skill)">{{ skill }}</md-chip>
              	<md-autocomplete v-model="skill" :md-options="skillsList" @md-selected="addSkill" @md-changed="searchSkills" @md-opened="searchSkills" md-dense>
              		<label>Add skills you are looking for here...</label>

              		<template slot="md-autocomplete-item" slot-scope="{ item }">{{ item }}</template>
              	</md-autocomplete>
              </div>
            -->
          </div>

          <div class="col col-12"><h6>Social Links</h6></div>

          <!--
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
            	<b-form-group class="form-group with-icon label-floating" :class="{ 'is-empty': !userData.website }"
            								:state="errorState('website')"
            								:invalid-feedback="errors.first('website')"
            								label="Your Website/Portfolio" label-class="control-label" label-for="name">
            		<b-input v-validate="'min:3'" v-model="userData.website"
            						 :state="errorState('website')"
            						 id="website" name="website" type="url"></b-input>
            		<i class="fa fa-globe" style="top: 11px;" aria-hidden="true"></i>
            	</b-form-group>
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
            	<b-form-group class="form-group with-icon label-floating" :class="{ 'is-empty': !userData.phoneNumber }"
            								:state="errorState('phoneNumber')"
            								:invalid-feedback="errors.first('phoneNumber')"
            								label="Your Phone Number" label-class="control-label" label-for="name">
            		<b-input v-validate="''" v-model="userData.phoneNumber"
            						 :state="errorState('phoneNumber')"
            						 id="phoneNumber" name="phoneNumber" type="tel"></b-input>
            		<i class="fa fa-phone" style="top: 11px;" aria-hidden="true"></i>
            	</b-form-group>
            </div>
          -->

          <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <b-form-group
              class="form-group with-icon label-floating"
              :class="{ 'is-empty': !userData.website }"
              :state="errorState('website')"
              :invalid-feedback="errors.first('website')"
              label="Your Website/Portfolio"
              label-class="control-label"
              label-for="name"
            >
              <b-input
                v-validate="'min:3'"
                v-model="userData.website"
                :state="errorState('website')"
                data-vv-as="Website/Portfolio"
                id="website"
                name="website"
                type="url"
              ></b-input>
              <i class="fa fa-globe" style="top: 11px;" aria-hidden="true"></i>
            </b-form-group>

            <template v-if="userData.social">
              <b-form-group
                class="form-group with-icon label-floating"
                :class="{ 'is-empty': !userData.social.linkedIn }"
                :state="errorState('socialLinkedIn')"
                :invalid-feedback="errors.first('socialLinkedIn')"
                label="Your LinkedIn Profile URL"
                label-class="control-label"
                label-for="name"
              >
                <b-input
                  v-validate="'url'"
                  v-model="userData.social.linkedIn"
                  :state="errorState('socialLinkedIn')"
                  data-vv-as="LinkedIn Profile"
                  id="socialLinkedIn"
                  name="socialLinkedIn"
                  type="url"
                ></b-input>
                <i
                  class="fab fa-linkedin-in c-facebook"
                  style="top: 11px;"
                  aria-hidden="true"
                ></i>
              </b-form-group>

              <b-form-group
                class="form-group with-icon label-floating"
                :class="{ 'is-empty': !userData.social.instagram }"
                :state="errorState('socialInstagram')"
                :invalid-feedback="errors.first('socialInstagram')"
                label="Your Instagram Handle"
                label-class="control-label"
                label-for="name"
              >
                <b-input
                  v-validate="''"
                  v-model="userData.social.instagram"
                  :state="errorState('socialInstagram')"
                  data-vv-as="Instagram Handle"
                  id="socialInstagram"
                  name="socialInstagram"
                  type="text"
                ></b-input>
                <i
                  class="fab fa-instagram c-dribbble"
                  style="top: 11px;"
                  aria-hidden="true"
                ></i>
              </b-form-group>

              <b-form-group
                class="form-group with-icon label-floating"
                :class="{ 'is-empty': !userData.social.facebook }"
                :state="errorState('socialFacebook')"
                :invalid-feedback="errors.first('socialFacebook')"
                label="Your Facebook Profile URL"
                label-class="control-label"
                label-for="name"
              >
                <b-input
                  v-validate="'url'"
                  v-model="userData.social.facebook"
                  :state="errorState('socialFacebook')"
                  data-vv-as="Facebook Profile"
                  id="socialFacebook"
                  name="socialFacebook"
                  type="url"
                ></b-input>
                <i
                  class="fab fa-facebook-f c-facebook"
                  style="top: 11px;"
                  aria-hidden="true"
                ></i>
              </b-form-group>

              <b-form-group
                class="form-group with-icon label-floating"
                :class="{ 'is-empty': !userData.social.twitter }"
                :state="errorState('socialTwitter')"
                :invalid-feedback="errors.first('socialTwitter')"
                label="Your Twitter Handle"
                label-class="control-label"
                label-for="name"
              >
                <b-input
                  v-validate="''"
                  v-model="userData.social.twitter"
                  :state="errorState('socialTwitter')"
                  data-vv-as="Twitter Handle"
                  id="socialTwitter"
                  name="socialTwitter"
                  type="text"
                ></b-input>
                <i
                  class="fab fa-twitter c-twitter"
                  style="top: 11px;"
                  aria-hidden="true"
                ></i>
              </b-form-group>

              <b-form-group
                class="form-group with-icon label-floating"
                :class="{ 'is-empty': !userData.social.dribbble }"
                :state="errorState('socialDribbble')"
                :invalid-feedback="errors.first('socialDribbble')"
                label="Your Dribbble Profile URL"
                label-class="control-label"
                label-for="name"
              >
                <b-input
                  v-validate="''"
                  v-model="userData.social.dribbble"
                  :state="errorState('socialDribbble')"
                  data-vv-as="Dribbble Profile"
                  id="socialDribbble"
                  name="socialDribbble"
                  type="text"
                ></b-input>
                <i
                  class="fab fa-dribbble c-dribbble"
                  style="top: 11px;"
                  aria-hidden="true"
                ></i>
              </b-form-group>

	            <b-form-group
                class="form-group with-icon label-floating"
                :class="{ 'is-empty': !userData.social.deviantArt }"
                :state="errorState('socialDeviantArt')"
                :invalid-feedback="errors.first('socialDeviantArt')"
                label="Your DeviantArt Profile URL"
                label-class="control-label"
                label-for="name"
              >
                <b-input
                  v-validate="''"
                  v-model="userData.social.deviantArt"
                  :state="errorState('socialDeviantArt')"
                  data-vv-as="DeviantArt Profile"
                  id="socialDeviantArt"
                  name="socialDeviantArt"
                  type="text"
                ></b-input>
                <i
                  class="fab fa-deviantart c-deviantart"
                  style="top: 11px;"
                  aria-hidden="true"
                ></i>
              </b-form-group>
            </template>
          </div>
          <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
            <button type="reset" class="btn btn-secondary btn-lg full-width">
              Restore all Attributes
            </button>
          </div>
          <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
            <button type="submit" class="btn btn-primary btn-lg full-width">
              Save all Changes
            </button>
          </div>
        </div>
      </form>
      <!-- ... end Personal Information Form -->
    </div>
  </div>
</template>
<style></style>
<script type="text/javascript">
import _ from "lodash";
import { mapState } from "vuex";
import * as Firebase from "firebase/app";
// import Defiant from "defiant.js/dist/defiant";
import SkillsList from "../../assets/skills.json";
import algoliaAdmin from "../../mixins/algoliaAdmin";

export default {
  name: "MyAccount",
  mixins: [algoliaAdmin],
  data() {
    return {
      programOptions: {
        undergraduate: [
          "Advertising",
          "Creative Writing",
          "Criticism & Curatorial Practice",
          "Cross-Disciplinary Art: Life Studies",
          "Cross-Disciplinary Art: Publications",
          "Digital Futures",
          "Drawing & Painting",
          "Drawing & Painting: Digital Painting and Expanded Animation",
          "Environmental Design",
          "Environmental Design: Interior Design Specialization",
          "Graphic Design",
          "Illustration",
          "Indigenous Visual Culture",
          "Industrial Design",
          "Integrated Media",
          "Integrated Media: Digital Painting and Expanded Animation",
          "Material Art & Design",
          "Photography",
          "Printmaking",
          "Sculpture/Installation",
          "Visual & Critical Studies"
        ],
        graduate: [
          "Contemporary Art, Design and New Media Art Histories",
          "Criticism and Curatorial Practice",
          "Design for Health",
          "Digital Futures",
          "Inclusive Design",
          "Interdisciplinary Master's in Art, Media and Design",
          "Strategic Foresight and Innovation"
        ]
      },
      skillsList: [],
      skill: null
    };
  },
  metaInfo () {
    return {
      title: (this.$route.meta && this.$route.meta.title) + " | " + this.$route.name
    }
  },
  computed: {
    webHost() {
      return window.location.host;
    },
    profileUrl() {
      return "/fv/" + this.userData.userName;
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
      let self = this;
      this.$store.dispatch("userData/patch", this.userData).then(() => {
        Firebase.auth().currentUser.updateProfile({
          displayName: self.userData.name,
          phoneNumber: self.userData.phoneNumber,
          photoURL: self.userData.photoURL
        });
        this.$store.dispatch("autoSignIn", {
          uid: self.user.id,
          displayName: self.userData.name,
          photoURL: self.userData.photoURL
        });
        this.updateUsersIndicies(self.userData);
        this.$root.$emit("showAlert", "Profile Updated Successfully!");
      });
    },
    copyToClipboard() {
      /* Get the text field */
      const copyText = document.getElementById("profileURL");
      /* Select the text field */
      copyText.select();
      /* Copy the text inside the text field */
      document.execCommand("copy");
      /* Alert the copied text */
      this.$root.$emit("showAlert", "Copied the text: " + copyText.value);
    }
  },
  mounted() {
    if (this.userData && !this.userData.social) {
      this.userData.social = {};
    }
  }
};
</script>
