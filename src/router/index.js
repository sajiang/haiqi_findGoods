import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import findGoods from '@/components/findGoods'
import findGoodsOwner from '@/components/findGoodsOwner'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',name: 'index',component: index,redirect: '/findGoods',
      children:[
	      	{path:'/findGoods',component: findGoods},
	      	{path:'/findGoodsOwner',component: findGoodsOwner},
	    ]
    },
    {path:'/personalCenter',name:'personalCenter',component: resolve => require(['@/components/personalCenter'], resolve)},
    {path:'/completePersonalInfo',name:'completePersonalInfo',component: resolve => require(['@/components/completePersonalInfo'], resolve)},
    {path:'/addGoods',name:'addGoods',component: resolve => require(['@/components/addGoods'], resolve)},
    {path:'/companyMainPage/:companyId',name:'companyMainPage',component: resolve => require(['@/components/companyMainPage'], resolve)},
    {path:'/historyCompany/:companyId',name:'historyCompany',component: resolve => require(['@/components/historyCompany'], resolve)},
    {path:'/historyPersonal/:personId',name:'historyPersonal',component: resolve => require(['@/components/historyPersonal'], resolve)},
  ]
})
