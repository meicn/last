import User from './components/user';
import Cate from './components/cate';
import News from './components/news';
import Product from './components/product';

import Home from './components/Home.vue';

export const routes = [
	{ path:'/',component:Home },
	{ path:'/user',component:User }	,
	{ path:'/cate',component:Cate },
	{ path:'/news',component:News }	,
	{ path:'/product',component:Product }		
];