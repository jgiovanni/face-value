/*
* Slim v4.14.3 - Image Cropping Made Easy
* Copyright (c) 2017 Rik Schennink - http://slimimagecropper.com
*/
<template>
	<div class="slim">
		<slot></slot>
	</div>
</template>

<script>
// Slim (place slim CSS and slim.module.js file in same folder as this file)
import Slim from "./slim.module.js";
let instance = null;
export default {
  props: ["options"],
  name: "slim-cropper",
  mounted() {
    if (this.options.initialImage) {
      let img = document.createElement("img");
      img.setAttribute("alt", "");
      img.src = this.options.initialImage;
      this.$el.appendChild(img);
    }
    instance = new Slim(this.$el, this.options);
  },
  destroyed() {
    instance.destroy();
  }
};
</script>
<style lang="css">
	@import "./slim.min.css";
</style>
