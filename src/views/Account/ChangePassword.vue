<template>
	<div class="ui-block">
		<div class="ui-block-title">
			<h6 class="title">Change Password</h6>
		</div>
		<div class="ui-block-content">
			<!-- Change Password Form -->
			<form @submit.prevent="updatePassword">
				<div class="row">

					<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<b-form-group class="form-group label-floating" :class="{ 'is-empty': !currentPassword }"
						              :state="errorState('currentPassword')"
						              :invalid-feedback="errors.first('currentPassword')"
						              label="Confirm Current Password" label-class="control-label" label-for="currentPassword">
							<b-input v-validate="'required'" v-model="currentPassword"
							         :state="errorState('currentPassword')"
							         id="currentPassword" name="currentPassword" type="password"></b-input>
						</b-form-group>
					</div>

					<div class="col col-lg-6 col-md-6 col-sm-12 col-12">
						<b-form-group class="form-group label-floating" :class="{ 'is-empty': !password }"
						              :state="errorState('password')"
						              :invalid-feedback="errors.first('password')"
						              label="Your New Password" label-class="control-label" label-for="password">
							<b-input v-validate="'required'" v-model="password"
							         :state="errorState('password')"
							         id="password" name="password" type="password"></b-input>
						</b-form-group>
					</div>
					<div class="col col-lg-6 col-md-6 col-sm-12 col-12">
						<b-form-group class="form-group label-floating" :class="{ 'is-empty': !passwordConfirm }"
						              :state="errorState('passwordConfirm')"
						              :invalid-feedback="errors.first('passwordConfirm')"
						              label="Confirm New Password" label-class="control-label" label-for="password_confirmation">
							<b-input v-validate="'required|confirmed:password'" v-model="passwordConfirm" ref="password"
							         :state="errorState('passwordConfirm')" data-vv-as="password"
							         id="password_confirmation" name="password_confirmation" type="password"></b-input>
						</b-form-group>
					</div>

					<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<button type="submit" class="btn btn-primary btn-lg full-width">Update Password</button>
					</div>

				</div>
			</form>
			<!-- ... end Change Password Form -->
		</div>
	</div>
</template>
<style>
</style>
<script type="text/javascript">
export default {
  name: "ChangePassword",
  data() {
    return {
      currentPassword: null,
      password: null,
      passwordConfirm: null
    };
  },
  methods: {
    updatePassword() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const currentUser = this.$db.app.auth().currentUser;
          this.$db.app.auth()
            .signInAndRetrieveDataWithEmailAndPassword(this.user.email, this.currentPassword)
            .then(function() {
              currentUser
                .updatePassword(this.password)
                .then(function() {
                  this.$root.$emit("showAlert", "Password Updated Successfully!");
                })
                .catch(console.log);
            })
            .catch(console.log);
        }
      });
    }
  },
  mounted() {}
};
</script>
