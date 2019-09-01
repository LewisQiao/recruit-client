<template>
  <el-container>
    <el-header style="height:80px">
      <common-header></common-header>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- <el-menu :router="true" :unique-opened="true">
          <el-menu-item index="/layout">
            <template slot="title">
              <i class="el-icon-menu"></i>首页
            </template>
          </el-menu-item>
          <el-submenu v-for="child1 in menulist" :key="child1.id" :index="child1.text">
            <template slot="title">
              <i :class="child1.icon"></i>
              {{child1.text}}
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="child2 in child1.children" :key="child2.id" :index="child2.url">
                <i :class="child2.icon"></i>
                {{child2.text}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
          <el-menu-item
            v-for="menu in menus"
            :index="menu.route"
            :key="menu.route"
            v-if="!menu.children"
          >
            <i class="el-icon-menu"></i>
            {{menu.name}}
          </el-menu-item>
          <el-submenu
            v-for="menu in menus"
            :index="menu.route"
            :key="menu.route"
            v-if="menu.children"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              {{menu.name}}
            </template>
            <el-menu-item :index="item.route" v-for="item in menu.children" :key="item.route">
              <i class="el-icon-location"></i>
              {{item.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="padding:10px">
        <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/layout'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>-->
        <!-- 路由出口 -->
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import commonHeader from "../components/commonHeader.vue";
export default {
  data() {
    return {
      menulist: [],
      menus: [
        { route: "/home", name: "首页", children: false },
        { route: "/device", name: "工作地点", children: false },
        { route: "/room", name: "招聘类型", children: false },
        { route: "/staff", name: "职位管理", children: false },
        { route: "/videoManage", name: "富文本编辑", children: false },
        { route: "/visitor", name: "投递管理", children: false },
        { route: "/problem", name: "求职者管理", children: false },
        { route: "/resource", name: "管理员管理", children: false }
      ]
      // isCollapse:''
    };
  },
  components: {
    commonHeader
  },
  mounted: function() {
    this.menu();
  },
  methods: {
    menu() {
      var that = this;
      this.$axios
        .get("/apil/vas/resource/menu")
        .then(function(res) {
          console.log(res.data.t);
          that.menulist = res.data.t;
        })
        .catch(function(e) {
          // that.$message("服务错误", "error");
        });
    }
  }
};
</script>
<style>
html,
body,
#app {
  height: 100%;
}
.el-container {
  height: 100%;
  overflow: hidden !important;
}
.el-menu {
  /* background-color: #d3dce6; */
  background-color: rgb(238, 241, 246);
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
}
.el-breadcrumb {
  padding-left: 20px;
  font-size: 15px;
}
.add .el-dialog__footer {
  text-align: center;
}
/* .add .el-dialog{
  width:30%;
} */
.add .el-dialog__header {
  border-bottom: 1px solid #000;
}
.add .el-form {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.dataList {
  min-height: 300px;
  width: 100%;
}
/* .add .el-form-item label::after {
  content: "";
  display: inline-block;
  width: 100%;
}
.add .el-form-item__label {
  text-align: justify;
}
.add .el-form-item .is-required .el-form-item__label::before {
  content: none !important;
} */
.add .el-input {
  width: 200px;
}
.add .el-textarea {
  width: 200px;
}
</style>

