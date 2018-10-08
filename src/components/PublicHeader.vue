<template>
	<div class="header--standard header--standard-landing" id="header--standard">
		<div class="container">
			<div class="header--standard-wrap">

				<a href="#" class="logo">
					<div class="img-wrap">
						<img src="img/logo.png" alt="Olympus">
						<img src="img/logo-colored-small.png" alt="Olympus" class="logo-colored">
					</div>
					<div class="title-block">
						<h6 class="logo-title">FaceValue</h6>
						<div class="sub-title">SKILL SHARING</div>
					</div>
				</a>

				<a href="#" class="open-responsive-menu js-open-responsive-menu">
					<svg class="olymp-menu-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>
				</a>

				<div class="nav nav-pills nav1 header-menu" :class="{ 'expanded-menu': expanded }">
					<div class="mCustomScrollbar">
						<ul>
							<li class="nav-item">
								<router-link to="/" class="nav-link">Home</router-link>
							</li>
							<li class="nav-item">
								<router-link to="/tos" class="nav-link">Terms & Conditions</router-link>
							</li>
							<li class="nav-item">
								<router-link to="/privacy-policy" class="nav-link">Privacy Policy</router-link>
							</li>
							<li class="close-responsive-menu js-close-responsive-menu">
								<svg class="olymp-close-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
							</li>
							<li class="nav-item js-expanded-menu">
								<a @click.prevent="expanded = !expanded" class="nav-link">
									<svg class="olymp-menu-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>
									<svg class="olymp-close-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style></style>
<script type="text/javascript">
  export default {
    name: 'PublicHeader',
    data() {
      return {
        expanded: false
      }
    },
    methods: {},
    mounted() {
      
    }
  }
</script>