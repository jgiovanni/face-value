<template>
	<div class="ui-block">


		<article class="hentry post">

			<div class="post__author author vcard inline-items">
				<img :src="item.author.photoUrl || 'img/avatar10-sm.jpg'" width="36" alt="author">

				<div class="author-date">
					<router-link class="h6 post__author-name fn" :to="`/${item.author.userName}`" v-text="item.author.displayName"></router-link>
					<div class="post__date">
						<time class="published" datetime="2004-07-24T18:18">
							9 hours ago
						</time>
					</div>
				</div>

				<div class="more"><svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
					<ul class="more-dropdown">
						<li>
							<a href="#">Edit Post</a>
						</li>
						<li>
							<a href="#">Delete Post</a>
						</li>
						<li>
							<a href="#">Turn Off Notifications</a>
						</li>
						<li>
							<a href="#">Select as Featured</a>
						</li>
					</ul>
				</div>

			</div>

			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris consequat.
			</p>

			<div class="post-additional-info inline-items">

				<a href="#" class="post-add-icon inline-items">
					<svg class="olymp-heart-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
					<span>24</span>
				</a>

				<ul class="friends-harmonic">
					<li>
						<a href="#">
							<img src="img/friend-harmonic7.jpg" alt="friend">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="img/friend-harmonic8.jpg" alt="friend">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="img/friend-harmonic9.jpg" alt="friend">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="img/friend-harmonic10.jpg" alt="friend">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="img/friend-harmonic11.jpg" alt="friend">
						</a>
					</li>
				</ul>

				<div class="names-people-likes">
					<a href="#">You</a>, <a href="#">Elaine</a> and
					<br>22 more liked this
				</div>


				<div class="comments-shared">
					<a href="#" class="post-add-icon inline-items">
						<svg class="olymp-speech-balloon-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
						<span>17</span>
					</a>

					<a href="#" class="post-add-icon inline-items">
						<svg class="olymp-share-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
						<span>24</span>
					</a>
				</div>


			</div>

			<div class="control-block-button post-control-button">

				<a href="#" class="btn btn-control">
					<svg class="olymp-like-post-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-like-post-icon"></use></svg>
				</a>

				<a href="#" class="btn btn-control">
					<svg class="olymp-comments-post-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
				</a>

				<a href="#" class="btn btn-control">
					<svg class="olymp-share-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
				</a>

			</div>

		</article>

		<!-- Comments -->

		<ul class="comments-list">
			<li class="comment-item">
				<div class="post__author author vcard inline-items">
					<img src="img/author-page.jpg" alt="author">

					<div class="author-date">
						<a class="h6 post__author-name fn" href="02-ProfilePage.html">James Spiegel</a>
						<div class="post__date">
							<time class="published" datetime="2004-07-24T18:18">
								38 mins ago
							</time>
						</div>
					</div>

					<a href="#" class="more"><svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>

				</div>

				<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque laudantium.</p>

				<a href="#" class="post-add-icon inline-items">
					<svg class="olymp-heart-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
					<span>3</span>
				</a>
				<a href="#" class="reply">Reply</a>
			</li>
			<li class="comment-item">
				<div class="post__author author vcard inline-items">
					<img src="img/avatar1-sm.jpg" alt="author">

					<div class="author-date">
						<a class="h6 post__author-name fn" href="#">Mathilda Brinker</a>
						<div class="post__date">
							<time class="published" datetime="2004-07-24T18:18">
								1 hour ago
							</time>
						</div>
					</div>

					<a href="#" class="more"><svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>

				</div>

				<p>Ratione voluptatem sequi en lod nesciunt. Neque porro quisquam est, quinder dolorem ipsum
					quia dolor sit amet, consectetur adipisci velit en lorem ipsum duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
				</p>

				<a href="#" class="post-add-icon inline-items">
					<svg class="olymp-heart-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
					<span>8</span>
				</a>
				<a href="#" class="reply">Reply</a>
			</li>
		</ul>

		<!-- ... end Comments -->

		<a href="#" class="more-comments">View more comments <span>+</span></a>


		<!-- Comment Form  -->

		<form class="comment-form inline-items">

			<div class="post__author author vcard inline-items">
				<img src="img/author-page.jpg" alt="author">

				<div class="form-group with-icon-right ">
					<textarea class="form-control" placeholder=""></textarea>
					<div class="add-options-message">
						<a href="#" class="options-message" data-toggle="modal" data-target="#update-header-photo">
							<svg class="olymp-camera-icon">
								<use xlink:href="svg-icons/sprites/icons.svg#olymp-camera-icon"></use>
							</svg>
						</a>
					</div>
				</div>
			</div>

			<button class="btn btn-md-2 btn-primary">Post Comment</button>

			<button class="btn btn-md-2 btn-border-think c-grey btn-transparent custom-color">Cancel</button>

		</form>

		<!-- ... end Comment Form  -->
	</div>
</template>
<style>

</style>
<script type="text/javascript">
  import { mapState } from "vuex";

  export default {
    name: 'NewsFeedItem',
    props: ['item'],
    data() {
      return {

      }
    },
    computed: {
      ...mapState([]),
    },
      methods: {},
    mounted() {
      
    }
  }
</script>
