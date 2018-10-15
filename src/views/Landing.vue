<template>
	<div>
		<div class="main-header main-header-fullwidth main-header-has-header-standard">

			<PublicHeader/>

			<div class="content-bg-wrap bg-landing"></div>

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

		<img class="img-bottom" src="img/group-bottom.png" alt="friends">
		<img class="img-rocket" src="img/rocket.png" alt="rocket">
		</div>
		<!-- Clients Block -->

		<!--<section class="crumina-module crumina-clients">
			<div class="container">
				<div class="row">
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="img/client1.png" class="" alt="logo">
						</a>
					</div>
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="img/client2.png" class="" alt="logo">
						</a>
					</div>
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="img/client3.png" class="" alt="logo">
						</a>
					</div>
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="img/client4.png" class="" alt="logo">
						</a>
					</div>
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="img/client5.png" class="" alt="logo">
						</a>
					</div>
				</div>
			</div>
		</section>-->

		<!-- ... end Clients Block -->


		<!-- Section Img Scale Animation -->

		<!--<section class="align-center pt80 section-move-bg-top img-scale-animation scrollme">
			<div class="container">
				<div class="row">
					<div class="col col-xl-10 m-auto col-lg-10 col-md-12 col-sm-12 col-12">
						<img class="main-img" src="img/scale1.png" alt="screen">
					</div>
				</div>

				<img class="first-img1" alt="img" src="img/scale2.png">
				<img class="second-img1" alt="img" src="img/scale3.png">
				<img class="third-img1" alt="img" src="img/scale4.png">
			</div>
			<div class="content-bg-wrap bg-section2"></div>
		</section>-->

		<!-- ... end Section Img Scale Animation -->

		<section class="medium-padding120">
			<div class="container">
				<div class="row">
					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="img/icon-fly.png" alt="screen">
					</div>

					<div class="col col-xl-4 col-lg-4 m-auto col-md-12 col-sm-12 col-12">
						<div class="crumina-module crumina-heading">
							<h2 class="heading-title">Why Join <span class="c-primary">FaceValue Skill Sharing Network</span>?</h2>
							<p class="heading-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="medium-padding120">
			<div class="container">
				<div class="row">
					<div class="col col-xl-4 col-lg-4 m-auto col-md-12 col-sm-12 col-12">
						<div class="crumina-module crumina-heading">
							<h2 class="heading-title">Meet New People <span class="c-primary">all over the World</span></h2>
							<p class="heading-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa.
							</p>
						</div>
					</div>

					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="img/image1.png" alt="screen">
					</div>
				</div>
			</div>
		</section>


		<section class="medium-padding120">
			<div class="container">
				<div class="row">
					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="img/image2.png" alt="screen">
					</div>

					<div class="col col-xl-4 col-lg-4 m-auto col-md-12 col-sm-12 col-12">
						<div class="crumina-module crumina-heading">
							<h2 class="heading-title">The Best UI/UX and <span class="c-primary">Awesome Features</span></h2>
							<p class="heading-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="medium-padding120">
			<div class="container">
				<div class="row">
					<div class="col col-xl-4 col-lg-4 m-auto col-md-12 col-sm-12 col-12">
						<div class="crumina-module crumina-heading">
							<h2 class="heading-title">Find People with <span class="c-primary">Your Same Interests</span></h2>
							<p class="heading-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa.
							</p>
						</div>
					</div>

					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="img/image3.png" alt="screen">
					</div>
				</div>
			</div>
		</section>



		<!-- Planer Animation -->

		<section class="medium-padding120 bg-section3 background-cover planer-animation">
			<div class="container">
				<div class="row mb60">
					<div class="col col-xl-4 col-lg-4 m-auto col-md-12 col-sm-12 col-12">
						<div class="crumina-module crumina-heading align-center">
							<div class="heading-sup-title">Skill Sharing Network</div>
							<h2 class="h1 heading-title">Community Reviews</h2>
							<p class="heading-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore</p>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="swiper-container pagination-bottom" data-show-items="3">
						<div class="swiper-wrapper">
							<div class="ui-block swiper-slide">


								<!-- Testimonial Item -->

								<div class="crumina-module crumina-testimonial-item">
									<div class="testimonial-header-thumb"></div>

									<div class="testimonial-item-content">

										<div class="author-thumb">
											<img src="img/avatar3.jpg" alt="author">
										</div>

										<h3 class="testimonial-title">Amazing Community</h3>

										<ul class="rait-stars">
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>

											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
											<li>
												<i class="far fa-star star-icon"></i>
											</li>
										</ul>

										<p class="testimonial-message">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
											incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
											exercitation ullamco.
										</p>

										<div class="author-content">
											<a href="#" class="h6 author-name">Mathilda Brinker</a>
											<div class="country">Los Angeles, CA</div>
										</div>
									</div>
								</div>

								<!-- ... end Testimonial Item -->
							</div>

							<div class="ui-block swiper-slide">


								<!-- Testimonial Item -->

								<div class="crumina-module crumina-testimonial-item">
									<div class="testimonial-header-thumb"></div>

									<div class="testimonial-item-content">

										<div class="author-thumb">
											<img src="img/avatar17.jpg" alt="author">
										</div>

										<h3 class="testimonial-title">This is the Best Skill Sharing Network ever!</h3>

										<ul class="rait-stars">
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>

											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
										</ul>

										<p class="testimonial-message">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
											nulla pariatur laborum.
										</p>

										<div class="author-content">
											<a href="#" class="h6 author-name">Marina Valentine</a>
											<div class="country">Long Island, NY</div>
										</div>
									</div>
								</div>

								<!-- ... end Testimonial Item -->

							</div>

							<div class="ui-block swiper-slide">


								<!-- Testimonial Item -->

								<div class="crumina-module crumina-testimonial-item">
									<div class="testimonial-header-thumb"></div>

									<div class="testimonial-item-content">

										<div class="author-thumb">
											<img src="img/avatar1.jpg" alt="author">
										</div>

										<h3 class="testimonial-title">Incredible Design!</h3>

										<ul class="rait-stars">
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>

											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
											<li>
												<i class="fa fa-star star-icon"></i>
											</li>
											<li>
												<i class="far fa-star star-icon"></i>
											</li>
										</ul>

										<p class="testimonial-message">Sed ut perspiciatis unde omnis iste natus error sit
											voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
											illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
										</p>

										<div class="author-content">
											<a href="#" class="h6 author-name">Nicholas Grissom</a>
											<div class="country">San Francisco, CA</div>
										</div>
									</div>
								</div>

								<!-- ... end Testimonial Item -->
							</div>
						</div>

						<div class="swiper-pagination"></div>
					</div>
				</div>
			</div>

			<img src="img/planer.png" alt="planer" class="planer">
		</section>

		<!-- ... end Section Planer Animation -->

		<section class="medium-padding120">
			<div class="container">
				<div class="row">
					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="img/image4.png" alt="screen">
					</div>

					<div class="col col-xl-5 col-lg-5 m-auto col-md-12 col-sm-12 col-12">
						<div class="crumina-module crumina-heading">
							<h2 class="h1 heading-title">Release all the Power with the <span class="c-primary">FaceValue App!</span></h2>
							<p class="heading-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>


						<ul class="list--styled">
							<li>
								<i class="far fa-check-circle" aria-hidden="true"></i>
								Build your profile in just minutes, it’s that simple!
							</li>
							<li>
								<i class="far fa-check-circle" aria-hidden="true"></i>
								Unlimited messaging with the best interface.
							</li>
						</ul>

						<a href="#" class="btn btn-market">
							<img class="icon" src="svg-icons/apple-logotype.svg" alt="app index">
							<div class="text">
								<span class="sup-title">AVAILABLE ON THE</span>
								<span class="title">App Store</span>
							</div>
						</a>

						<a href="#" class="btn btn-market">
							<img class="icon" src="svg-icons/google-play.svg" alt="google">
							<div class="text">
								<span class="sup-title">ANDROID APP ON</span>
								<span class="title">Google Play</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>


		<!-- Section Subscribe Animation -->

		<section class="medium-padding100 subscribe-animation scrollme bg-users">
			<div class="container">
				<div class="row">
					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<div class="crumina-module crumina-heading c-white custom-color">
							<h2 class="h1 heading-title">FaceValue Newsletter</h2>
							<p class="heading-text">Subscribe to be the first one to know about updates, new features and much more!
							</p>
						</div>


						<!-- Subscribe Form  -->

						<form class="form-inline subscribe-form" method="post">
							<div class="form-group label-floating is-empty">
								<label class="control-label">Enter your email</label>
								<input class="form-control bg-white" placeholder="" type="email">
							</div>

							<button class="btn btn-blue btn-lg">Send</button>
						</form>

						<!-- ... end Subscribe Form  -->

					</div>
				</div>

				<img src="img/paper-plane.png" alt="plane" class="plane">
			</div>
		</section>

		<!-- ... end Section Subscribe Animation -->

		<!-- Section Call To Action Animation -->

		<section class="align-right pt160 pb80 section-move-bg call-to-action-animation scrollme">
			<div class="container">
				<div class="row">
					<div class="col col-xl-10 m-auto col-lg-10 col-md-12 col-sm-12 col-12">
						<a href="#" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#registration-login-form-popup">Start Making Friends Now!</a>
					</div>
				</div>
			</div>
			<img class="first-img" alt="guy" src="img/guy.png">
			<img class="second-img" alt="rocket" src="img/rocket1.png">
			<div class="content-bg-wrap bg-section1"></div>
		</section>

		<!-- ... end Section Call To Action Animation -->


		<div class="modal fade" id="registration-login-form-popup" tabindex="-1" role="dialog" aria-labelledby="registration-login-form-popup" aria-hidden="true">
			<div class="modal-dialog window-popup registration-login-form-popup" role="document">
				<div class="modal-content">
					<a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
						<svg class="olymp-close-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
					</a>
					<div class="modal-body">
						<div class="registration-login-form">
							<!-- Nav tabs -->
							<ul class="nav nav-tabs" role="tablist">
								<li class="nav-item">
									<a class="nav-link active" data-toggle="tab" href="#home1" role="tab">
										<svg class="olymp-login-icon">
											<use xlink:href="svg-icons/sprites/icons.svg#olymp-login-icon"></use>
										</svg>
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" data-toggle="tab" href="#profile1" role="tab">
										<svg class="olymp-register-icon">
											<use xlink:href="svg-icons/sprites/icons.svg#olymp-register-icon"></use>
										</svg>
									</a>
								</li>
							</ul>

							<!-- Tab panes -->
							<div class="tab-content">
								<div class="tab-pane active" id="home1" role="tabpanel" data-mh="log-tab">
									<div class="title h6">Register to FaceValue</div>
									<form class="content">
										<div class="row">
											<div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
												<div class="form-group label-floating is-empty">
													<label class="control-label">First Name</label>
													<input class="form-control" placeholder="" type="text">
												</div>
											</div>
											<div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
												<div class="form-group label-floating is-empty">
													<label class="control-label">Last Name</label>
													<input class="form-control" placeholder="" type="text">
												</div>
											</div>
											<div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
												<div class="form-group label-floating is-empty">
													<label class="control-label">Your Email</label>
													<input class="form-control" placeholder="" type="email">
												</div>
												<div class="form-group label-floating is-empty">
													<label class="control-label">Your Password</label>
													<input class="form-control" placeholder="" type="password">
												</div>

												<div class="form-group date-time-picker label-floating">
													<label class="control-label">Your Birthday</label>
													<input name="datetimepicker" value="10/24/1984" />
													<span class="input-group-addon">
											<svg class="olymp-calendar-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>
										</span>
												</div>

												<div class="form-group label-floating is-select">
													<label class="control-label">Your Gender</label>
													<select class="selectpicker form-control">
														<option value="MA">Male</option>
														<option value="FE">Female</option>
													</select>
												</div>

												<div class="remember">
													<div class="checkbox">
														<label>
															<input name="optionsCheckboxes" type="checkbox">
															I accept the <a href="#">Terms and Conditions</a> of the website
														</label>
													</div>
												</div>

												<a href="#" class="btn btn-purple btn-lg full-width">Complete Registration!</a>
											</div>
										</div>
									</form>
								</div>

								<div class="tab-pane" id="profile1" role="tabpanel" data-mh="log-tab">
									<div class="title h6">Login to your Account</div>
									<form class="content">
										<div class="row">
											<div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
												<div class="form-group label-floating is-empty">
													<label class="control-label">Your Email</label>
													<input class="form-control" placeholder="" type="email">
												</div>
												<div class="form-group label-floating is-empty">
													<label class="control-label">Your Password</label>
													<input class="form-control" placeholder="" type="password">
												</div>

												<div class="remember">

													<div class="checkbox">
														<label>
															<input name="optionsCheckboxes" type="checkbox">
															Remember Me
														</label>
													</div>
													<a href="#" class="forgot">Forgot my Password</a>
												</div>

												<a href="#" class="btn btn-lg btn-primary full-width">Login</a>

												<div class="or"></div>

												<a href="#" class="btn btn-lg bg-facebook full-width btn-icon-left"><i class="fab fa-facebook-f" aria-hidden="true"></i>Login with Facebook</a>

												<a href="#" class="btn btn-lg bg-twitter full-width btn-icon-left"><i class="fab fa-twitter" aria-hidden="true"></i>Login with Twitter</a>


												<p>Don’t you have an account?
													<a href="#">Register Now!</a> it’s really simple and you can start enjoing all the benefits!
												</p>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- Footer Full Width -->

		<div class="footer footer-full-width" id="footer">
			<div class="container">
				<div class="row">
					<div class="col col-lg-4 col-md-4 col-sm-6 col-6">


						<!-- Widget About -->

						<div class="widget w-about">

							<a href="02-ProfilePage.html" class="logo">
								<div class="img-wrap">
									<img src="img/logo.png" width="60" alt="FaceValue">
								</div>
								<div class="title-block">
									<h6 class="logo-title">FaceValue</h6>
									<div class="sub-title">Skill Sharing</div>
								</div>
							</a>
							<p>Lorem ipsum dolor sit amet, consect adipisicing elit, sed do eiusmod por incidid ut labore et lorem.</p>
							<ul class="socials">
								<li>
									<a href="#">
										<i class="fab fa-facebook-square" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="#">
										<i class="fab fa-twitter" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="#">
										<i class="fab fa-youtube" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="#">
										<i class="fab fa-google-plus-g" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="#">
										<i class="fab fa-instagram" aria-hidden="true"></i>
									</a>
								</li>
							</ul>
						</div>

						<!-- ... end Widget About -->

					</div>

					<div class="col col-lg-2 col-md-4 col-sm-6 col-6">


						<!-- Widget List -->

						<div class="widget w-list">
							<h6 class="title">Main Links</h6>
							<ul>
								<li>
									<a href="#">Landing</a>
								</li>
								<li>
									<a href="#">Home</a>
								</li>
								<li>
									<a href="#">About</a>
								</li>
								<li>
									<a href="#">Events</a>
								</li>
							</ul>
						</div>

						<!-- ... end Widget List -->

					</div>
					<div class="col col-lg-2 col-md-4 col-sm-6 col-6">


						<div class="widget w-list">
							<h6 class="title">Your Profile</h6>
							<ul>
								<li>
									<a href="#">Main Page</a>
								</li>
								<li>
									<a href="#">About</a>
								</li>
								<li>
									<a href="#">Friends</a>
								</li>
								<li>
									<a href="#">Photos</a>
								</li>
							</ul>
						</div>

					</div>
					<div class="col col-lg-2 col-md-4 col-sm-6 col-6">


						<div class="widget w-list">
							<h6 class="title">Features</h6>
							<ul>
								<li>
									<a href="#">Newsfeed</a>
								</li>
								<li>
									<a href="#">Post Versions</a>
								</li>
								<li>
									<a href="#">Messages</a>
								</li>
								<li>
									<a href="#">Friend Groups</a>
								</li>
							</ul>
						</div>

					</div>
					<div class="col col-lg-2 col-md-4 col-sm-6 col-6">


						<div class="widget w-list">
							<h6 class="title">FaceValue</h6>
							<ul>
								<li>
									<a href="#">Privacy</a>
								</li>
								<li>
									<a href="#">Terms & Conditions</a>
								</li>
								<li>
									<a href="#">Forums</a>
								</li>
								<li>
									<a href="#">Statistics</a>
								</li>
							</ul>
						</div>

					</div>

					<div class="col col-lg-12 col-md-12 col-sm-12 col-12">


						<!-- SUB Footer -->

						<div class="sub-footer-copyright">
					<span>
						Copyright <router-link to="/">FaceValue</router-link> All Rights Reserved 2017
					</span>
						</div>

						<!-- ... end SUB Footer -->

					</div>
				</div>
			</div>
		</div>

		<!-- ... end Footer Full Width -->
	</div>
