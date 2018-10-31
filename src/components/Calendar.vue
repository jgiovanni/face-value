<template>
	<v-calendar :attributes='attrs'></v-calendar></template>
<style>
</style>
<script type="text/javascript">
export default {
  name: "Calendar",
  data() {
    return {
      attrs: [
        {
          key: "today",
          highlight: {
            backgroundColor: "#ff8080"
          },
          // Just use a normal style
          contentStyle: {
            color: "#fafafa"
          },
          dates: new Date(2018, 0, 1)
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>
