<template>
	<div class="container">
		<div class="row m-0">
			<div class="col col-12 p-0">
				<div class="ui-block">
					<div class="row m-0">
						<div class="col col-xl-5 col-lg-6 col-md-12 col-sm-12 padding-r-0 p-0">


							<!-- Notification List Chat Messages -->

							<ul class="notification-list chat-message">
								<li>
									<div class="author-thumb">
										<img src="img/avatar8-sm.jpg" alt="author">
									</div>
									<div class="notification-event">
										<a href="#" class="h6 notification-friend">Diana Jameson</a>
										<span class="chat-message-item">Hi James! It’s Diana, I just wanted to let you know that we have to reschedule...</span>
										<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">4 hours ago</time></span>
									</div>
									<span class="notification-icon">
																<svg class="olymp-chat---messages-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
															</span>

									<div class="more">
										<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									</div>
								</li>

								<li>
									<div class="author-thumb">
										<img src="img/avatar9-sm.jpg" alt="author">
									</div>
									<div class="notification-event">
										<a href="#" class="h6 notification-friend">Jake Parker</a>
										<span class="chat-message-item">Great, I’ll see you tomorrow!.</span>
										<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">4 hours ago</time></span>
									</div>
									<span class="notification-icon">
																<svg class="olymp-chat---messages-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
															</span>

									<div class="more">
										<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									</div>
								</li>
								<li>
									<div class="author-thumb">
										<img src="img/avatar10-sm.jpg" alt="author">
									</div>
									<div class="notification-event">
										<a href="#" class="h6 notification-friend">Elaine Dreyfuss</a>
										<span class="chat-message-item">We’ll have to check that at the office and see if the client is on board with...</span>
										<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 9:56pm</time></span>
									</div>
									<span class="notification-icon">
															<svg class="olymp-chat---messages-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
														</span>
									<div class="more">
										<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									</div>
								</li>

								<li class="chat-group">
									<div class="author-thumb">
										<img src="img/avatar11-sm.jpg" alt="author">
										<img src="img/avatar12-sm.jpg" alt="author">
										<img src="img/avatar13-sm.jpg" alt="author">
										<img src="img/avatar10-sm.jpg" alt="author">
									</div>
									<div class="notification-event">
										<a href="#" class="h6 notification-friend">You, Faye, Ed & Jet +3</a>
										<span class="last-message-author">Ed:</span>
										<span class="chat-message-item">Yeah! Seems fine by me!</span>
										<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">March 16th at 10:23am</time></span>
									</div>
									<span class="notification-icon">
															<svg class="olymp-chat---messages-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
														</span>
									<div class="more">
										<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									</div>
								</li>
							</ul>

							<!-- ... end Notification List Chat Messages -->


							<!-- Popup Chat -->

							<!--<div class="ui-block popup-chat">
								<div class="ui-block-title">
									<span class="icon-status online"></span>
									<h6 class="title">Mathilda Brinker</h6>
									<div class="more">
										<svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
										<svg class="olymp-little-delete"><use xlink:href="svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
									</div>
								</div>
								<div class="mCustomScrollbar" data-mcs-theme="dark">
									<ul class="notification-list chat-message chat-message-field">
										<li>
											<div class="author-thumb">
												<img src="img/avatar14-sm.jpg" alt="author">
											</div>
											<div class="notification-event">
												<span class="chat-message-item">Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
												<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 8:10pm</time></span>
											</div>
										</li>

										<li>
											<div class="author-thumb">
												<img src="img/author-page.jpg" alt="author">
											</div>
											<div class="notification-event">
												<span class="chat-message-item">Don’t worry Mathilda!</span>
												<span class="chat-message-item">I already bought everything</span>
												<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 8:29pm</time></span>
											</div>
										</li>

										<li>
											<div class="author-thumb">
												<img src="img/avatar14-sm.jpg" alt="author">
											</div>
											<div class="notification-event">
												<span class="chat-message-item">Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
												<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 8:10pm</time></span>
											</div>
										</li>
									</ul>
								</div>

								<form>

									<div class="form-group label-floating is-empty">
										<label class="control-label">Press enter to post...</label>
										<textarea class="form-control" placeholder=""  ></textarea>
										<div class="add-options-message">
											<a href="#" class="options-message">
												<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
											</a>
											<div class="options-message smile-block">

												<svg class="olymp-happy-sticker-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-happy-sticker-icon"></use></svg>

												<ul class="more-dropdown more-with-triangle triangle-bottom-right">
													<li>
														<a href="#">
															<img src="img/icon-chat1.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat2.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat3.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat4.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat5.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat6.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat7.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat8.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat9.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat10.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat11.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat12.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat13.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat14.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat15.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat16.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat17.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat18.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat19.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat20.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat21.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat22.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat23.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat24.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat25.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat26.png" alt="icon">
														</a>
													</li>
													<li>
														<a href="#">
															<img src="img/icon-chat27.png" alt="icon">
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>

								</form>


							</div>-->

							<!-- ... end Popup Chat -->


						</div>

						<div class="col col-xl-7 col-lg-6 col-md-12 col-sm-12 padding-l-0 p-0">


							<!-- Chat Field -->

							<div class="chat-field">
								<div class="ui-block-title">
									<h6 class="title">Elaine Dreyfuss</h6>
									<a href="#" class="more"><svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
								</div>
								<div class="mCustomScrollbar" data-mcs-theme="dark">
									<ul class="notification-list chat-message chat-message-field">
										<li>
											<div class="author-thumb">
												<img src="img/avatar10-sm.jpg" alt="author">
											</div>
											<div class="notification-event">
												<a href="#" class="h6 notification-friend">Elaine Dreyfuss</a>
												<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 8:10pm</time></span>
												<span class="chat-message-item">Hi James, How are your doing? Please remember that next week we are going to Gotham Bar to celebrate Marina’s Birthday.</span>
											</div>
										</li>

										<li>
											<div class="author-thumb">
												<img src="img/author-page.jpg" alt="author">
											</div>
											<div class="notification-event">
												<a href="#" class="h6 notification-friend">James Spiegel</a>
												<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 8:30pm</time></span>
												<span class="chat-message-item">Hi Elaine! I have a question, do you think that tomorrow we could talk to
																	the client to iron out some details before the presentation? I already finished the first screen but
																	I need to ask him something before moving on. Anyway, here’s a preview!
																</span>
												<div class="added-photos">
													<img src="img/photo-message1.jpg" alt="photo">
													<img src="img/photo-message2.jpg" alt="photo">
													<span class="photos-name">icons.jpeg; bunny.jpeg</span>
												</div>
											</div>
										</li>

										<li>
											<div class="author-thumb">
												<img src="img/avatar10-sm.jpg" alt="author">
											</div>
											<div class="notification-event">
												<a href="#" class="h6 notification-friend">Elaine Dreyfuss</a>
												<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 9:56pm</time></span>
												<span class="chat-message-item">We’ll have to check that at the office and see if the client is on board with it. I think That looks really good!</span>
											</div>
										</li>
									</ul>
								</div>

								<form>

									<div class="form-group label-floating is-empty">
										<label class="control-label">Write your reply here...</label>
										<textarea class="form-control" placeholder=""  ></textarea>
									</div>

									<div class="add-options-message">
										<a href="#" class="options-message">
											<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
										</a>
										<a href="#" class="options-message">
											<svg class="olymp-computer-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
										</a>
										<div class="options-message smile-block">
											<svg class="olymp-happy-sticker-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-happy-sticker-icon"></use></svg>

											<ul class="more-dropdown more-with-triangle triangle-bottom-right">
												<li>
													<a href="#">
														<img src="img/icon-chat1.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat2.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat3.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat4.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat5.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat6.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat7.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat8.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat9.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat10.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat11.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat12.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat13.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat14.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat15.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat16.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat17.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat18.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat19.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat20.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat21.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat22.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat23.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat24.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat25.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat26.png" alt="icon">
													</a>
												</li>
												<li>
													<a href="#">
														<img src="img/icon-chat27.png" alt="icon">
													</a>
												</li>
											</ul>
										</div>

										<button class="btn btn-primary btn-sm">Post Reply</button>
									</div>

								</form>

							</div>

							<!-- ... end Chat Field -->

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style></style>
<script type="text/javascript">
  export default {
    name: "Messenger",
    data() {
      return {
        msg: null
      };
    },
    methods: {},
    mounted() {
      
    }
  };
</script>
