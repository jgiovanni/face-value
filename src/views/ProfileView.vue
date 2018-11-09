<template>
  <div>
    <template v-if="loading"> </template>
    <template v-else>
      <template v-if="!userIsAuthenticated">
        <header class="header header--logout" id="site-header">
          <router-link to="/" class="logo">
            <div class="img-wrap">
              <img src="/img/logo.png" alt="Olympus" />
            </div>
          </router-link>

          <div class="header-content-wrapper">
            <!--
              <form class="search-bar w-search notification-list friend-requests">
              	<div class="form-group with-button">
              		<input class="form-control js-user-search" placeholder="Search here people or pages..." type="text">
              		<button>
              			<svg class="olymp-magnifying-glass-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg>
              		</button>
              	</div>
              </form>
            -->

            <div class="form--login-logout">
              <form class="form-inline">
                <!--
                  <div class="form-group">
                  	<input class="form-control form-control-sm" type="text" placeholder="Username" value="" required>
                  </div>
                  <div class="form-group">
                  	<input class="form-control form-control-sm" type="password" placeholder="Password" value="" required>
                  </div>
                -->
                <button
                  class="btn btn-primary btn-md-2"
                  @click.prevent.stop="showAuthModal"
                >
                  Login/Register
                </button>
              </form>
              <a
                href="#"
                class="btn btn-primary btn-md-2 login-btn-responsive"
                @click.prevent="showAuthModal"
                >Login/Register</a
              >
            </div>
          </div>
        </header>
        <div class="header-spacer"></div>
        <PublicProfileHeader :profile="profile" />
        <section class="medium-padding120">
          <div class="container">
            <div class="row">
              <div class="col col-xl-4 col-lg-12 col-md-12 m-auto">
                <div class="logout-content">
                  <div class="logout-icon"><i class="fas fa-times"></i></div>
                  <h6>Do you wanna check {{ profile.name }}'s Profile?</h6>
                  <p>
                    <a href="#" @click.prevent="showAuthModal">Login</a> or
                    <a href="#" @click.prevent="showAuthModal">Register</a> now
                    to create your own profile and have access to OCAD U's skill
                    share community!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
      <template v-else>
        <PublicProfileHeader :profile="profile" />
        <!-- <router-view :profile="profile" /> -->
        <Home :profile="profile" />
      </template>
    </template>
  </div>
</template>
<style></style>
<script type="text/javascript">
import PublicProfileHeader from "../components/blocks/Profile/PublicProfileHeader";
import Home from "./Profile/Home";

export default {
  name: "ProfileView",
  components: { Home, PublicProfileHeader },
  data() {
    return {
      loading: false,
      profile: null,
      error: null
    };
  },
  methods: {
    fetchData() {
      this.error = this.profile = null;
      this.loading = true;
      this.$db
        .collection("users")
        .where("userName", "==", this.$route.params.username)
        .limit(1)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size) {
            let data = querySnapshot.docs[0].data();
            data.id = querySnapshot.docs[0].id;
            this.profile = data;
            this.loading = false;
          } else {
            this.error = true;
            console.log("No such document!");
          }
        });
    }
  },
  mounted() {},
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  }
};
</script>
