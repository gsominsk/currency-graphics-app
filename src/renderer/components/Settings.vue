<template>
	<div id="wrapper">
		<div class="settings-wrap">
			Settings
		</div>
	</div>
</template>

<script>
	export default {
		mounted () {
			var wrapper = document.getElementById('wrapper');

			wrapper.setAttribute('style', 'opacity: 0');
			setTimeout(()=> {
				wrapper.removeAttribute('style');
			}, 300);
		}
	}
</script>

<style>
</style>
