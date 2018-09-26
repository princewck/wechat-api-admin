import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/components/layouts/default';
import FullLayout from '@/components/layouts/fullsize';

import HelloWorld from '@/components/HelloWorld';
import Register from '@/pages/admin/register';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: FullLayout,
      children: [
        {
          path: '/register',
          component: Register,
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
        }
      ]
    }
  ]
})
