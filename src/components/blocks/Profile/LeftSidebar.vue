<template>
	<div class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">

		<div class="ui-block">
			<div class="ui-block-title">
				<h6 class="title">Profile Intro</h6>
			</div>
			<div class="ui-block-content">

				<!-- W-Personal-Info -->

				<ul class="widget w-personal-info item-block">
					<li>
						<span class="title">About Me:</span>
						<span class="text" v-text="userData.about"></span>
					</li>
					<li>
						<span class="title">Skills:</span>
						<span class="text">
								<router-link :to="{ name: 'home',  query: { skill }}" v-for="(val, skill) in userData.skills" :key="skill">{{ skill }}, </router-link>
						</span>
					</li>
					<!--<li>
						<span class="title">Favourite Music Bands / Artists:</span>
						<span class="text">Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge.</span>
					</li>-->
				</ul>

				<!-- .. end W-Personal-Info -->
				<!-- W-Socials -->

				<div class="widget w-socials">
					<h6 class="title">Social Networks:</h6>
					<a target="_blank" v-if="userData.website" :href="userData.website" class="social-item bg-dark" style="text-transform: capitalize">
						<i class="fa fa-globe" aria-hidden="true"></i>
						Website
					</a>
					<a target="_blank" v-for="(val, key) in userData.social" :key="key" :href="val" class="social-item" :class="getSocialBg(key)" style="text-transform: capitalize">
						<i class="fab" :class="getSocialIcon(key)" aria-hidden="true"></i>
						{{ key }}
					</a>
				</div>
				<!-- ... end W-Socials -->
			</div>
		</div>

		<!--<div class="ui-block">
			<div class="ui-block-title">
				<h6 class="title">Badges</h6>
			</div>
			<div class="ui-block-content">

				&lt;!&ndash; W-Badges &ndash;&gt;

				<ul class="widget w-badges">
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge1.png" alt="author">
							<div class="label-avatar bg-primary">2</div>
						</a>
					</li>
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge4.png" alt="author">
						</a>
					</li>
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge3.png" alt="author">
							<div class="label-avatar bg-blue">4</div>
						</a>
					</li>
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge6.png" alt="author">
						</a>
					</li>
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge11.png" alt="author">
						</a>
					</li>
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge8.png" alt="author">
						</a>
					</li>
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge10.png" alt="author">
						</a>
					</li>
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge13.png" alt="author">
							<div class="label-avatar bg-breez">2</div>
						</a>
					</li>
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge7.png" alt="author">
						</a>
					</li>
					<li>
						<a href="24-CommunityBadges.html">
							<img src="img/badge12.png" alt="author">
						</a>
					</li>
				</ul>

				&lt;!&ndash;.. end W-Badges &ndash;&gt;
			</div>
		</div>-->

		<!--<div class="ui-block">
			<div class="ui-block-title">
				<h6 class="title">My Spotify Playlist</h6>
			</div>

			&lt;!&ndash; W-Playlist &ndash;&gt;

			<ol class="widget w-playlist">
				<li class="js-open-popup" data-popup-target=".playlist-popup">
					<div class="playlist-thumb">
						<img src="img/playlist6.jpg" alt="thumb-composition">
						<div class="overlay"></div>
						<a href="#" class="play-icon">
							<svg class="olymp-music-play-icon-big">
								<use xlink:href="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big"></use>
							</svg>
						</a>
					</div>

					<div class="composition">
						<a href="#" class="composition-name">The Past Starts Slow...</a>
						<a href="#" class="composition-author">System of a Revenge</a>
					</div>

					<div class="composition-time">
						<time class="published" datetime="2017-03-24T18:18">3:22</time>
						<div class="more">
							<svg class="olymp-three-dots-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
							</svg>
							<ul class="more-dropdown">
								<li>
									<a href="#">Add Song to Player</a>
								</li>
								<li>
									<a href="#">Add Playlist to Player</a>
								</li>
							</ul>
						</div>
					</div>

				</li>

				<li class="js-open-popup" data-popup-target=".playlist-popup">
					<div class="playlist-thumb">
						<img src="img/playlist7.jpg" alt="thumb-composition">
						<div class="overlay"></div>
						<a href="#" class="play-icon">
							<svg class="olymp-music-play-icon-big">
								<use xlink:href="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big"></use>
							</svg>
						</a>
					</div>

					<div class="composition">
						<a href="#" class="composition-name">The Pretender</a>
						<a href="#" class="composition-author">Kung Fighters</a>
					</div>

					<div class="composition-time">
						<time class="published" datetime="2017-03-24T18:18">5:48</time>
						<div class="more">
							<svg class="olymp-three-dots-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
							</svg>
							<ul class="more-dropdown">
								<li>
									<a href="#">Add Song to Player</a>
								</li>
								<li>
									<a href="#">Add Playlist to Player</a>
								</li>
							</ul>
						</div>
					</div>

				</li>
				<li class="js-open-popup" data-popup-target=".playlist-popup">
					<div class="playlist-thumb">
						<img src="img/playlist8.jpg" alt="thumb-composition">
						<div class="overlay"></div>
						<a href="#" class="play-icon">
							<svg class="olymp-music-play-icon-big">
								<use xlink:href="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big"></use>
							</svg>
						</a>
					</div>

					<div class="composition">
						<a href="#" class="composition-name">Blood Brothers</a>
						<a href="#" class="composition-author">Iron Maid</a>
					</div>

					<div class="composition-time">
						<time class="published" datetime="2017-03-24T18:18">3:06</time>
						<div class="more">
							<svg class="olymp-three-dots-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
							</svg>
							<ul class="more-dropdown">
								<li>
									<a href="#">Add Song to Player</a>
								</li>
								<li>
									<a href="#">Add Playlist to Player</a>
								</li>
							</ul>
						</div>
					</div>

				</li>
				<li class="js-open-popup" data-popup-target=".playlist-popup">
					<div class="playlist-thumb">
						<img src="img/playlist9.jpg" alt="thumb-composition">
						<div class="overlay"></div>
						<a href="#" class="play-icon">
							<svg class="olymp-music-play-icon-big">
								<use xlink:href="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big"></use>
							</svg>
						</a>
					</div>

					<div class="composition">
						<a href="#" class="composition-name">Seven Nation Army</a>
						<a href="#" class="composition-author">The Black Stripes</a>
					</div>

					<div class="composition-time">
						<time class="published" datetime="2017-03-24T18:18">6:17</time>
						<div class="more">
							<svg class="olymp-three-dots-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
							</svg>
							<ul class="more-dropdown">
								<li>
									<a href="#">Add Song to Player</a>
								</li>
								<li>
									<a href="#">Add Playlist to Player</a>
								</li>
							</ul>
						</div>
					</div>

				</li>
				<li class="js-open-popup" data-popup-target=".playlist-popup">
					<div class="playlist-thumb">
						<img src="img/playlist10.jpg" alt="thumb-composition">
						<div class="overlay"></div>
						<a href="#" class="play-icon">
							<svg class="olymp-music-play-icon-big">
								<use xlink:href="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big"></use>
							</svg>
						</a>
					</div>

					<div class="composition">
						<a href="#" class="composition-name">Killer Queen</a>
						<a href="#" class="composition-author">Archiduke</a>
					</div>

					<div class="composition-time">
						<time class="published" datetime="2017-03-24T18:18">5:40</time>
						<div class="more">
							<svg class="olymp-three-dots-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
							</svg>
							<ul class="more-dropdown">
								<li>
									<a href="#">Add Song to Player</a>
								</li>
								<li>
									<a href="#">Add Playlist to Player</a>
								</li>
							</ul>
						</div>
					</div>

				</li>
			</ol>

			&lt;!&ndash; .. end W-Playlist &ndash;&gt;
		</div>-->

		<!--<div class="ui-block">
			<div class="ui-block-title">
				<h6 class="title">Twitter Feed</h6>
			</div>

			&lt;!&ndash; W-Twitter &ndash;&gt;

			<ul class="widget w-twitter">
				<li class="twitter-item">
					<div class="author-folder">
						<img src="img/twitter-avatar1.png" alt="avatar">
						<div class="author">
							<a href="#" class="author-name">Space Cowboy</a>
							<a href="#" class="group">@james_spiegelOK</a>
						</div>
					</div>
					<p>Tomorrow with the agency we will run 5 km for charity. Come and give us your support!
						<a href="#" class="link-post">#Daydream5K</a></p>
					<span class="post__date">
							<time class="published" datetime="2017-03-24T18:18">
								2 hours ago
							</time>
						</span>
				</li>
				<li class="twitter-item">
					<div class="author-folder">
						<img src="img/twitter-avatar1.png" alt="avatar">
						<div class="author">
							<a href="#" class="author-name">Space Cowboy</a>
							<a href="#" class="group">@james_spiegelOK</a>
						</div>
					</div>
					<p>Check out the new website of “The Bebop Bar”! <a href="#" class="link-post">bytle/thbp53f</a></p>
					<span class="post__date">
							<time class="published" datetime="2017-03-24T18:18">
								16 hours ago
							</time>
						</span>
				</li>
				<li class="twitter-item">
					<div class="author-folder">
						<img src="img/twitter-avatar1.png" alt="avatar">
						<div class="author">
							<a href="#" class="author-name">Space Cowboy</a>
							<a href="#" class="group">@james_spiegelOK</a>
						</div>
					</div>
					<p>The Sunday is the annual agency camping trip and I still haven’t got a tent
						<a href="#" class="link-post">#TheWild #Indoors</a></p>
					<span class="post__date">
							<time class="published" datetime="2017-03-24T18:18">
								Yesterday
							</time>
						</span>
				</li>
			</ul>


			&lt;!&ndash; .. end W-Twitter &ndash;&gt;
		</div>-->

		<!--<div class="ui-block">
			<div class="ui-block-title">
				<h6 class="title">Last Videos</h6>
			</div>
			<div class="ui-block-content">

				&lt;!&ndash; W-Latest-Video &ndash;&gt;

				<ul class="widget w-last-video">
					<li>
						<a href="https://vimeo.com/ondemand/viewfromabluemoon4k/147865858" class="play-video play-video&#45;&#45;small">
							<svg class="olymp-play-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-play-icon"></use>
							</svg>
						</a>
						<img src="img/video8.jpg" alt="video">
						<div class="video-content">
							<div class="title">System of a Revenge - Hypnotize...</div>
							<time class="published" datetime="2017-03-24T18:18">3:25</time>
						</div>
						<div class="overlay"></div>
					</li>
					<li>
						<a href="https://youtube.com/watch?v=excVFQ2TWig" class="play-video play-video&#45;&#45;small">
							<svg class="olymp-play-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-play-icon"></use>
							</svg>
						</a>
						<img src="img/video7.jpg" alt="video">
						<div class="video-content">
							<div class="title">Green Goo - Live at Dan’s Arena</div>
							<time class="published" datetime="2017-03-24T18:18">5:48</time>
						</div>
						<div class="overlay"></div>
					</li>
				</ul>

				&lt;!&ndash; .. end W-Latest-Video &ndash;&gt;
			</div>
		</div>-->

	</div>
</template>
<style>
</style>
<script type="text/javascript">
export default {
  name: "LeftSidebar",
  data() {
    return {
      msg: null
    };
  },
  methods: {
    getSocialIcon(social) {
      switch (social) {
        case "facebook":
          return "fa-facebook-f";
        case "linkedIn":
          return "fa-linkedin-in";
        default:
          return `fa-${social}`;
      }
    },
    getSocialBg(social) {
      switch (social) {
        case "facebook":
          return "bg-facebook";
        case "twitter":
          return "bg-twitter";
        case "dribbble":
          return "bg-dribbble";
        case "instagram":
          return "bg-dribbble";
        case "linkedIn":
          return "bg-blue";
        default:
          return `bg-secondary`;
      }
    }
  },
  mounted() {}
};
</script>
