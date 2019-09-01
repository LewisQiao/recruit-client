<template>
  <div class="passw">
    <Content :style="{margin: '20px', background: 'f1f1f1'}">
      <div class="passwMsg">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm2.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm2.password"
              placeholder="请输入原密码"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="plainPassword">
            <el-input type="password" v-model="ruleForm2.plainPassword" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPlainPassword">
            <el-input
              type="password"
              v-model="ruleForm2.checkPlainPassword"
              autocomplete="off"
              placeholder="请输入确认密码"
            ></el-input>
          </el-form-item>
          <!-- 隐藏id值 -->
          <el-input v-model="ruleForm2.id" v-if="false"/>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        width="30%"
        top="20vh"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <span>
          密码修改成功，请重新登录。
          <br>
          {{time}}秒后将自动跳转到
          <a
            href="javascript:void(0)"
            @click="logout()"
            style="text-decoration: underline"
          >登录页面</a>...
        </span>
      </el-dialog>
    </Content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timerLoginout: null,
      timerCountdown: null,
      time: 5,
      dialogVisible: false,
      ruleForm2: {
        id: this.$store.state.userinfo.id,
        username: this.$store.state.userinfo.name,
        password: "",
        plainPassword: "",
        checkPlainPassword: ""
      },
      rules2: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 6, max: 40, message: "原密码在6到40个字符", trigger: "blur" }
        ],
        plainPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 40,
            message: "新密码长度在6到40个字符",
            trigger: "blur"
          }
        ],
        checkPlainPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            min: 6,
            max: 40,
            message: "确认密码长度在6到40个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var id = this.ruleForm2.id;
          var password = this.ruleForm2.password;
          var plainPassword = this.ruleForm2.plainPassword;
          var checkPlainPassword = this.ruleForm2.checkPlainPassword;
          if (checkPlainPassword !== plainPassword) {
            this.$message("两次输入的密码不一致", "info");
            return false;
          }

          this.$axios
            .post(
              "/apil/vas/profile",
              this.$qs.stringify({
                id: id,
                password: password,
                plainPassword: plainPassword
              })
            )
            .then(function(res) {
              if (res.data.code == 1) {
                that.dialogVisible = true;
                // 密码修改成功，页面倒计时
                that.timerCountdown = setInterval(() => {
                  that.time--;
                }, 1000);
                // 密码修改成功，倒计时结束后进入登录页面
                that.timerLoginout = setInterval(() => {
                  that.logout();
                }, 1000 * that.time);
              } else {
                that.$message(res.data.msg, "info");
              }
            })
            .catch(function(res) {
              that.$message("操作失败", "error");
            });
        } else {
          return false;
        }
      });
    },
    logout() {
      // 清除定时器
      clearInterval(this.timerLoginout);
      clearInterval(this.timerCountdown);

      // 清除用户信息
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * -1); //保存天数
      //字符串拼接cookie
      window.document.cookie =
        "password" + "='';path=/;expires=" + exdate.toGMTString();

      // 跳转到登录页面
      this.$router.push("/");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.passwMsg {
  margin-top: 200px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  align-items: center;
}
.el-form {
  width: 30%;
}
/* .el-button {
  padding: 15px 79px;
} */
</style>