<template>
	<div class="container">
		<div class="row display-flex">
			<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
				<div class="landing-content">
					<h1>Welcome to FaceValue</h1>
					<p>Our app brings together students from different programs, with different skill sets, to
						collaborate and learn from each other in a “less pressure” environment.</p>
					<!--<a href="#" class="btn btn-md btn-border c-white">Register Now!</a>-->
				</div>
			</div>

			<div class="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">

				<!-- Login-Registration Form  -->

				<div class="registration-login-form" style="min-height: 600px;">
					<!-- Nav tabs -->
					<ul class="nav nav-tabs" role="tablist">
						<li class="nav-item">
							<a class="nav-link" :class="{'active': authView === 'login'}" @click="authView = 'login'">
								<svg class="olymp-login-icon">
									<use xlink:href="svg-icons/sprites/icons.svg#olymp-login-icon"></use>
								</svg>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" :class="{'active': authView === 'register'}"
							   @click="authView = 'register'">
								<svg class="olymp-register-icon">
									<use xlink:href="svg-icons/sprites/icons.svg#olymp-register-icon"></use>
								</svg>
							</a>

						</li>
					</ul>

					<!-- Tab panes -->
					<div class="tab-content">
						<div class="tab-pane active" v-show="authView === 'login'">
							<div class="title h6">Login to your Account</div>
							<b-form novalidate class="content" :validated="forms.login.validated"
							        @submit.prevent="onLogin" data-vv-scope="login">
								<div class="row">
									<div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
										<b-form-group class="form-group label-floating is-empty"
										              :state="errorState('email', 'login')"
										              :invalid-feedback="errors.first('email', 'login')"
										              label="Your Email" label-class="control-label" label-for="email">
											<b-input v-validate="'required|email'" v-model="credentials.email"
											         :state="errorState('email', 'login')"
											         id="email" name="email" type="email"></b-input>
										</b-form-group>
										<b-form-group class="form-group label-floating is-empty"
										              :state="errorState('password', 'login')"
										              :invalid-feedback="errors.first('password', 'login')"
										              label="Your Password" label-class="control-label"
										              label-for="password">
											<b-input v-validate="'required|min:6'" v-model="credentials.password"
											         :state="errorState('password', 'login')"
											         id="password" name="password" type="password"></b-input>
										</b-form-group>

										<div class="remember">
											<b-form-group class="checkbox">
												<md-checkbox class="" v-model="credentials.remember" style=" margin: 0">
													Remember Me
												</md-checkbox>
											</b-form-group>
											<router-link to="/forgot-password" class="forgot">Forgot my Password
											</router-link>
										</div>

										<p class="invalid-feedback d-block text-center pb-4" v-if="forms.login.code"
										   v-html="forms.login.code === 'auth/user-not-found' ? 'There is no record of this account. <br/> Please create an account.' : forms.login.message">
										</p>

										<button type="submit" class="btn btn-lg btn-primary full-width">Login</button>

										<div class="or"></div>

										<button type="button" @click="ocaduLogin" disabled
										        class="btn btn-lg btn-outline-secondary full-width btn-icon-left text-dark"
										        style="padding: 1rem 3rem;">
											<img src="../vendor/img/ocadu-logo.png" alt="" width="32">
											Login with OCADU Student Account
										</button>

										<button type="button" @click="googleLogin"
										        class="btn btn-lg bg-google full-width btn-icon-left"><i
												class="fab fa-google" aria-hidden="true"></i>Login with Google
										</button>

										<p>Don’t you have an account? <a href="#" @click="authView = 'register'">Register
											Now!</a> it’s really simple and you can start enjoing all the benefits!</p>
									</div>
								</div>
							</b-form>
						</div>

						<div class="tab-pane active" v-show="authView === 'register'">
							<div class="title h6">Register to FaceValue</div>
							<b-form novalidate class="content" :validated="forms.register.validated"
							        @submit.prevent="onRegister" data-vv-scope="register">
								<div class="row">
									<div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
										<b-form-group class="form-group label-floating is-empty"
										              :state="errorState('firstName', 'register')"
										              :invalid-feedback="errors.first('firstName', 'register')"
										              label="First Name" label-class="control-label" label-for="firstName">
											<b-input v-model="newUser.firstName"
											         :state="errorState('firstName', 'register')"
											         v-validate="'required|alpha_spaces|min:2'"
											         data-vv-as="First Name"
											         id="firstName" name="firstName" type="text"></b-input>
										</b-form-group>
									</div>
									<div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
										<b-form-group class="form-group label-floating is-empty"
										              :state="errorState('lastName', 'register')"
										              :invalid-feedback="errors.first('lastName', 'register')"
										              label="Last Name" label-class="control-label"
										              label-for="lastName">
											<b-input v-validate="'required|alpha_spaces|min:2'" v-model="newUser.lastName"
											         data-vv-as="Last Name" :state="errorState('lastName', 'register')"
											         id="lastName" name="lastName" type="text"></b-input>
										</b-form-group>
									</div>
									<div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
										<b-form-group class="form-group label-floating is-empty"
										              :state="errorState('email', 'register')"
										              :invalid-feedback="errors.first('email', 'register')"
										              description="Please use your OCADU student email. (abc@student.ocadu.ca)"
										              label="Email" label-class="control-label" label-for="newEmail">
											<b-input v-model="newUser.email"
											         :state="errorState('email', 'register')"
											         v-validate="{ required: true, email: true, regex: /(@student\.ocadu\.ca)$/ }"
											         data-vv-as="Email"
											         id="newEmail" name="email" type="email"></b-input>
										</b-form-group>
										<b-form-group class="form-group label-floating is-empty"
										              :state="errorState('password', 'register')"
										              :invalid-feedback="errors.first('password', 'register')"
										              label="Your Password" label-class="control-label"
										              label-for="newPassword">
											<b-input v-validate="'required|min:6'" v-model="newUser.password"
											         :state="errorState('password', 'register')"
											         id="newPassword" name="password" type="password"></b-input>
										</b-form-group>

										<!--<div class="form-group date-time-picker label-floating">
											<label class="control-label">Your Birthday</label>
											<input name="datetimepicker" value="10/24/1984" />
											<span class="input-group-addon">
														<svg class="olymp-calendar-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>
													</span>
										</div>-->

										<!--<div class="form-group label-floating is-select">
											<label class="control-label">Your Sex</label>
											<v-selectize class="selectpicker form-control" v-model="newUser.sex" :options="['Male','Female']"/>
										</div>-->

										<div class="remember">
											<b-form-group class="checkbox"
											              :invalid-feedback="errors.first('terms', 'register')">
												<md-checkbox class="" v-model="newUser.acceptedTOS"
												             data-vv-name="terms" data-vv-as="Terms of Service" type="checkbox"
												             v-validate="'required'" id="terms" name="terms" reqired>I
													accept the
													<router-link to="/tos">Terms and Conditions</router-link>
													of the FaceValue.
												</md-checkbox>
												<div v-show="!newUser.acceptedTOS && forms.register.validated" role="alert" aria-live="assertive" aria-atomic="true" class="invalid-feedback d-block">You must accept the Terms of Service.</div>
											</b-form-group>
										</div>

										<button type="submit" class="btn btn-purple btn-lg full-width">Complete
											Registration!
										</button>
									</div>
								</div>
							</b-form>
						</div>
					</div>
				</div>

				<!-- ... end Login-Registration Form  -->
			</div>
		</div>
	</div>