</template>
<style>
</style>
<script type="text/javascript">
import VSelectize from "@isneezy/vue-selectize";
import PublicHeader from "../components/navigation/PublicHeader";

export default {
  name: "landing",
  components: { VSelectize, PublicHeader },
  data() {
    return {
      authView: "login",
      forms: {
        login: {
          code: null,
          message: null,
          validated: false,
          email: {
            hasError: this.errors && this.errors.has("email", "login"),
            state: false
          },
          password: {
            hasError: this.errors && this.errors.has("password", "login"),
            state: false
          }
        },
        register: {
          code: null,
          message: null,
          validated: false
        }
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
        acceptedTOS: false
      }
    };
  },
  computed: {
    "forms.login.email.state"() {
      return this.errors && this.errors.has("email", "login");
    },
    "forms.login.password.state"() {
      return this.errors && this.errors.has("password", "login");
    }
  },
  watch: {
    user(value) {
      if (this.userIsAuthenticated) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onLogin() {
      this.$validator.validateAll("login").then(result => {
        if (result) {
          // eslint-disable-next-line
            this.$store.dispatch('signUserIn', {
              email: this.credentials.email,
              password: this.credentials.password
            })
            .then(result => {
              console.log(result);
            })
            .catch(error => {
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
      this.$validator.validateAll("register").then(result => {
        if (result && this.newUser.acceptedTOS) {
          this.newUser.displayName = `${this.newUser.firstName} ${
            this.newUser.lastName
          }`;
          this.$store
            .dispatch("signUserUp", this.newUser)
            .then(user => {
              console.log(user);
            })
            .catch(error => {
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
      this.$store.dispatch("signUserInGoogle", {}).then(result => {
        console.log(result);
      });
    },
    ocaduLogin() {
      // this.$store.dispatch('signUserInOCADU')
    }
  },
  mounted() {
    if (this.userIsAuthenticated) {
      this.$router.push("/");
    }
  }
};
</script>
