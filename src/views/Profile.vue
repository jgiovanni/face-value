<template>
	<div>
		<!-- Top Header-Profile -->

		<ProfileHeader />

		<!-- ... end Top Header-Profile -->

		<router-view></router-view>
	</div>
</template>
<style>
</style>
<script type="text/javascript">
import ProfileHeader from "../components/blocks/ProfileHeader";
export default {
  name: "Profile",
  components: { ProfileHeader },
  data() {
    return {
      msg: null
    };
  },
  methods: {},
  mounted() {}
};
</script>
