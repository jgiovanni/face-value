<template>
	<div>
		<ProfileHeader />
		<router-view />
	</div>
</template>
<style>
</style>
<script type="text/javascript">
import ProfileHeader from "../components/blocks/Profile/ProfileHeader";
export default {
  name: "Profile",
  components: { ProfileHeader },
  data() {
    return {
      msg: null
    };
  },
  metaInfo () {
    return {
      title: this.$route.name
    }
  },
  methods: {},
  mounted() {}
};
</script>
