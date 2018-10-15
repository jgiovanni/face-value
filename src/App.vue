<template>
	<div id="app" :class="rootClasses">

		<!--<div class="content-bg-wrap"></div>-->

		<template v-if="$root.appReady">
			<template v-if="userIsAuthenticated">
				<FixedLeftSidebar />
				<ChatSidebar v-if="$route.name !== 'Messenger'" />
			</template>

			<AuthHeader v-if="userIsAuthenticated" />

			<!-- Main Content -->

			<transition name="fade">
				<router-view/>
			</transition>


			<!-- ...end Main Content -->

			<a v-if="userIsAuthenticated && $route.name !== 'Messenger'" class="back-to-top" href="#" @click.prevent="">
				<img src="svg-icons/back-to-top.svg" alt="arrow" class="back-icon">
			</a>


			<!-- Window-popup-CHAT for responsive min-width: 768px -->

			<ChatModal v-if="userIsAuthenticated && $route.name !== 'Messenger'" />

			<!-- ... end Window-popup-CHAT for responsive min-width: 768px -->
		</template>
		
		<div id="alerts-section">
			<md-snackbar :md-position="snackbarOptions.position" :md-duration="snackbarOptions.isInfinity ? Infinity : snackbarOptions.duration" :md-active.sync="snackbarOptions.showSnackbar" md-persistent>
				<span v-text="snackbarOptions.message"></span>
				<md-button class=" text-white" @click="snackbarOptions.showSnackbar = false"><i class="fa fa-times"></i></md-button>
			</md-snackbar>
		</div>
		
	</div>
</template>

<script>
import FixedLeftSidebar from "./components/navigation/FixedLeftSidebar";
import AuthHeader from "./components/navigation/AuthHeader";
import PublicHeader from "./components/navigation/PublicHeader";
import ChatSidebar from "./components/navigation/ChatSidebar";
import ChatModal from "./components/modals/Chat";

export default {
  components: {
    ChatSidebar,
    FixedLeftSidebar,
    AuthHeader,
    PublicHeader,
    ChatModal
  },
  data() {
    return {
      headerClass: "",
      alerts: [],
      snackbarOptions: {
        message: null,
        showSnackbar: false,
        position: "center",
        duration: 4000,
        isInfinity: false
      }
    };
  },
  computed: {
    rootClasses() {
      return this.$route.meta.rootClasses || "";
    },
    headerClasses() {
      return this.$route.meta.headerClasses || "";
    }
  },
  created() {
    let self = this;
    this.$root.$on("changeRootClass", classes => {
      // self.rootClass = classes;
    });
    this.$root.$on("changeHeaderClass", classes => {
      self.headerClass = classes;
    });
    this.$root.$on("showAlert", alert => {
      this.snackbarOptions.message = alert;
      this.snackbarOptions.showSnackbar = true;
      // self.alerts.push(alert);
    });
  }
};
</script>

<style lang="scss">
$animationDuration: 0.5s; // specify animation duration. Default value: 1s
@import "~vue2-animate/src/sass/vue2-animate.scss";

#app {
}
#alerts-section {
  position: absolute;
  z-index: 50;
}
.form-control,
input,
select {
  height: auto;
}

.selectpicker {
  border: 1px solid #e6ecf5;
  box-shadow: none !important;
}

.form-group {
  .selectize-input {
    border: none !important;
    box-shadow: none !important;
    text-align: left;
  }
  .selectize-dropdown [data-selectable].option {
    text-align: left;
  }
  input[type="checkbox"] {
    display: block;
  }
}

.md-checkbox .md-checkbox-container {
  border: 1px solid #e6ecf5 !important;
}

.md-checkbox.md-theme-default.md-checked {
  .md-ripple {
    color: #ff5252;
  }
  .md-checkbox-container {
    background-color: #ff5252;
    border-color: #ff5252;

    &:after {
      border-color: #fff;
    }
  }
}

.md-radio.md-theme-default.md-checked {
  .md-ripple {
    color: #ff5252;
  }
  .md-radio-container {
    border-color: #ff5252;

    &:after {
      background-color: #ff5252;
    }
  }
}

.messages-page {
  overflow-y: hidden;
  .container {
    margin-left: 70px;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
    max-width: calc(100% - 70px);
    .ui-block {
      margin: 0;
      padding: 0;
    }
  }
  .header-spacer {
    height: 70px;
  }
}

.md-overlay {
  z-index: 22 !important;
}
.md-dialog {
  z-index: 23 !important;
  background-color: white;
}
.md-snackbar {
  background-color: #323232;
  color: #fff;
}
</style>
