import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import VueAnalytics from "vue-analytics";
import VueMaterial from "vue-material";
import VeeValidate from "vee-validate";
import VueTimeago from "vue-timeago";
import Overdrive from "vue-overdrive";
import VueTagsInput from "@johmun/vue-tags-input";
import vSelect from "vue-select";
import router from "./router";
import { store, firebaseApp } from "./store/index";
import { mapState } from "vuex";
import "./registerServiceWorker";

/* CSS Imports */
// import "bootstrap/dist/css/bootstrap.css";
import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default.css";
import "selectize/dist/css/selectize.css";
import "./vendor/sass/main.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

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

Vue.component("v-select", vSelect);
Vue.component("tags-input", VueTagsInput);

Vue.mixin({
  computed: {
    ...mapState(["userData"]),
    user() {
      return this.$store.getters.user;
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    userIsStudent() {
      return (
        this.userIsAuthenticated &&
        this.$store.userData !== null &&
        this.$store.getters.isStudent
      );
    }
    /*userIsMerchant () {
      return this.userIsAuthenticated && this.$store.userData !== null && this.$store.getters.isMerchant
    },
    userIsAdmin () {
      return this.userIsAuthenticated && this.$store.userData !== null && this.$store.getters.isAdmin
    }*/
  },
  methods: {
    errorClass(field, scope) {
      return { input: true, "is-danger": this.errors.has(field, scope) };
    },
    hasError(field, scope) {
      return this.errors && this.errors.has(field, scope);
    },
    errorState(field, scope) {
      return !(this.errors && this.errors.has(field, scope));
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
  async created() {
    console.log("Created App");
    let self = this;
    return firebaseApp.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        self.$store.dispatch("autoSignIn", user.toJSON()).then(() => {
          self.$store
            .dispatch("userData/openDBChannel")
            .then(result => {
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
