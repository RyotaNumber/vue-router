import { createRouter, createWebHistory } from 'vue-router'
import Notfound from '@/views/Notfound.vue'
import HomeView from '../views/HomeView.vue'
import AppSample1 from '@/views/AppSample1.vue'
import Table from '@/views/Table.vue'
import Images from '@/views/Images.vue'
import Carousel from '@/views/Carousel.vue'
import Login from '@/views/Login.vue'
import Camera from '@/views/Camera.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'トップページ',
      component: HomeView
    },
    {
      path:"/login",
      name:"ログイン",
      component:Login
    },
    {
      path:"/:notFound(.*)",
      name:" !! ERROR 404 !!",
      component:Notfound
    },
    {
      path: '/about',
      name: 'アバウト',
      component: AppSample1
    },
    {
      path:'/table',
      name:'テーブル',
      component:Table
    },
    {
      path:'/images',
      name:'画像',
      component:Images
    },
    {
      path:'/carousel',
      name:'カルーセル',
      component:Carousel
    },
    {
      path:"/camera",
      name:"カメラ",
      component:Camera
    }
  ]
})

export default router
