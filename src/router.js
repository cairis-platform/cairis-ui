import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Asset from './views/Asset.vue';
import Assets from './views/Assets.vue';
import AssetModel from './views/AssetModel.vue';
import Attackers from './views/Attackers.vue';
import GoalModel from './views/GoalModel.vue';
import NotFound from './components/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/asset/:assetName',
      name: 'asset',
      component: Asset,
      props: true
    },
    {
      path: '/assets',
      name: 'assets',
      component: Assets
    },
    {
      path: '/assetmodel',
      name: 'assetmodel',
      component: AssetModel
    },
    {
      path: '/attackers',
      name: 'attackers',
      component: Attackers
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/goalmodel',
      name: 'goalmodel',
      component: GoalModel
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
