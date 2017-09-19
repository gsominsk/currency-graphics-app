import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
	{
	  path: '/',
	  name: 'help',
	  component: require('@/components/Help')
	},
	{
	  path: '/help',
	  name: 'index',
	  component: require('@/components/LandingPage')
	},
    {
      path: '*',
      redirect: '/'
    }
  ]
})
