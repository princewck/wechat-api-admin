import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/components/layouts/default';
import FullLayout from '@/components/layouts/fullsize';

import HelloWorld from '@/components/HelloWorld';
import Register from '@/pages/admin/register';
import Login from '@/pages/admin/login';
import Customers from '@/pages/users';

import WishCategory from '@/pages/wish/WishCategory';
import WishThread from '@/pages/wish/WishThread';
import ThreadEdit from '@/pages/wish/edit';


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
        },
        {
          path: '/wish/categroy',
          component: WishCategory,
        },
        {
          path: '/wish/thread',
          component: WishThread,
        },
        {
          path: '/wish/thread/:id/edit',
          component: ThreadEdit,
        }
      ]
    }
  ]
})
