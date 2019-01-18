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
import AssetModelView from './views/AssetModelView.vue';
import AttackerView from './views/AttackerView.vue';
import Attackers from './views/Attackers.vue';
import Dependencies from './views/Dependencies.vue';
import GoalModelView from './views/GoalModelView.vue';
import Goals from './views/Goals.vue';
import Obstacles from './views/Obstacles.vue';
import Risks from './views/Risks.vue';
import Roles from './views/Roles.vue';
import Threats from './views/Threats.vue';
import UseCases from './views/UseCases.vue';
import Vulnerabilities from './views/Vulnerabilities.vue';
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
      component: AssetModelView
    },
    {
      path: '/attacker/:objectName',
      name: 'attacker',
      component: AttackerView,
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
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/dependencies',
      name: 'dependencies',
      component: Dependencies
    },
    {
      path: '/goalmodel',
      name: 'goalmodel',
      component: GoalModelView
    },
    {
      path: '/goals',
      name: 'goals',
      component: Goals
    },
    {
      path: '/obstacles',
      name: 'obstacles',
      component: Obstacles
    },
    {
      path: '/risks',
      name: 'risks',
      component: Risks
    },
    {
      path: '/roles',
      name: 'roles',
      component: Roles
    },
    {
      path: '/threats',
      name: 'threats',
      component: Threats 
    },
    {
      path: '/usecases',
      name: 'usecases',
      component: UseCases
    },
    {
      path: '/vulnerabilities',
      name: 'vulnerabilities',
      component: Vulnerabilities
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
