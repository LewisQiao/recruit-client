
<template>
  <div class="header">
    <div class="log">
      <img src="../../static/images/yccssj_01.png" />
    </div>
    <div class="set">
      <div class="admin">
        <img src="../../static/images/yccssj_04.png" style="vertical-align:middle" />
        Hi，{{$store.state.userinfo.name}}
      </div>
      <div class="shuxian"></div>
      <div class="exit" @click="logout">
        <a href="javascript:void(0);">
          <img src="../../static/images/yccssj_07.png" style="vertical-align:middle" />
          退出
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      var _this = this;
      this.$confirm("确认退出吗？", "提示", {})
        .then(() => {
          this.$axios
            .get("/apil/vas/logout")
            .then(function(res) {
              console.log(
                "用户[" + _this.$store.state.userinfo.name + "]成功退出系统"
              );

              // 清除当前登录用户信息
              sessionStorage.removeItem("userinfo");
              // 跳转到登录页面
              _this.$router.push("/");
            })
            .catch(function(res) {
              console.log(
                "用户[" + _this.$store.state.userinfo.name + "]退出系统发生异常"
              );
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  height: 80px;
}
.header .set {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  line-height: 80px;
}
.set .admin,
.set .exit {
  margin-right: 15px;
  padding-right: 20px;
}
.exit img,
.admin img {
  margin-right: 10px;
}
.admin img {
  width: 45px;
  height: 45px;
}
/* .admin:before {
  content: "";
  width: 1px;
  height: 35px;
  background-color: #000;
  position: absolute;
  left: 92%;
  top: 30px;
} */
.shuxian {
  float: left;
  width: 1px;
  border-radius: 5px;
  background: grey;
  height: 30px;
  margin-right: 30px;
}
</style>


