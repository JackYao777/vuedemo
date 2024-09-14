// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
// import language from '@/views/language.vue';
//解决重定向报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

let routesData = [
    {
        path: '/language',
        name: 'language',
        component: () => import('@/views/language.vue'),
    },
    {
        path: '/vedioType',
        name: 'vedioType',
        component: () => import('@/views/vedioType.vue'),
    },
    {
        path: '/dpVideoType',
        name: 'dpVideoType',
        component: () => import('@/views/dpVideoType.vue'),
    },
    {
        path: '/videoType',
        name: 'videoType',
        component: () => import('@/views/videoType.vue'),
    },
    {
        path: '/ceshi',
        name: 'ceshi',
        component: () => import('@/views/ceshi.vue'),
    },
    {
        path: '/layoutsp',
        name: 'layoutsp',
        component: () => import('@/views/layoutsp.vue'),
    },
    {
        path: '/ulDemo',
        name: 'ulDemo',
        component: () => import('@/views/ulDemo.vue'),
    },
    {
        path: '/01project',
        name: '01project',
        component: () => import('@/views/50projects/01project.vue'),
    }
    
   
];
//创建并暴露一个路由器
const router = new VueRouter({
    mode: 'hash',
    routes: routesData
});

router.beforeEach(async (to, from, next) => {
    next();
});

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
    document.title = to.meta.title || '后台系统'
})

export default router;
