<template>
  <div class="home">
    <div class="home-one">
      <div class="busidata">
        <div class="shuxian"></div>
        <div class="shuju">业务数据</div>
      </div>
      <div class="busimsg">
        <div class="busimsg-one">
          <div>
            <img src="../../static/images/首页_11.png" alt>
            <p>已接听</p>
          </div>
          <div class="dataNum">
            <router-link to="/problem">
              <span>{{answerNum}}</span>
            </router-link>
            <label>次</label>
          </div>
        </div>
        <div class="busimsg-two">
          <div>
            <img src="../../static/images/首页_13.png" alt>
            <p>已解决</p>
          </div>
          <div class="dataNum">
            <router-link to="/problem">
              <span>{{resolvedNum}}</span>
            </router-link>
            <label>次</label>
          </div>
        </div>
        <div class="busimsg-three">
          <div>
            <img src="../../static/images/首页_15.png" alt>
            <p>未解决</p>
          </div>
          <div class="dataNum">
            <router-link to="/problem">
              <span>{{unsolvedNum}}</span>
            </router-link>
            <label>次</label>
          </div>
        </div>
      </div>
    </div>
    <div class="home-two">
      <div class="video-one">
        <div class="busidata">
          <div class="shuxian"></div>
          <div class="shuju">常用功能</div>
        </div>
        <div class="funtion-one">
          <div class="imgs">
            <router-link to="/videoManage">
              <img src="../../static/images/首页_24.png" alt>
            </router-link>
          </div>
          <div class="imgs">
            <router-link to="/problem">
              <img src="../../static/images/首页_26.png" alt>
            </router-link>
          </div>
        </div>
      </div>
      <div class="video-two">
        <div class="busidata">
          <div class="shuxian"></div>
          <div class="shuju">当前日期</div>
        </div>
        <div class="funtion-four">
          <div class="funtion-two">{{date |dateformat('HH:mm')}}</div>
          <div class="funtion-three">{{date |dateformat("MM月DD日")}}{{date|dateweek("dddd")}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      answerNum: 0,
      resolvedNum: 0,
      unsolvedNum: 0,
      date: new Date()
    };
  },
  mounted() {
    let _this = this;
    this.timer = setInterval(() => {
      _this.date = new Date();
    }, 1000);
    this.businessNum();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    businessNum() {
      var that = this;
      this.$axios
        .get("/apil/vas/resource/businessNum")
        .then(function(res) {
          if (res.data.code == 1) {
            var num = res.data.msg;
            console.log("businessNum=" + num);

            that.answerNum = num.split(",")[0];
            that.resolvedNum = num.split(",")[1];
            that.unsolvedNum = num.split(",")[2];
          } else {
            that.$message(res.data.msg, "error");
          }
        })
        .catch(function(res) {
          that.$message("操作失败.", "error");
        });
    }
  }
};
</script>
<style scoped>
.home {
  margin: 20px;
  background-color: #f1f1f1;
}
.home-one {
  background-color: #fff;
  margin-bottom: 30px;
}
.busidata {
  border-bottom: 1px solid #e1e1e1;
  padding: 10px 0 10px 30px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.busimsg {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
}
.busimsg-one,
.busimsg-two,
.busimsg-three {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  align-items: center;
}
.busimsg-one p,
.busimsg-two p,
.busimsg-three p {
  text-align: center;
  font-family: "微软雅黑";
  font-size: 18px;
  color: #444444;
}
.dataNum {
  margin-left: 40px;
}
.busimsg-one span {
  font-size: 105px;
  font-family: Arial;
  color: #367fe8;
}
.busimsg-two span {
  font-size: 105px;
  font-family: Arial;
  color: #2fb106;
}
.busimsg-three span {
  font-size: 105px;
  font-family: Arial;
  color: #ff8400;
}
.home-two {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
.video-one,
.video-two {
  background-color: #fff;
}
.video-one {
  width: 70%;
  margin-right: 20px;
}
.video-two {
  flex: 1;
}
.funtion-one {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  padding: 20px 0;
}
.funtion-one img {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
}
.funtion-two {
  text-align: center;
  background-image: url("../../static/images/首页_21.png");
  background-repeat: no-repeat;
  background-size: 80% 100%;
  background-position: center;
  font-size: 100px;
  font-family: Arial;
  color: #666666;
}
.funtion-three {
  margin-top: 20px;
  font-size: 36px;
  font-family: 微软雅黑;
  color: #9999;
  text-align: center;
}
.shuxian {
  float: left;
  width: 5px;
  border-radius: 5px;
  background: blue;
  height: 18px;
}
.shuju {
  margin-left: 10px;
  font-size: 18px;
  font-family: 微软雅黑;
  font-family: #444444;
}
label {
  font-size: 35px;
  font-family: 微软雅黑;
  margin-left: 10px;
  font-family: #444444;
}
.imgs {
  width: 500px;
  height: 195px;
}
</style>
