<template>
  <div id="wrapper">
    <main>
		<div class="graphic-wrap">
			<canvas id="myChart" width="400" height="400"></canvas>
		</div>
	</main>
  </div>
</template>

<script>
	var Datastore = require('nedb');
	var Chart = require('chart.js');
//	var myChart = new Chart(ctx, {...});
	var db = new Datastore({ filename: 'static/database' });

	export default {
		data () {
			return ({
				banks: [],
				gDataEUR: [],
				gDataUSD: [],
				date: [],

			})
		},
		methods: {
			toDate(dateStr) {
				var parts = dateStr.split("-");
				parts[3] = parts[2].split('T')[1].split(':')[0];
				parts[2] = parts[2].split('T')[0];
				return (parts)
			},
			showGraphic () {
				var ctx = document.getElementById("myChart");
				var myChart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: this.date,
						datasets: [{
							label: 'EUR',
							data: this.gDataEUR,
							backgroundColor: [
								'rgba(255, 99, 132, 0)'
							],
							borderColor: [
								'rgba(89,45,255,1)'
							],
							borderWidth: 1
						},{
							label: 'USD',
							data: this.gDataUSD,
							backgroundColor: [
								'rgba(255, 99, 132, 0)'
							],
							borderColor: [
								'rgba(255,99,132,1)',
							],
							borderWidth: 1
						},

						]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero:true
								}
							}]
						}
					}
				});
			},
			updateData () {
				var request = require('request')
				var url = 'http://resources.finance.ua/ru/public/currency-cash.json'
				var data = {};
				var valuta = {};

				function goog(callback) {
					request(url, (error, response, body) => {
						if (!error && response.statusCode == 200) {
							callback(response, body);
						}
					});
				}

				function updateCurrency (valuta, callback) {
					db.loadDatabase(function(err) {
						db.insert(valuta, function(err, docs) {
							if (err) console.error(err);
							callback();
						});
					});
				}

				goog((res, body) => {
					data = JSON.parse(body);

					console.log(data);

					valuta.date = data.date;

					valuta.ask = {
						eur: 0,
						usd: 0
					};
					valuta.bid = {
						...valuta.ask
					};
					for (var i = 0, counter = 0; i < data.organizations.length; i++) {
						if (data.organizations[i].currencies.USD && data.organizations[i].currencies.EUR) {
							valuta.ask.eur += parseFloat(data.organizations[i].currencies.EUR.ask);
							valuta.ask.usd += parseFloat(data.organizations[i].currencies.USD.ask);
							valuta.bid.eur += parseFloat(data.organizations[i].currencies.EUR.bid);
							valuta.bid.usd += parseFloat(data.organizations[i].currencies.USD.bid);
						} else counter++;
					}

					valuta.ask.eur = valuta.ask.eur / (i - counter);
					valuta.ask.usd = valuta.ask.usd / (i - counter);
					valuta.bid.eur = valuta.bid.eur / (i - counter);
					valuta.bid.usd = valuta.bid.usd / (i - counter);

					updateCurrency(valuta, () => {
						var data = [];

						db.find({}).exec((err, docs) => {
							console.log(docs);

							console.log(docs.length);
							for (var i = docs.length - 1; i > 0; i--) {
								if (this.date.length > 0 && this.checkDate(this.date[this.date.length - 1], this.toDate(docs[i].date)) == false)
									continue ;

								this.gDataUSD.push({
									y: docs[i].ask.usd,
									x: this.toDate(docs[i].date)[2]
								});
								this.gDataEUR.push({
									y: docs[i].ask.eur,
									x: this.toDate(docs[i].date)[2]
								});
								var d = this.toDate(docs[i].date);
								this.date.push(`${d[0]}/${d[1]}/${d[2]}`);
							}
							if (this.date.length > 12) {
								this.date.splice(0, 1);
								this.gDataUSD.splice(0, 1);
								this.gDataEUR.splice(0, 1);
							}

							this.showGraphic();
						});
					});
				});

			},
			checkDate (date1, date2) {
				date1 = date1.split('/');

				if (!date2) return (true);
				if (date1[0] > date2[0]) return (false);
				if (date1[1] > date2[1]) return (false);
				if (date1[2] < date2[2]) return (true);
				if (date1[1] == date2[1])return (false);
				return (true);
			}
		},
		mounted () {
			var wrapper = document.getElementById('wrapper');

			wrapper.setAttribute('style', 'opacity: 0');
			setTimeout(()=> {
				wrapper.removeAttribute('style');
			}, 300);

		},
		created: function () {
			this.updateData();

			setInterval(() => {
				this.updateData()
			}, 60000 * 60 * 24)
		}
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

</style>
