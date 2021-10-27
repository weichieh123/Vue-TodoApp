import Vue from 'vue'
import VueRouter from 'vue-router'
import Named from '../views/Named.vue'
import TaskList from '../views/TaskList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Named',
    component: Named,
    props: true,
  },
  {
    path: '/task-list',
    name: 'TaskList',
    component: TaskList,
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router