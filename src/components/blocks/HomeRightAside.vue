<template>
	<aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-12 col-12">

		<div class="ui-block">
			<div class="ui-block-title">
				<h6 class="title">Suggestions</h6>
				<a href="#" class="more">
					<svg class="olymp-three-dots-icon">
						<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
					</svg>
				</a>
			</div>


			<!-- W-Action -->

			<ul class="widget w-friend-pages-added notification-list friend-requests">
				<li class="inline-items">
					<div class="author-thumb">
						<img src="img/avatar38-sm.jpg" alt="author">
					</div>
					<div class="notification-event">
						<a href="#" class="h6 notification-friend">Francine Smith</a>
						<span class="chat-message-item">8 Friends in Common</span>
					</div>
					<span class="notification-icon">
							<a href="#" class="accept-request">
								<span class="icon-add without-text">
									<svg class="olymp-happy-face-icon"><use
											xlink:href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
								</span>
							</a>
						</span>
				</li>

				<li class="inline-items">
					<div class="author-thumb">
						<img src="img/avatar39-sm.jpg" alt="author">
					</div>
					<div class="notification-event">
						<a href="#" class="h6 notification-friend">Hugh Wilson</a>
						<span class="chat-message-item">6 Friends in Common</span>
					</div>
					<span class="notification-icon">
							<a href="#" class="accept-request">
								<span class="icon-add without-text">
									<svg class="olymp-happy-face-icon"><use
											xlink:href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
								</span>
							</a>
						</span>
				</li>

				<li class="inline-items">
					<div class="author-thumb">
						<img src="img/avatar40-sm.jpg" alt="author">
					</div>
					<div class="notification-event">
						<a href="#" class="h6 notification-friend">Karen Masters</a>
						<span class="chat-message-item">6 Friends in Common</span>
					</div>
					<span class="notification-icon">
							<a href="#" class="accept-request">
								<span class="icon-add without-text">
									<svg class="olymp-happy-face-icon"><use
											xlink:href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
								</span>
							</a>
						</span>
				</li>

			</ul>

			<!-- ... end W-Action -->
		</div>

		<div class="ui-block">

			<!-- W-Action -->

			<div class="widget w-action">

				<img src="img/logo.png" alt="Face Value">
				<div class="content">
					<h4 class="title">AD SPACE</h4>
					<span>PREMIUM AD SPACE HERE!</span>
					<!--<a href="01-LandingPage.html" class="btn btn-bg-secondary btn-md">Register Now!</a>-->
				</div>
			</div>

			<!-- ... end W-Action -->
		</div>

	</aside>
</template>
<style>
</style>
<script type="text/javascript">
export default {
  name: "HomeRightAside",
  data() {
    return {
      msg: null
    };
  },
  methods: {},
  mounted() {}
};
</script>
