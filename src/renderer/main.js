import Vue from 'vue'
import axios from 'axios'
import App from './App'
import store from './store'
import VueRouter 	from 'vue-router'

// adding components
import Index 			from './components/Index'
import Info 			from './components/Info'
import Settings 		from './components/Settings'


// implementation of components
Vue.use(VueRouter)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('index-page', Index);
Vue.component('info-page', Info);
Vue.component('settings-page', Settings);

// routing
const routes = [
	{ path: '/', component: Index },
	{ path: '/info', component: Info },
	{ path: '/settings', component: Settings }
];

const router = new VueRouter({
	routes,
	mode: 'history'
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
