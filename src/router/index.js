import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/pages/login'
// import layout from '@/pages/layout'
// import index from '@/pages/index'

Vue.use(Router)
const login = r => require.ensure([], () => r(require('@/components/login')), 'login');
const layout = r => require.ensure([], () => r(require('@/components/layout')), 'layout');
const userContorl = r => require.ensure([], () => r(require('@/components/userContorl')), 'userContorl');
const resouContorl = r => require.ensure([], () => r(require('@/components/resouContorl')), 'resouContorl');
const roleContorl = r => require.ensure([], () => r(require('@/components/roleContorl')), 'roleContorl');
const passwContorl = r => require.ensure([], () => r(require('@/components/passwContorl')), 'passwContorl');
const remoteSet = r => require.ensure([], () => r(require('@/components/remoteSet')), 'remoteSet');
const positionCon = r => require.ensure([], () => r(require('@/components/positionCon')), 'positionCon');
const staffMsg = r => require.ensure([], () => r(require('@/components/staffMsg')), 'staffMsg');
const cityMsg = r => require.ensure([], () => r(require('@/components/cityMsg')), 'cityMsg');
const videoContorl = r => require.ensure([], () => r(require('@/components/videoContorl')), 'videoContorl');
const dialContorl = r => require.ensure([], () => r(require('@/components/dialContorl')), 'dialContorl');
const home = r => require.ensure([], () => r(require('@/components/home')), 'home');
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
          // meta: [],
        },
        {
          path: '/user',
          name: 'userContorl',
          component: userContorl,
          // meta: ["系统设置", "用户管理"]
        },
        {
          path: "/resource",
          name: 'resouContorl',
          component: resouContorl,
          // meta: ["系统设置", "资源管理"]
        },
        {
          path: "/role",
          name: 'roleContorl',
          component: roleContorl,
          // meta: ["系统设置", "角色管理"]
        },
        {
          path: "/profile",
          name: 'passwContorl',
          component: passwContorl,
          // meta: ["系统设置", "密码管理"]
        },
        {
          path: "/device",
          name: 'remoteSet',
          component: remoteSet,
          // meta: ["参数设置", "远程参数设置"]
        },
        {
          path: '/room',
          name: 'positionCon',
          component: positionCon,
          // meta: ["参数设置", "会话参数设置"]
        },
        {
          path: '/staff',
          name: 'staffMsg',
          component: staffMsg,
          // meta: ["基础信息", "客服人员信息"]
        },
        {
          path: '/visitor',
          name: 'cityMsg',
          component: cityMsg,
          // meta: ["基础信息", "市民信息"]
        },
        {
          path: "/videoManage",
          name: 'videoContorl',
          component: videoContorl,
          // meta: ["日常业务", "富文本编辑"]
        },
        {
          path: "/problem",
          name: 'dialContorl',
          component: dialContorl,
          // meta: ["日常业务", "咨询问题"]
        }
      ]
    }
  ]
})
