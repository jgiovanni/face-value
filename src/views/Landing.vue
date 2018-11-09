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
										<use xlink:href="/svg-icons/sprites/icons.svg#olymp-login-icon"></use>
									</svg>
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" :class="{'active': authView === 'register'}"
								   @click="authView = 'register'">
									<svg class="olymp-register-icon">
										<use xlink:href="/svg-icons/sprites/icons.svg#olymp-register-icon"></use>
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
											<b-form-group class="form-group label-floating" :class="{ 'is-empty': !credentials.email }"
											              :state="errorState('email', 'login')"
											              :invalid-feedback="errors.first('email', 'login')"
											              label="Your Email" label-class="control-label" label-for="email">
												<b-input v-validate="'required|email'" v-model="credentials.email"
												         :state="errorState('email', 'login')"
												         id="email" name="email" type="email"></b-input>
											</b-form-group>
											<b-form-group class="form-group label-floating" :class="{ 'is-empty': !credentials.password }"
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
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdwAAAGMCAQAAADaJNuJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTAtMDdUMDI6MDE6NTMtMDQ6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEwLTA3VDA2OjAxOjU3LTA0OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEwLTA3VDA2OjAxOjU3LTA0OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NTYyM2RiYi00NTM2LTQ3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"
												     alt="" width="24" class="fab">
												Login with Student Account
											</button>

											<button type="button" @click="googleLogin" class="btn btn-lg bg-google full-width btn-icon-left">
												<i class="fab fa-google" aria-hidden="true"></i>Login with Google
											</button>

											<p>Don’t you have an account? <a href="#" @click="authView = 'register'">Register
												Now!</a> it’s really simple and you can start enjoying all the benefits!</p>
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
											<b-form-group class="form-group label-floating" :class="{ 'is-empty': !newUser.firstName }"
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
											<b-form-group class="form-group label-floating" :class="{ 'is-empty': !newUser.lastName }"
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
											<b-form-group class="form-group label-floating" :class="{ 'is-empty': !newUser.email }"
											              :state="errorState('email', 'register')"
											              :invalid-feedback="errors.first('email', 'register')"
											              description="We encourage you to use your OCADU student email."
											              label="Email" label-class="control-label" label-for="newEmail">
												<b-input v-model="newUser.email"
												         :state="errorState('email', 'register')"
												         v-validate="{ required: true, email: true }"
												         data-vv-as="Email"
												         id="newEmail" name="email" type="email"></b-input>
											</b-form-group>
											<b-form-group class="form-group label-floating" :class="{ 'is-empty': !newUser.userName }"
											              :state="errorState('userName', 'register')"
											              :invalid-feedback="errors.first('userName', 'register')"
											              label="User Name" label-class="control-label" label-for="newUserName">
												<b-input v-model="newUser.userName"
												         :state="errorState('userName', 'register')"
												         v-validate="'required|alpha_num|min:5'"
												         data-vv-as="User Name"
												         id="newUserName" name="userName" type="text"></b-input>
											</b-form-group>
											<b-form-group class="form-group label-floating" :class="{ 'is-empty': !newUser.password }"
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
															<svg class="olymp-calendar-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>
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
														<router-link to="/terms">Terms of Service</router-link>
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

		<img class="/img-bottom" src="/img/group-bottom.png" alt="friends">
		<img class="/img-rocket" src="/img/rocket.png" alt="rocket">
		</div>
		<!-- Clients Block -->

		<!--<section class="crumina-module crumina-clients">
			<div class="container">
				<div class="row">
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="/img/client1.png" class="" alt="logo">
						</a>
					</div>
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="/img/client2.png" class="" alt="logo">
						</a>
					</div>
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="/img/client3.png" class="" alt="logo">
						</a>
					</div>
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="/img/client4.png" class="" alt="logo">
						</a>
					</div>
					<div class="col col-xl-2 m-auto col-lg-2 col-md-6 col-sm-6 col-6">
						<a class="clients-item" href="#">
							<img src="/img/client5.png" class="" alt="logo">
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
						<img class="main-img" src="/img/scale1.png" alt="screen">
					</div>
				</div>

				<img class="first-img1" alt="/img" src="/img/scale2.png">
				<img class="second-img1" alt="/img" src="/img/scale3.png">
				<img class="third-img1" alt="/img" src="/img/scale4.png">
			</div>
			<div class="content-bg-wrap bg-section2"></div>
		</section>-->

		<!-- ... end Section Img Scale Animation -->

		<section class="medium-padding120">
			<div class="container">
				<div class="row">
					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="/img/icon-fly.png" alt="screen">
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
							<p class="heading-text">Vector files need fine tuning? Struggling with Adobe Premier? Tangled in your Arduino Project? Or Maybe this is your second time printing and you need an expert peer, to tell you if your files are print ready.I mean sure you could ask a classmate... and yes you can ask a friend but, that doesn't always work out so great, theres no accountability and quite frankly you feel like a pain in the neck. Our website, Face Value, brings together students from different programs, with different skill sets, to collaborate and learn from each other in a “less pressure” environment. Users create a profile that lists the skills they are willing to share with each other without asking for anything in return. Contribution is encouraged, but everyone is welcome even if they don't have a skill to share. As users connect with each other, these purposed engagements help users increase their network which can potentially lead to collabs, paid gigs, and even employment.
							</p>
						</div>
					</div>

					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="/img/image1.png" alt="screen">
					</div>
				</div>
			</div>
		</section>


		<section class="medium-padding120">
			<div class="container">
				<div class="row">
					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="/img/image2.png" alt="screen">
					</div>

					<div class="col col-xl-4 col-lg-4 m-auto col-md-12 col-sm-12 col-12">
						<div class="crumina-module crumina-heading">
							<h2 class="heading-title">The Best UI/UX and <span class="c-primary">Awesome Features</span></h2>
							<p class="heading-text">
                                
                                By starting with the OCAD student body we feel we can develop a model which can then grow to include a wider demographic of artists, individuals, and small businesses. More and more our economy seeks diverse skill sets in individuals, but the resources aren’t always there (Google only helps when you know what to look for). Our web platform answers this need by connecting individuals with people who have specific skill sets, providing help in areas of interest, or weakness.
                        
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
							<p class="heading-text"> The mission of  Face Value  is to foster a community of collaborative thinking and sharing, by connecting students from cross disciplinary faculties. 
							</p>
						</div>
					</div>

					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="/img/image3.png" alt="screen">
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
											<img src="/img/avatar3.jpg" alt="author">
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

										<p class="testimonial-message">
                                            
                                             Never thought going out of my way to help somebody else would be so rewarding! What goes around comes around folks! Amazing interface, cant wait to actually start some projects....
										</p>

										<div class="author-content">
											<a href="#" class="h6 author-name">Mathilda Brinker</a>
											<div class="country">Toronto, ON</div>
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
											<img src="/img/avatar17.jpg" alt="author">
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

										<p class="testimonial-message">
                                            
                                            Got amazing feedback on my thesis, actually got my prototye to work with some phyical computing help from Ted Halloway on Face Value. So excited to present it!
										</p>

										<div class="author-content">
											<a href="#" class="h6 author-name">Marina Valentine</a>
											<div class="country"> Brampton, ON</div>
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
											<img src="/img/avatar1.jpg" alt="author">
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

			<img src="/img/planer.png" alt="planer" class="planer">
		</section>

		<!-- ... end Section Planer Animation -->

		<section class="medium-padding120">
			<div class="container">
				<div class="row">
					<div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
						<img src="/img/image4.png" alt="screen">
					</div>

					<div class="col col-xl-5 col-lg-5 m-auto col-md-12 col-sm-12 col-12">
						<div class="crumina-module crumina-heading">
							<h2 class="h1 heading-title">Release all the Power with the <span class="c-primary">FaceValue App!</span></h2>
							<p class="heading-text">Face Value provides a new way to collaborate on projects, ask our fellow peers/artists for help and network within our own community.

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
							<img class="icon" src="/svg-icons/apple-logotype.svg" alt="app index">
							<div class="text">
								<span class="sup-title">AVAILABLE ON THE</span>
								<span class="title">App Store</span>
							</div>
						</a>

						<a href="#" class="btn btn-market">
							<img class="icon" src="/svg-icons/google-play.svg" alt="google">
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

				<img src="/img/paper-plane.png" alt="plane" class="plane">
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
			<img class="first-img" alt="guy" src="/img/guy.png">
			<img class="second-img" alt="rocket" src="/img/rocket1.png">
			<div class="content-bg-wrap bg-section1"></div>
		</section>

		<!-- ... end Section Call To Action Animation -->


		<div class="modal fade" id="registration-login-form-popup" tabindex="-1" role="dialog" aria-labelledby="registration-login-form-popup" aria-hidden="true">
			<div class="modal-dialog window-popup registration-login-form-popup" role="document">
				<div class="modal-content">
					<a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
						<svg class="olymp-close-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
					</a>
					<div class="modal-body">
						<div class="registration-login-form">
							<!-- Nav tabs -->
							<ul class="nav nav-tabs" role="tablist">
								<li class="nav-item">
									<a class="nav-link active" data-toggle="tab" href="#home1" role="tab">
										<svg class="olymp-login-icon">
											<use xlink:href="/svg-icons/sprites/icons.svg#olymp-login-icon"></use>
										</svg>
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" data-toggle="tab" href="#profile1" role="tab">
										<svg class="olymp-register-icon">
											<use xlink:href="/svg-icons/sprites/icons.svg#olymp-register-icon"></use>
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
											<svg class="olymp-calendar-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>
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
								<div class="/img-wrap">
									<img src="/img/logo.png" width="60" alt="FaceValue">
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
  metaInfo () {
    return {
      title: this.$route.name
    }
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
    userIsAuthenticated(value) {
      if (value) {
        if (!this.userData.program) this.$router.push("/account");
        else this.$router.push("/");
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
