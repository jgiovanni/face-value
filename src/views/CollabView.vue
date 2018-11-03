<template>
	<div class="container">
		<div class="row">
			<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="ui-block">

				</div>
			</div>
		</div>
	</div>
</template>
<style>
</style>
<script type="text/javascript">
import _ from "lodash";
// import Collab from "../mixins/collab";
import { mapState } from "vuex";
import EditCollabModal from "../components/modals/EditCollabModal";
import InviteCollabModal from "../components/modals/InviteCollabModal";
export default {
  name: "CollabView",
  components: { EditCollabModal, InviteCollabModal },
  // mixins: [Collab],
  data() {
    return {};
  },
  computed: {
    ...mapState(["collabs"]),
    collab() {
      return _.find(this.collabs.items, (item, key) => key === this.$route.params.id);
    }
  },
  watch: {},
  methods: {},
  mounted() {}
};
</script>
