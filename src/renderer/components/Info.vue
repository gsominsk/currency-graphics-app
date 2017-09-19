<template>
	<div id="wrapper">
		<div class="info-wrap">
			Work was created in 9 hours. <br>
				If you ignore 12 hours of searching for answers "why sqlite not working" :)
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return ({})
		},
		methods: {

		},
		mounted () {
			var wrapper = document.getElementById('wrapper');

			wrapper.setAttribute('style', 'opacity: 0');
			setTimeout(()=> {
				wrapper.removeAttribute('style');
			}, 300);
		},
		created () {
			var request = require('request')
			var url = 'http://resources.finance.ua/ru/public/currency-cash.json'

			function goog(callback) {
				request(url, (error, response, body) => {
					if (!error && response.statusCode == 200) {
						callback(response, body);
					}
				});
			}

			goog((res, body) => {

			});
		}
	}
</script>

<style>
</style>
