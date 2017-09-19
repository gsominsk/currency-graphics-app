<template>
  	<div id="app">
		<div class="header-menu">
			<div class="logo"><img src="static/logo.png" alt="logo"></div>
			<div class="position"><span>{{position}}</span></div>
		</div>
		<div class="main-menu">
			<ul class="main-menu-list">
				<li class="mm-item" v-on:click="changePosition(positions[0])">
					<router-link to="/" >
						<i class="fa fa-line-chart" aria-hidden="true"></i>
					</router-link>
				</li>
				<li class="mm-item" v-on:click="changePosition(positions[1])">
					<router-link to="/info">
						<i class="fa fa-info-circle" aria-hidden="true"></i>
					</router-link>
				</li>
				<li class="mm-item" v-on:click="changePosition(positions[2])">
					<router-link to="/settings">
						<i class="fa fa-cog" aria-hidden="true"></i>
					</router-link>
				</li>
			</ul>
			<router-view></router-view>
		</div>
  	</div>
</template>

<style>
	@import "../../static/fa/css/font-awesome.css";
	@import "assets/css/style.css";
</style>

<script>

  	export default {
    	name: 'cg',
		data () {
    		return ({
				position: "graphic",
				positions: ['graphic', 'info', 'settings']
			})
		},
		methods: {
    		changePosition (position) {
    			console.log(position);
				this.position = position;
			}
		}
  	}
</script>

<style>
  /* CSS */
</style>
