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

import AssetsList from '@/pages/assets';

import WorkProductCategory from '@/pages/work_product/category';
import WorkProduct from '@/pages/work_product/product';
import WorkProductEdit from '@/pages/work_product/edit';

import XPKList from '@/pages/alimama/xpkList';
import XPKDetail from '@/pages/alimama/xpkDetail';
import Categories from '@/pages/alimama/categories';
import Products from '@/pages/alimama/products';

import SelfMediaList from '@/pages/selfmedia/index';
import SelfMediaDetail from '@/pages/selfmedia/detail';
import SelfMediaEdit from '@/pages/selfmedia/edit';
import SelfMediaAccounts from '@/pages/selfmedia/accounts';


Vue.use(Router)

export default new Router({
  mode: 'history',
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
        },
        {
          path: '/assets',
          component: AssetsList,
        },
        {
          path: '/work_product/categroy',
          component: WorkProductCategory,
        },        
        {
          path: '/work_product/product',
          component: WorkProduct,
        },        
        {
          path: '/work_product/product/:id/edit',
          component: WorkProductEdit,
        },  
        {
          path: '/alimama/xpk',
          component: XPKList,
        },
        {
          path: '/alimama/xpk/:id',
          component: XPKDetail,
        },
        {
          path: '/tbk/categories',
          component: Categories,
        },
        {
          path: '/tbk/products/:category',
          component: Products,
        },
        {
          path: '/selfmedia/list',
          component: SelfMediaList,
        },
        {
          path: '/selfmedia/accounts',
          component: SelfMediaAccounts,
        },
        {
          path: '/selfmedia/:id/view',
          component: SelfMediaDetail,
        },
        {
          path: '/selfmedia/:id/edit',
          component: SelfMediaEdit,
        },
      ]
    }
  ]
})
