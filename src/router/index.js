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
        //flex布局
        path: '/01project',
        name: '01project',
        component: () => import('@/views/50projects/01project.vue'),
    },
    {
        
        //process进度条
        path: '/02project',
        name: '02project',
        component: () => import('@/views/50projects/02project.vue'),
    },
    {
        
        //transform旋转效果
        path: '/03project',
        name: '03project',
        component: () => import('@/views/50projects/03project.vue'),
    },
    {
        
        //搜索滑动效果
        path: '/04project',
        name: '04project',
        component: () => import('@/views/50projects/04project.vue'),
    },
    {
        
        //transform旋转效果
        path: '/05project',
        name: '05project',
        component: () => import('@/views/50projects/05project.vue'),
    },
    {
        
        //loading效果
        path: '/06project',
        name: '06project',
        component: () => import('@/views/50projects/06project.vue'),
    },
    {
        
        //scroll滑动条添加元素效果
        path: '/07project',
        name: '07project',
        component: () => import('@/views/50projects/07project.vue'),
    },
    {
        
        //Split Landing Page
        path: '/08project',
        name: '08project',
        component: () => import('@/views/50projects/08project.vue'),
    },
    {
        
        //Form Wave
        path: '/09project',
        name: '09project',
        component: () => import('@/views/50projects/09project.vue'),
    },
    {
        
        //projects/faq-collapse
        path: '/10project',
        name: '10project',
        component: () => import('@/views/50projects/10project.vue'),
    },
     {
        
        //projects/Event Keycodes
        path: '/11project',
        name: '11project',
        component: () => import('@/views/50projects/11project.vue'),
    },
    {
        
        //projects/Incrementing Counter
        path: '/12project',
        name: '12project',
        component: () => import('@/views/50projects/12project.vue'),
    },
    {
        
        //projects/Drink Water
        path: '/13project',
        name: '13project',
        component: () => import('@/views/50projects/13project.vue'),
    },
    {
        
        //projects/Background Slider
        path: '/14project',
        name: '14project',
        component: () => import('@/views/50projects/14project.vue'),
    },
    {
        
        //projects/theme-clock
        path: '/15project',
        name: '15project',
        component: () => import('@/views/50projects/15project.vue'),
    },
    {
        
        //projects/drawing-app
        path: '/16project',
        name: '16project',
        component: () => import('@/views/50projects/16project.vue'),
    },
    {
        
        //projects/kinetic-loader
        path: '/17project',
        name: '17project',
        component: () => import('@/views/50projects/17project.vue'),
    },
    {
        
        //projects/sticky-navigation
        path: '/18project',
        name: '18project',
        component: () => import('@/views/50projects/18project.vue'),
    },
    {
        
        //projects/sticky-navigation
        path: '/19project',
        name: '19project',
        component: () => import('@/views/50projects/19project.vue'),
    },
    {
        
        //projects/Toast Notification
        path: '/20project',
        name: '20project',
        component: () => import('@/views/50projects/20project.vue'),
    },
    {
        
        //projects/Github Profiles
        path: '/21project',
        name: '21project',
        component: () => import('@/views/50projects/21project.vue'),
    },
    {
        
        //projects/double-click-heart 
        path: '/22project',
        name: '22project',
        component: () => import('@/views/50projects/22project.vue'),
    },
    {
        
        //projects/auto-text-effect 
        path: '/23project',
        name: '23project',
        component: () => import('@/views/50projects/23project.vue'),
    },
    {
        
        //projects/password-generator  
        path: '/24project',
        name: '24project',
        component: () => import('@/views/50projects/24project.vue'),
    },
    {
        
        //projects/Good Cheap Fast
        path: '/25project',
        name: '25project',
        component: () => import('@/views/50projects/25project.vue'),
    },
    {
        
        //projects/Notes App
        path: '/26project',
        name: '26project',
        component: () => import('@/views/50projects/26project.vue'),
    },
    {
        
        //projects/animated-countdown
        path: '/27project',
        name: '27project',
        component: () => import('@/views/50projects/27project.vue'),
    },
    {
        
        //projects/Image Carousel
        path: '/28project',
        name: '28project',
        component: () => import('@/views/50projects/28project.vue'),
    },
    {
        
        //projects/Hoverboard
        path: '/29project',
        name: '29project',
        component: () => import('@/views/50projects/29project.vue'),
    },
    {
        
        //projects/pokedex
        path: '/30project',
        name: '30project',
        component: () => import('@/views/50projects/30project.vue'),
    },
    {
        
        //projects/mobile-tab-navigation
        path: '/31project',
        name: '31project',
        component: () => import('@/views/50projects/31project.vue'),
    },
    {
        
        //projects/3d-background-boxes
        path: '/32project',
        name: '32project',
        component: () => import('@/views/50projects/32project.vue'),
    },
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
