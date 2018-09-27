import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/components/layouts/default';
import FullLayout from '@/components/layouts/fullsize';

import HelloWorld from '@/components/HelloWorld';
import Register from '@/pages/admin/register';
import Login from '@/pages/admin/login';
import Customers from '@/pages/users';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'User',
      component: FullLayout,
      children: [
        {
          path: '/user/register',
          component: Register,
        },
        {
          path: '/user/login',
          component: Login,
        }
      ]
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: BaseLayout,
      children: [
        {
          path: '/home',
          component: HelloWorld,
        },
        {
          path: '/users',
          component: Customers,
        }
      ]
    }
  ]
})