</template>
<style></style>
<script type="text/javascript">
  import VSelectize from '@isneezy/vue-selectize';

  export default {
    name: 'landing',
    components: { VSelectize },
    data() {
      return {
        authView: 'login',
        forms: {
          login: {
            code: null,
            message: null,
            validated: false,
            email: {
              hasError: this.errors && this.errors.has('email', 'login'),
              state: false,
            },
            password: {
              hasError: this.errors && this.errors.has('password', 'login'),
              state: false,
            },
          },
          register: {
            code: null,
            message: null,
            validated: false,
          },
        },
        credentials: {
          email: null,
          password: null,
          remember: false
        },
        newUser: {
          lastName: null,
          firstName: null,
          email: null,
          acceptedTOS: false,
        }
      }
    },
    computed: {
      'forms.login.email.state'() {
        return this.errors && this.errors.has('email', 'login');
      },
      'forms.login.password.state'() {
        return this.errors && this.errors.has('password', 'login');
      },
    },
    watch: {
      user(value) {
        if (this.userIsAuthenticated) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onLogin() {
        this.$validator.validateAll('login').then((result) => {
          if (result) {
            // eslint-disable-next-line
            this.$store.dispatch('signUserIn', {
              email: this.credentials.email,
              password: this.credentials.password
            }).then(result => {
              console.log(result);
            }).catch(error => {
              console.log(error);
              this.forms.login.validated = true;
              this.forms.login.code = error.code;
              this.forms.login.message = error.message;
              this.forms.login.validated = false;
            });
          } else {
            this.forms.login.validated = false;
          }

          // alert('Correct them errors!');
        });
      },
      onRegister() {
        this.$validator.validateAll('register').then((result) => {
          if (result && this.newUser.acceptedTOS) {
            this.newUser.displayName = `${this.newUser.firstName} ${this.newUser.lastName}`;
            this.$store.dispatch('signUserUp', this.newUser).then(user => {
              console.log(user);
            }).catch(error => {
              console.log(error);
              this.forms.register.validated = true;
              this.forms.register.code = error.code;
              this.forms.register.message = error.message;
              this.forms.register.validated = false;
            });
          } else {
            this.forms.register.validated = false;
          }

        });
      },
      googleLogin() {
        this.$store.dispatch('signUserInGoogle', {}).then(result => {
          console.log(result);
        })
      },
      ocaduLogin() {
        // this.$store.dispatch('signUserInOCADU')
      }
    },
    mounted() {
      if (this.userIsAuthenticated) {
        this.$router.push('/')
      }
    }
  }
</script>
