<template>
	<div id="app" :class="rootClasses">

		<div class="content-bg-wrap"></div>

		<template v-if="$root.appReady">
			<div v-if="userIsAuthenticated" class="fixed-sidebar">
				<div class="fixed-sidebar-left sidebar--small" id="sidebar-left">

					<a href="02-ProfilePage.html" class="logo">
						<div class="img-wrap">
							<img src="img/logo.png" alt="Olympus">
						</div>
					</a>

					<div class="mCustomScrollbar" data-mcs-theme="dark">
						<ul class="left-menu">
							<li>
								<a href="#" class="js-sidebar-open">
									<svg class="olymp-menu-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="OPEN MENU">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-menu-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="03-Newsfeed.html">
									<svg class="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="NEWSFEED">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="16-FavPagesFeed.html">
									<svg class="olymp-star-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="FAV PAGE">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-star-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="17-FriendGroups.html">
									<svg class="olymp-happy-faces-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="FRIEND GROUPS">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="18-MusicAndPlaylists.html">
									<svg class="olymp-headphones-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="MUSIC&PLAYLISTS">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-headphones-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="19-WeatherWidget.html">
									<svg class="olymp-weather-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="WEATHER APP">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-weather-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="20-CalendarAndEvents-MonthlyCalendar.html">
									<svg class="olymp-calendar-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="CALENDAR AND EVENTS">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-calendar-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="24-CommunityBadges.html">
									<svg class="olymp-badge-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Community Badges">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-badge-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="25-FriendsBirthday.html">
									<svg class="olymp-cupcake-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Friends Birthdays">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-cupcake-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="26-Statistics.html">
									<svg class="olymp-stats-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Account Stats">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-stats-icon"></use>
									</svg>
								</a>
							</li>
							<li>
								<a href="27-ManageWidgets.html">
									<svg class="olymp-manage-widgets-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Manage Widgets">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-manage-widgets-icon"></use>
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="fixed-sidebar-left sidebar--large" id="sidebar-left-1">
					<a href="02-ProfilePage.html" class="logo">
						<div class="img-wrap">
							<img src="img/logo.png" alt="Olympus">
						</div>
						<div class="title-block">
							<h6 class="logo-title">olympus</h6>
						</div>
					</a>

					<div class="mCustomScrollbar" data-mcs-theme="dark">
						<ul class="left-menu">
							<li>
								<a href="#" class="js-sidebar-open">
									<svg class="olymp-close-icon left-menu-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-close-icon"></use>
									</svg>
									<span class="left-menu-title">Collapse Menu</span>
								</a>
							</li>
							<li>
								<a href="03-Newsfeed.html">
									<svg class="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="NEWSFEED">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use>
									</svg>
									<span class="left-menu-title">Newsfeed</span>
								</a>
							</li>
							<li>
								<a href="16-FavPagesFeed.html">
									<svg class="olymp-star-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="FAV PAGE">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-star-icon"></use>
									</svg>
									<span class="left-menu-title">Fav Pages Feed</span>
								</a>
							</li>
							<li>
								<a href="17-FriendGroups.html">
									<svg class="olymp-happy-faces-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="FRIEND GROUPS">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use>
									</svg>
									<span class="left-menu-title">Friend Groups</span>
								</a>
							</li>
							<li>
								<a href="18-MusicAndPlaylists.html">
									<svg class="olymp-headphones-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="MUSIC&PLAYLISTS">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-headphones-icon"></use>
									</svg>
									<span class="left-menu-title">Music & Playlists</span>
								</a>
							</li>
							<li>
								<a href="19-WeatherWidget.html">
									<svg class="olymp-weather-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="WEATHER APP">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-weather-icon"></use>
									</svg>
									<span class="left-menu-title">Weather App</span>
								</a>
							</li>
							<li>
								<a href="20-CalendarAndEvents-MonthlyCalendar.html">
									<svg class="olymp-calendar-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="CALENDAR AND EVENTS">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-calendar-icon"></use>
									</svg>
									<span class="left-menu-title">Calendar and Events</span>
								</a>
							</li>
							<li>
								<a href="24-CommunityBadges.html">
									<svg class="olymp-badge-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Community Badges">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-badge-icon"></use>
									</svg>
									<span class="left-menu-title">Community Badges</span>
								</a>
							</li>
							<li>
								<a href="25-FriendsBirthday.html">
									<svg class="olymp-cupcake-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Friends Birthdays">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-cupcake-icon"></use>
									</svg>
									<span class="left-menu-title">Friends Birthdays</span>
								</a>
							</li>
							<li>
								<a href="26-Statistics.html">
									<svg class="olymp-stats-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Account Stats">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-stats-icon"></use>
									</svg>
									<span class="left-menu-title">Account Stats</span>
								</a>
							</li>
							<li>
								<a href="27-ManageWidgets.html">
									<svg class="olymp-manage-widgets-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Manage Widgets">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-manage-widgets-icon"></use>
									</svg>
									<span class="left-menu-title">Manage Widgets</span>
								</a>
							</li>
						</ul>

						<div class="profile-completion">

							<div class="skills-item">
								<div class="skills-item-info">
									<span class="skills-item-title">Profile Completion</span>
									<span class="skills-item-count"><span class="count-animate" data-speed="1000"
									                                      data-refresh-interval="50" data-to="76"
									                                      data-from="0"></span><span
											class="units">76%</span></span>
								</div>
								<div class="skills-item-meter">
									<span class="skills-item-meter-active bg-primary" style="width: 76%"></span>
								</div>
							</div>

							<span>Complete <a href="#">your profile</a> so people can know more about you!</span>

						</div>
					</div>
				</div>
			</div>

			<!-- ... end Fixed Sidebar Left -->


			<!-- Fixed Sidebar Left -->

			<div v-if="userIsAuthenticated" class="fixed-sidebar fixed-sidebar-responsive">

				<div class="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
					<a href="#" class="logo js-sidebar-open">
						<img src="img/logo.png" alt="Olympus">
					</a>

				</div>

				<div class="fixed-sidebar-left sidebar--large" id="sidebar-left-1-responsive">
					<a href="#" class="logo">
						<div class="img-wrap">
							<img src="img/logo.png" alt="Olympus">
						</div>
						<div class="title-block">
							<h6 class="logo-title">olympus</h6>
						</div>
					</a>

					<div class="mCustomScrollbar" data-mcs-theme="dark">

						<div class="control-block">
							<div class="author-page author vcard inline-items">
								<div class="author-thumb">
									<img alt="author" src="img/author-page.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>
								<a href="02-ProfilePage.html" class="author-name fn">
									<div class="author-title">
										James Spiegel
										<svg class="olymp-dropdown-arrow-icon">
											<use xlink:href="svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use>
										</svg>
									</div>
									<span class="author-subtitle">SPACE COWBOY</span>
								</a>
							</div>
						</div>

						<div class="ui-block-title ui-block-title-small">
							<h6 class="title">MAIN SECTIONS</h6>
						</div>

						<ul class="left-menu">
							<li>
								<a href="#" class="js-sidebar-open">
									<svg class="olymp-close-icon left-menu-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-close-icon"></use>
									</svg>
									<span class="left-menu-title">Collapse Menu</span>
								</a>
							</li>
							<li>
								<a href="mobile-index.html">
									<svg class="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="NEWSFEED">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use>
									</svg>
									<span class="left-menu-title">Newsfeed</span>
								</a>
							</li>
							<li>
								<a href="Mobile-28-YourAccount-PersonalInformation.html">
									<svg class="olymp-star-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="FAV PAGE">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-star-icon"></use>
									</svg>
									<span class="left-menu-title">Fav Pages Feed</span>
								</a>
							</li>
							<li>
								<a href="mobile-29-YourAccount-AccountSettings.html">
									<svg class="olymp-happy-faces-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="FRIEND GROUPS">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use>
									</svg>
									<span class="left-menu-title">Friend Groups</span>
								</a>
							</li>
							<li>
								<a href="Mobile-30-YourAccount-ChangePassword.html">
									<svg class="olymp-headphones-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="MUSIC&PLAYLISTS">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-headphones-icon"></use>
									</svg>
									<span class="left-menu-title">Music & Playlists</span>
								</a>
							</li>
							<li>
								<a href="Mobile-31-YourAccount-HobbiesAndInterests.html">
									<svg class="olymp-weather-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="WEATHER APP">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-weather-icon"></use>
									</svg>
									<span class="left-menu-title">Weather App</span>
								</a>
							</li>
							<li>
								<a href="Mobile-32-YourAccount-EducationAndEmployement.html">
									<svg class="olymp-calendar-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="CALENDAR AND EVENTS">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-calendar-icon"></use>
									</svg>
									<span class="left-menu-title">Calendar and Events</span>
								</a>
							</li>
							<li>
								<a href="Mobile-33-YourAccount-Notifications.html">
									<svg class="olymp-badge-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Community Badges">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-badge-icon"></use>
									</svg>
									<span class="left-menu-title">Community Badges</span>
								</a>
							</li>
							<li>
								<a href="Mobile-34-YourAccount-ChatMessages.html">
									<svg class="olymp-cupcake-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Friends Birthdays">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-cupcake-icon"></use>
									</svg>
									<span class="left-menu-title">Friends Birthdays</span>
								</a>
							</li>
							<li>
								<a href="Mobile-35-YourAccount-FriendsRequests.html">
									<svg class="olymp-stats-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Account Stats">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-stats-icon"></use>
									</svg>
									<span class="left-menu-title">Account Stats</span>
								</a>
							</li>
							<li>
								<a href="#">
									<svg class="olymp-manage-widgets-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="Manage Widgets">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-manage-widgets-icon"></use>
									</svg>
									<span class="left-menu-title">Manage Widgets</span>
								</a>
							</li>
						</ul>

						<div class="ui-block-title ui-block-title-small">
							<h6 class="title">YOUR ACCOUNT</h6>
						</div>

						<ul class="account-settings">
							<li>
								<a href="#">

									<svg class="olymp-menu-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-menu-icon"></use>
									</svg>

									<span>Profile Settings</span>
								</a>
							</li>
							<li>
								<a href="#">
									<svg class="olymp-star-icon left-menu-icon" data-toggle="tooltip"
									     data-placement="right" data-original-title="FAV PAGE">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-star-icon"></use>
									</svg>

									<span>Create Fav Page</span>
								</a>
							</li>
							<li>
								<a href="#">
									<svg class="olymp-logout-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-logout-icon"></use>
									</svg>

									<span>Log Out</span>
								</a>
							</li>
						</ul>

						<div class="ui-block-title ui-block-title-small">
							<h6 class="title">About Olympus</h6>
						</div>

						<ul class="about-olympus">
							<li>
								<a href="#">
									<span>Terms and Conditions</span>
								</a>
							</li>
							<li>
								<a href="#">
									<span>FAQs</span>
								</a>
							</li>
							<li>
								<a href="#">
									<span>Careers</span>
								</a>
							</li>
							<li>
								<a href="#">
									<span>Contact</span>
								</a>
							</li>
						</ul>

					</div>
				</div>
			</div>

			<!-- ... end Fixed Sidebar Left -->


			<!-- Fixed Sidebar Right -->

			<div v-if="userIsAuthenticated" class="fixed-sidebar right">
				<div class="fixed-sidebar-right sidebar--small" id="sidebar-right">

					<div class="mCustomScrollbar" data-mcs-theme="dark">
						<ul class="chat-users">
							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar67-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>
							</li>
							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar62-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>
							</li>

							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar68-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>
							</li>

							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar69-sm.jpg" class="avatar">
									<span class="icon-status away"></span>
								</div>
							</li>

							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar70-sm.jpg" class="avatar">
									<span class="icon-status disconected"></span>
								</div>
							</li>
							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar64-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>
							</li>
							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar71-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>
							</li>
							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar72-sm.jpg" class="avatar">
									<span class="icon-status away"></span>
								</div>
							</li>
							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar63-sm.jpg" class="avatar">
									<span class="icon-status status-invisible"></span>
								</div>
							</li>
							<li class="inline-items js-chat-open">
								<div class="author-thumb">
									<img alt="author" src="img/avatar72-sm.jpg" class="avatar">
									<span class="icon-status away"></span>
								</div>
							</li>
							<li class="inline-items js-chat-open">

								<div class="author-thumb">
									<img alt="author" src="img/avatar71-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>
							</li>
						</ul>
					</div>

					<div class="search-friend inline-items">
						<a href="#" class="js-sidebar-open">
							<svg class="olymp-menu-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-menu-icon"></use>
							</svg>
						</a>
					</div>

					<a href="#" class="olympus-chat inline-items js-chat-open">
						<svg class="olymp-chat---messages-icon">
							<use xlink:href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
						</svg>
					</a>

				</div>

				<div class="fixed-sidebar-right sidebar--large" id="sidebar-right-1">

					<div class="mCustomScrollbar" data-mcs-theme="dark">

						<div class="ui-block-title ui-block-title-small">
							<a href="#" class="title">Close Friends</a>
							<a href="#">Settings</a>
						</div>

						<ul class="chat-users">
							<li class="inline-items js-chat-open">

								<div class="author-thumb">
									<img alt="author" src="img/avatar67-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Carol Summers</a>
									<span class="status">ONLINE</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>

							</li>
							<li class="inline-items js-chat-open">

								<div class="author-thumb">
									<img alt="author" src="img/avatar62-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Mathilda Brinker</a>
									<span class="status">AT WORK!</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>

							</li>

							<li class="inline-items js-chat-open">


								<div class="author-thumb">
									<img alt="author" src="img/avatar68-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Carol Summers</a>
									<span class="status">ONLINE</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>


							</li>

							<li class="inline-items js-chat-open">


								<div class="author-thumb">
									<img alt="author" src="img/avatar69-sm.jpg" class="avatar">
									<span class="icon-status away"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Michael Maximoff</a>
									<span class="status">AWAY</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>


							</li>

							<li class="inline-items js-chat-open">


								<div class="author-thumb">
									<img alt="author" src="img/avatar70-sm.jpg" class="avatar">
									<span class="icon-status disconected"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Rachel Howlett</a>
									<span class="status">OFFLINE</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>


							</li>
						</ul>


						<div class="ui-block-title ui-block-title-small">
							<a href="#" class="title">MY FAMILY</a>
							<a href="#">Settings</a>
						</div>

						<ul class="chat-users">
							<li class="inline-items js-chat-open">

								<div class="author-thumb">
									<img alt="author" src="img/avatar64-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Sarah Hetfield</a>
									<span class="status">ONLINE</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>
							</li>
						</ul>


						<div class="ui-block-title ui-block-title-small">
							<a href="#" class="title">UNCATEGORIZED</a>
							<a href="#">Settings</a>
						</div>

						<ul class="chat-users">
							<li class="inline-items js-chat-open">

								<div class="author-thumb">
									<img alt="author" src="img/avatar71-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Bruce Peterson</a>
									<span class="status">ONLINE</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>


							</li>
							<li class="inline-items js-chat-open">

								<div class="author-thumb">
									<img alt="author" src="img/avatar72-sm.jpg" class="avatar">
									<span class="icon-status away"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Chris Greyson</a>
									<span class="status">AWAY</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>

							</li>
							<li class="inline-items js-chat-open">

								<div class="author-thumb">
									<img alt="author" src="img/avatar63-sm.jpg" class="avatar">
									<span class="icon-status status-invisible"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Nicholas Grisom</a>
									<span class="status">INVISIBLE</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>
							</li>
							<li class="inline-items js-chat-open">

								<div class="author-thumb">
									<img alt="author" src="img/avatar72-sm.jpg" class="avatar">
									<span class="icon-status away"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Chris Greyson</a>
									<span class="status">AWAY</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>
							</li>
							<li class="inline-items js-chat-open">

								<div class="author-thumb">
									<img alt="author" src="img/avatar71-sm.jpg" class="avatar">
									<span class="icon-status online"></span>
								</div>

								<div class="author-status">
									<a href="#" class="h6 author-name">Bruce Peterson</a>
									<span class="status">ONLINE</span>
								</div>

								<div class="more">
									<svg class="olymp-three-dots-icon">
										<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
									</svg>

									<ul class="more-icons">
										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="START CONVERSATION"
											     class="olymp-comments-post-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="ADD TO CONVERSATION"
											     class="olymp-add-to-conversation-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use>
											</svg>
										</li>

										<li>
											<svg data-toggle="tooltip" data-placement="top"
											     data-original-title="BLOCK FROM CHAT"
											     class="olymp-block-from-chat-icon">
												<use xlink:href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use>
											</svg>
										</li>
									</ul>

								</div>
							</li>
						</ul>

					</div>

					<div class="search-friend inline-items">
						<form class="form-group">
							<input class="form-control" placeholder="Search Friends..." value="" type="text">
						</form>

						<a href="29-YourAccount-AccountSettings.html" class="settings">
							<svg class="olymp-settings-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-settings-icon"></use>
							</svg>
						</a>

						<a href="#" class="js-sidebar-open">
							<svg class="olymp-close-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-close-icon"></use>
							</svg>
						</a>
					</div>

					<a href="#" class="olympus-chat inline-items js-chat-open">

						<h6 class="olympus-chat-title">OLYMPUS CHAT</h6>
						<svg class="olymp-chat---messages-icon">
							<use xlink:href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
						</svg>
					</a>

				</div>
			</div>

			<!-- ... end Fixed Sidebar Right -->


			<!-- Fixed Sidebar Right-Responsive -->

			<div v-if="userIsAuthenticated" class="fixed-sidebar right fixed-sidebar-responsive">

				<div class="fixed-sidebar-right sidebar--small" id="sidebar-right-responsive">

					<a href="#" class="olympus-chat inline-items js-chat-open">
						<svg class="olymp-chat---messages-icon">
							<use xlink:href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
						</svg>
					</a>

				</div>

			</div>

			<!-- ... end Fixed Sidebar Right-Responsive -->

			<UserHeader v-if="userIsAuthenticated" />
			<PublicHeader v-else />

			<!-- Main Content -->

			<transition name="fade">
				<router-view/>
			</transition>


			<!-- ...end Main Content -->

			<a v-if="userIsAuthenticated" class="back-to-top" href="#">
				<img src="svg-icons/back-to-top.svg" alt="arrow" class="back-icon">
			</a>


			<!-- Window-popup-CHAT for responsive min-width: 768px -->

			<div v-if="userIsAuthenticated" class="ui-block popup-chat popup-chat-responsive" tabindex="-1"
			     role="dialog" aria-labelledby="update-header-photo" aria-hidden="true">

				<div class="modal-content">
					<div class="modal-header">
						<span class="icon-status online"></span>
						<h6 class="title">Chat</h6>
						<div class="more">
							<svg class="olymp-three-dots-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
							</svg>
							<svg class="olymp-little-delete js-chat-open">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-little-delete"></use>
							</svg>
						</div>
					</div>
					<div class="modal-body">
						<div class="mCustomScrollbar">
							<ul class="notification-list chat-message chat-message-field">
								<li>
									<div class="author-thumb">
										<img src="img/avatar14-sm.jpg" alt="author" class="mCS_img_loaded">
									</div>
									<div class="notification-event">
										<span class="chat-message-item">Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
										<span class="notification-date"><time class="entry-date updated"
										                                      datetime="2004-07-24T18:18">Yesterday at 8:10pm</time></span>
									</div>
								</li>

								<li>
									<div class="author-thumb">
										<img src="img/author-page.jpg" alt="author" class="mCS_img_loaded">
									</div>
									<div class="notification-event">
										<span class="chat-message-item">Don’t worry Mathilda!</span>
										<span class="chat-message-item">I already bought everything</span>
										<span class="notification-date"><time class="entry-date updated"
										                                      datetime="2004-07-24T18:18">Yesterday at 8:29pm</time></span>
									</div>
								</li>

								<li>
									<div class="author-thumb">
										<img src="img/avatar14-sm.jpg" alt="author" class="mCS_img_loaded">
									</div>
									<div class="notification-event">
										<span class="chat-message-item">Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
										<span class="notification-date"><time class="entry-date updated"
										                                      datetime="2004-07-24T18:18">Yesterday at 8:10pm</time></span>
									</div>
								</li>
							</ul>
						</div>

						<form class="need-validation">

							<div class="form-group label-floating is-empty">
								<label class="control-label">Press enter to post...</label>
								<textarea class="form-control" placeholder=""></textarea>
								<div class="add-options-message">
									<a href="#" class="options-message">
										<svg class="olymp-computer-icon">
											<use xlink:href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use>
										</svg>
									</a>
									<div class="options-message smile-block">

										<svg class="olymp-happy-sticker-icon">
											<use xlink:href="svg-icons/sprites/icons.svg#olymp-happy-sticker-icon"></use>
										</svg>

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
					</div>
				</div>

			</div>

			<!-- ... end Window-popup-CHAT for responsive min-width: 768px -->
		</template>
	</div>
