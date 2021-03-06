import _ from "lodash";
import Firebase from "firebase/app";
import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import VueAnalytics from "vue-analytics";
import VueMaterial from "vue-material";
import VeeValidate from "vee-validate";
import VueTimeago from "vue-timeago";
import VCalendar from "v-calendar";
import Overdrive from "vue-overdrive";
import vSelect from "vue-select";
import htmlTextarea from "./components/htmlTextArea";
import router from "./router";
import { store, firebaseApp } from "./store/index";
import { DateTime } from "luxon";
import "./registerServiceWorker";

/* CSS Imports */
// import "bootstrap/dist/css/bootstrap.css";
import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default.css";
import "selectize/dist/css/selectize.css";
import "./vendor/sass/main.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "v-calendar/lib/v-calendar.min.css";
import algoliaSearch from "algoliasearch";
// import "./vendor/slim/slim.css";

Vue.config.productionTip = false;

Vue.use(VCalendar, {
  firstDayOfWeek: 2 // Monday
});
Vue.use(Overdrive);
Vue.use(BootstrapVue);
Vue.use(VueMaterial);
Vue.use(VeeValidate);
Vue.use(VueAnalytics, {
  id: "UA-27155404-19",
  router,
  ignoreRoutes: [],
  debug: {
    sendHitTask: process.env.NODE_ENV === "production"
  }
});
Vue.use(VueTimeago, {
  name: "Timeago",
  locale: "en"
});

// Register component(s)
Vue.component("v-select", vSelect);
Vue.component("html-textarea", htmlTextarea);
Vue.mixin({
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userData() {
      return this.$store.getters["userData/userData"];
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    isFirstLogin() {
      let metadata;
      if (this.user) {
        metadata = Firebase.auth().currentUser.metadata;
        return metadata.creationTime === metadata.lastSignInTime;
      } else return null;
    },
    userIsStudent() {
      return (
        this.userIsAuthenticated &&
        this.$store.userData !== null &&
        this.$store.getters.isStudent
      );
    },
    userAuthorObject() {
      return (
        this.user &&
        this.userData && {
          id: this.user.id,
          displayName: this.userData.name,
          photoURL: this.userData.photoURL,
          userName: this.userData.userName
        }
      );
    }
  },
  methods: {
    randomInt: _.random,
    getTimestamp(timestamp) {
      return DateTime.fromMillis(timestamp.seconds * 1000);
    },
    errorClass(field, scope) {
      return { input: true, "is-danger": this.errors.has(field, scope) };
    },
    hasError(field, scope) {
      return this.errors && this.errors.has(field, scope);
    },
    errorState(field, scope) {
      return !(this.errors && this.errors.has(field, scope));
    },
    // Auth Modal Show/Hide
    showAuthModal() {
      this.$root.$emit("bv::show::modal", "registration-login-form-popup");
    },
    hideAuthModal() {
      this.$root.$emit("bv::hide::modal", "registration-login-form-popup");
    },
    showCreateCollabModal() {
      this.$root.$emit("bv::show::modal", "create-friend-group-1");
    },
    showModal(id) {
      this.$root.$emit("bv::show::modal", id);
    },
    hideModal(id) {
      this.$root.$emit("bv::hide::modal", id);
    }
  },
  created() {}
});

Vue.filter("truncate", function(text, length, clamp) {
  text = text || "";
  clamp = clamp || "...";
  length = length || 30;

  if (text.length <= length) return text;

  let tcText = text.slice(0, length - clamp.length);
  let last = tcText.length - 1;

  while (last > 0 && tcText[last] !== " " && tcText[last] !== clamp[0])
    last -= 1;

  // Fix for case when text dont have any `space`
  last = last || length - clamp.length;

  tcText = tcText.slice(0, last);

  return tcText + clamp;
});

new Vue({
  router,
  store,
  render: h => h(App),
  data() {
    return {
      appReady: false
    };
  },
  watch: {
    appReady() {
      this.$router.start();
    },
    userIsAuthenticated(val) {
      if (!val) {
        this.$router.push("/hello");
      }
    }
  },
  methods: {
    // enable firestore with persistence
    async getFirestore () {
      const firestore = Firebase.firestore();
      firestore.settings({ timestampsInSnapshots: true });
      try {
        await firestore.enablePersistence();
      } catch (err) {
        console.log("err.code → ", err.code);
        if (err.code === "failed-precondition") {
          // Multiple tabs open, persistence can only be enabled in one tab at a a time.
          console.log("firebase/failed-precondition");
        } else if (err.code === "unimplemented") {
          // The current browser does not support all of the
          // features required to enable persistence
          return firestore;
        }
      }
      return firestore;
    }
  },
  async created() {
    // console.log("Created App");
    let self = this;
    return firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        if (this.isFirstLogin) {
          let algolia = algoliaSearch(
            "B2P40N4H7I",
            "0df51b06c9678a484cc44e90687d795d"
          );
          const AlgoliaUsersIndex = algolia.initIndex("users");
          AlgoliaUsersIndex.saveObject({
            objectID: user.uid,
            displayName: user.displayName,
            userName: user.userName,
            photoURL: user.photoURL
          });
        }
        self.$store.dispatch("autoSignIn", user.toJSON()).then(() => {
          self.$store
            .dispatch("userData/openDBChannel", { userId: user.uid })
            .then(result => {
              console.log("UserData: ", result);
              self.$store.dispatch("init", { user });
              self.appReady = true;
            })
            .catch(console.error);
        });
      } else {
        this.appReady = true;
      }
    });
  }
}).$mount("#app");
