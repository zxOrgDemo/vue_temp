import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'
import smart from '@/views/smart'
import policySearch from '@/views/policySearch'
import policyReg from '@/views/policyReg'
import policyFocus from '@/views/policyFocus'
import todayApply from '@/views/todayApply'

const baseRouter = [
    {
        path: '/',
        name: 'home',
        // component: () => import(/* webpackChunkName: "home" */ '@/views/home')
        component: home
    },
    {
        path: '/smart',
        name: 'smart',
        // component: () => import(/* webpackChunkName: "smart" */ '@/views/smart')    
        component: smart
    },
    // {
    //     path: '/smart/detail',
    //     name: 'sdetail',
    //     component: () => import(/* webpackChunkName: "sdetail" */ '@/views/smart/sdetail')    
    // },
    {
        path: '/policySearch',
        name: 'policySearch',
        // component: () => import(/* webpackChunkName: "policySearch" */ '@/views/policySearch')    
        component: policySearch
    },
    {
        path: '/policySearch/detail',
        name: 'pdetail',
        component: () => import(/* webpackChunkName: "pdetail" */ '@/views/policySearch/detail')    
    },
    {
        path: '/policyReg',
        name: 'policyReg',
        // component: () => import(/* webpackChunkName: "policyReg" */ '@/views/policyReg')    
        component: policyReg
    },
    {
        path: '/policyReg/detail',
        name: 'regdetail',
        component: () => import(/* webpackChunkName: "policyReg" */ '@/views/policyReg/detail')    
    },
    {
        path: '/policyImg',
        name: 'policyImg',
        component: () => import(/* webpackChunkName: "policyImg" */ '@/views/policyImg')    
    },
    {
        path: '/policyFocus',
        name: 'policyFocus',
        // component: () => import(/* webpackChunkName: "policyFocus" */ '@/views/policyFocus')    
        component: policyFocus
    },
    {
        path: '/todayApply',
        name: 'todayApply',
        // component: () => import(/* webpackChunkName: "todayApply" */ '@/views/todayApply')    
        component: todayApply
    },

    {
        path: '*',
        name: '404',
        component: {
            render() {
                let style = {
                    paddingTop: '150px',
                    textAlign: 'center'
                }
                return (
                    <div {...{style}} >
                        <h1 >404 NOT FOUND</h1>
                        <a href='/#/'>点击返回</a>
                    </div>
                )
            }
        }   
    } 

]

Vue.use(VueRouter)
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(loaction) {
    return originPush.call(this, loaction).catch(err => ([err]))
}


const router =  new VueRouter({
    routes: [
        ...baseRouter
    ],
    scrollBehavior () {
        return { x: 0, y: 0}
    }
})
router.beforeEach((to, from, next) => {
    
    //  console.log(to.path)
    //  if(!token) {
    //     if(whiteList.includes(to.path)) {
    //         next()
    //     } else {
    //         if(from.path == '/login') {
    //             next({
    //                 path: '/login',
    //                 query: {
    //                     redirect: encodeURI(to.path)
    //                 },
    //                 replace: true
    //             })
    //             location.reload()
    //             return
    //         }
    //         next({
    //             path: '/login',
    //             query: {
    //                 redirect: encodeURI(to.path),
    //                 ...to.query
    //             }
    //         })
    //     }
    //  }  else {
         next()
    //  }  
})



export default router