</template>

<script>
  import FixedLeftSidebar from './components/FixedLeftSidebar'
  import UserHeader from './components/UserHeader'
  import PublicHeader from './components/PublicHeader'

  export default {
    components: {FixedLeftSidebar, UserHeader, PublicHeader},
    data() {
      return {
        headerClass: "",

      }
    },
    computed: {
      rootClasses() {
        return this.$route.meta.rootClasses || '';
      },
      headerClasses() {
        return this.$route.meta.headerClasses || '';
      },
    },
    created() {
      let self = this;
      this.$root.$on('changeRootClass', (classes) => {
        // self.rootClass = classes;
      });
      this.$root.$on('changeHeaderClass', (classes) => {
        self.headerClass = classes;
      });
    }
  }
</script>

<style lang="scss">
	#app {

	}
	/*.md-body-1, .md-body-2, body {
		font-size: .812rem;
		letter-spacing: normal;
	}*/
	.form-control, input, select {
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
		input[type=checkbox] {
			display: block;
		}
	}
	.md-checkbox .md-checkbox-container {
		border: 1px solid #e6ecf5 !important;
	}
	.md-checkbox.md-theme-default.md-checked .md-checkbox-container {
		background-color: #ff5252;
		background-color: var(--md-theme-default-accent, #ff5252);
		border-color: #ff5252;
		border-color: var(--md-theme-default-accent, #ff5252)
	}

	.md-checkbox.md-theme-default.md-checked .md-checkbox-container:after {
		border-color: #fff;
		border-color: var(--md-theme-default-background, #fff)
	}

	.md-checkbox.md-theme-default.md-checked .md-ripple {
		color: #ff5252;
		color: var(--md-theme-default-accent, #ff5252)
	}
	.md-radio.md-theme-default.md-checked .md-radio-container {
		border-color: #ff5252;
		border-color: var(--md-theme-default-accent, #ff5252)
	}

	.md-radio.md-theme-default.md-checked .md-radio-container:after {
		background-color: #ff5252;
		background-color: var(--md-theme-default-accent, #ff5252)
	}

	.md-radio.md-theme-default.md-checked .md-ripple {
		color: #ff5252;
		color: var(--md-theme-default-accent, #ff5252)
	}
</style>
