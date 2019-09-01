<template>
  <div class="xlogin">
    <el-container>
      <el-header style="height:120px">
        <div class="log">
          <!-- <img src="../../static/images/yccssj_01.png" alt /> -->
        </div>
      </el-header>
      <el-main>
        <div class="login">
          <!-- 登录表单 -->
          <h1>招聘后台管理</h1>
          <el-form :model="loginform" status-icon :rules="rules" ref="loginform" label-width="100px"
            class="demo-ruleForm">
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input type="text" v-model="loginform.username" autocomplete="off" style="width: 100%;"
                placeholder="用户名" prefix-icon="icon-aligouwuche" />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input type="password" v-model="loginform.password" style="width: 100%;" placeholder="密码"
                autocomplete="new-password" prefix-icon="icon-alimima" />
            </el-form-item>
            <div class="tip" v-if="isShowTip">
              <img src="../../static/images/提示_03.png" alt />
              <span>{{msg}}</span>
            </div>
            <!-- 登录 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginform')" style="width: 100%;">登录</el-button>
            </el-form-item>
          </el-form>
          <!-- 记住密码 -->
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        checked: false,
        msg: "",
        isShowTip: false,
        //登录表单数据
        loginform: {
          username: "",
          password: ""
        },
        //验证表单数据
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { min: 0, max: 32, message: "长度在 0 到 32 个字符", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 5, max: 40, message: "长度在 6 到 40 个字符", trigger: "blur" }
          ]
        }
      };
    },
    mounted() {
      this.getCookie();
      this.checkedHandle();
    },
    methods: {
      checkedHandle() {
        if (this.loginform.username && this.loginform.password) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      submitForm(formName) {
        var that = this;

        //登录请求
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.loginform.username, this.loginform.password);
            this.$axios
              .post(
                "/apil/admins/adminLogin",
                this.$qs.stringify({
                  m_username: this.loginform.username,
                  m_password: this.loginform.password
                })
              )
              .then(function (res) {
                console.log(res.data);
                if (res.data.code == 1) {
                  //把当前登陆用户信息存入state中
                  that.$store.commit("SAVE_USERINFO", res.data.t);

                  //判断复选框是否被勾选，勾选则调用配置cookie的方法
                  if (that.checked == true) {
                    console.log("checkde=true");
                    //传入账号名，密码和保存天数3个参数
                    that.setCookie(
                      that.loginform.username,
                      that.loginform.password,
                    );
                  } else {
                    console.log("清空cookie");
                    //清空Cookie
                    that.clearCookie();
                  }

                  that.$router.push({ path: "/layout" });
                } else {
                  // that.$message(res.data.msg, "error");
                  that.msg = res.data.msg;
                  that.isShowTip = true;
                }
              })
              .catch(function (e) {
                that.$message("服务错误", "error");
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //设置cookie
      setCookie(c_name, c_pswd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存天数
        //字符串拼接cookie
        window.document.cookie =
          "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie =
          "password" + "=" + c_pswd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split(";"); //显示的格式需要切割一下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split("="); //再次切割
            console.log("arr2=" + arr2);
            //判断查找相应的值
            if (arr2[0] == "username") {
              this.loginform.username = arr2[1].trim(); //保存到保存数据的地方
            } else if (arr2[0].trim() == "password") {
              this.loginform.password = arr2[1].trim();
            }
          }
        }
      },
      //清除cookie
      clearCookie: function () {
        this.setCookie("", "", -1); //修改前面的两个为空 天数为-1就行
      }
    }
  };
</script>
<style scoped>
  .el-header {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .el-main {
    width: 100%;
    height: 600px;
    background-image: url("../../static/images/loginbg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 100px;
    box-sizing: border-box;
  }

  .login {
    width: 400px;
    height: 450px;
    background-color: #ffff;
  }

  .el-form {
    width: 100%;
    padding: 0 70px;
  }

  .el-form-item {
    margin-top: 30px;
  }

  .login h1 {
    padding-top: 20px;
    text-align: center;
    font-size: 30px;
    color: cornflowerblue;
  }

  .tip {
    font-size: 14px;
    margin-left: 100px;
    background-color: pink;
  }

  .tip span {
    color: black;
  }

  .tip img {
    vertical-align: middle;
  }

  .el-footer {
    flex-grow: 1;
  }

  .el-checkbox {
    padding-left: 70px;
  }

  .el-checkbox__label {
    font-size: 30px;
  }
</style>
<style>
  .login .el-form-item__content {
    margin-left: 0 !important;
  }

  .login .el-checkbox__label {
    font-size: 16px;
  }

  .login .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }
</style>