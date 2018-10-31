<template>
	<div>
		<template v-if="total">
			<template v-if="userIncluded && randomIncludedNotUser && total === 2">
				<router-link :to="`/${userData.userName}`">You</router-link> and <router-link :to="`/${randomIncludedNotUser.userName}`">{{ randomIncludedNotUser.displayName }}</router-link>
			</template>
			<template v-else >
				<template v-if="userIncluded">
					<router-link :to="`/${userData.userName}`">You</router-link><template v-if="recents && recents.length > 1 && randomIncludedNotUser">, </template>
				</template>
				<template v-if="randomIncludedNotUser">
					<router-link :to="`/${randomIncludedNotUser.userName}`">{{ randomIncludedNotUser.displayName }}</router-link>
				</template>
			</template>
			<template v-if="recents && recents.length > 2">&nbsp;and<br/>{{ includedTotal }} more</template>
			liked this
		</template>
	</div>
</template>
<style>
</style>
<script type="text/javascript">
import _ from "lodash";

export default {
  name: "Aggregator",
  props: {
    item: {
      type: Object,
      required: true
    },
    userIncluded: {
      type: [Object, Boolean],
      default: false
    },
    countProp: {
      type: String,
      required: true
    },
    recentsProp: {
      type: String,
      required: true
    },
    verb: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      msg: null
    };
  },
  computed: {
    total() {
      return this.item[this.countProp];
    },
    includedTotal() {
      let total = this.total;
      if (this.userIncluded) total--;
      if (this.randomIncludedNotUser) total--;
      return total;
    },
    recents() {
      return this.item[this.recentsProp];
    },
    randomIncludedNotUser() {
      const included = _.without(
        this.recents,
        obj => obj.user.id === this.user.id
      );
      if (included.length) return included[_.random(included.length - 1)];
      return null;
    }
  },
  methods: {},
  mounted() {}
};
</script>
