import Vue from "vue";
import { store } from "./store/index";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Landing from "./views/Landing.vue";
import TermsOfService from "./views/TermsOfService.vue";
import PrivacyPolicy from "./views/PrivacyPolicy.vue";
import Account from "./views/Account.vue";
import AccountInformation from "./views/Account/Information.vue";
import AccountSkills from "./views/Account/Skills.vue";
import AccountChangePassword from "./views/Account/ChangePassword.vue";
import Profile from "./views/Profile.vue";
import ProfileHome from "./views/Profile/Home.vue";
import ProfileAbout from "./views/Profile/About.vue";
import UserProfile from "./views/ProfileView.vue";
import UserHome from "./views/User/Home.vue";
import Messenger from "./views/Messenger.vue";
import Collabs from "./views/Collabs.vue";
import CollabView from "./views/CollabView.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/hello",
      name: "Hello",
      component: Landing,
      meta: {
        rootClasses: "landing-page",
        headerClasses: ""
      }
    },
    {
      path: "/terms",
      name: "Terms of Service",
      component: TermsOfService,
      meta: {
        navigation: "public",
        rootClasses: "",
        headerClasses: ""
      }
    },
    {
      path: "/privacy-policy",
      name: "Privacy Policy",
      component: PrivacyPolicy,
      meta: {
        navigation: "public",
        rootClasses: "",
        headerClasses: ""
      }
    },
    {
      path: "/about",
      name: "about",
      meta: {
        access: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    // Authenticated Routes (User must be logged in)
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        access: true,
        navigation: "main",
        navigationIcon: "olymp-newsfeed-icon",
        navigationTitle: "Home"
      }
    },
    {
      path: "/messages",
      name: "Messenger",
      component: Messenger,
      meta: {
        rootClasses: "messages-page",
        access: true,
        navigation: "main",
        navigationIcon: "olymp-chat---messages-icon",
        navigationTitle: "Messages"
      }
    },
    {
      path: "/collabs",
      name: "Collabs",
      component: Collabs,
      meta: {
        rootClasses: "collabs-page",
        access: true,
        navigation: "main",
        navigationIcon: "olymp-happy-faces-icon",
        navigationTitle: "Collabs"
      }
    },
    {
      path: "/collabs/:id",
      name: "Collab",
      component: CollabView,
      meta: {
        rootClasses: "collabs-page",
        access: true,
        navigationIcon: "olymp-happy-faces-icon",
        navigationTitle: "Collabs"
      }
    },
    {
      path: "/profile",
      component: Profile,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: "",
          name: "Profile",
          component: ProfileHome,
          meta: { title: "Profile", navigation: "profile" }
        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: "about",
          component: ProfileAbout,
          meta: { title: "About", navigation: "profile" }
        }
      ],
      meta: {
        access: true
      }
    },
    {
      path: "/account",
      component: Account,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: "",
          name: "Account",
          component: AccountInformation,
          meta: { title: "Personal Information", navigation: "settings" }
        },
        {
          path: "skills",
          component: AccountSkills,
          meta: { title: "My Skills", navigation: "settings" }
        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: "change-password",
          component: AccountChangePassword,
          meta: { title: "Change Password", navigation: "settings" }
        }
      ],
      meta: {
        access: true
      }
    },
    // s
    {
      path: "/:username",
      component: UserProfile,
      props: true,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: "",
          component: UserHome,
          meta: { title: "Profile", access: false }
        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: "about",
          component: ProfileAbout,
          meta: { title: "About" }
        }
      ],
      meta: {
        access: false
      }
    }
  ],
  mode: "history"
});

let promise = new Promise(resolve => {
  router.start = resolve;
});

router.beforeEach(async (to, from, next) => {
  await promise; // wait until 'start' called
  const currentUser = store.getters.user;
  const currentUserData = store.getters.userData;
  const requiresAuth = to.matched.some(record => record.meta.access);
  // debugger;
  if (requiresAuth && !currentUser) next("/hello");
  else if (Array.isArray(to.meta.access) && currentUser) {
    // check if user has access to page
    if (to.meta.access.includes(currentUserData.role)) next();
    // else go to dashboard
    else next("/");
  } else next();
});

router.afterEach((to, from) => {
  $.material.init();
  /*$('.checkbox > label').on('click', function () {
    $(this).closest('.checkbox').addClass('clicked');
  })*/
});

export default router;
