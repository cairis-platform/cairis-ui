/*  Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

    Authors: Shamal Faily */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AssetView from './views/AssetView.vue';
import Assets from './views/Assets.vue';
import AssetModel from './views/AssetModel.vue';
import Attacker from './views/Attacker.vue';
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
      path: '/asset/:objectName',
      name: 'asset',
      component: AssetView,
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
      path: '/attacker/:objectName',
      name: 'attacker',
      component: Attacker,
      props: true
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
