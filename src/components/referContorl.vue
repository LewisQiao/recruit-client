<template>
  <div class="refer">
    <Content :style="{margin: '20px', background: 'f1f1f1'}">
      <!-- <div class="search">
        <label>会话房间号</label>
        <Input v-model="roomId" style="width: 10%;margin-right:30px;"/>
        <label>客服ID</label>
        <Input v-model="staffId" style="width: 10%;margin-right:30px;"/>
        <label>终端设备ID</label>
        <Input v-model="deviceId" style="width: 10%"/>
        <Button @click="cleanQuery">清除</Button>
        <Button type="primary" @click="checkData">搜索</Button>
      </div> -->
      <div class="tableList">
        <div class="tableBtn">
          <div class="tableLeft">
            <Button type="primary" @click="xiazai">
              <img src="../../static/images/下载.png" alt>
              下载
            </Button>
            <Button type="primary" v-print="'.dataList'">
              <img src="../../static/images/打印.png" alt>
              打印
            </Button>
          </div>
          <div class="tableRight">
            <Button type="success" @click="dialogFormVisible = true">
              <img src="../../static/images/新增.png" alt>
              新增
            </Button>
            <Button type="warning" @click="updatedConfirm">
              <img src="../../static/images/修改.png" alt>
              修改
            </Button>
            <Button type="error" @click="deleteConfirm">
              <img src="../../static/images/删除.png" alt>
              删除
            </Button>

            <!-- 弹出删除框 -->
            <div class="delet">
              <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
                <span>确定删除吗？删除之后数据将无法恢复</span>
                <!-- <el-form :model="delform">
                        <el-input v-model="delform.id" v-if="false"/>
                </el-form>-->
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="deletData(tableChecked)">确 定</el-button>
                </span>
              </el-dialog>
            </div>

            <!-- 弹出修改框 -->
            <div class="add">
              <el-dialog title="修改" :visible.sync="updatedialogFormVisible">
                <el-form :model="updateform" :rules="rules" ref="updateform">
                  <el-form-item label="会话房间号" :label-width="formLabelWidth" prop="roomId">
                    <el-input v-model.trim="updateform.roomId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="房间密码" :label-width="formLabelWidth" prop="roomPass">
                    <el-input v-model="updateform.roomPass" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="客服ID" :label-width="formLabelWidth" prop="staffId">
                    <el-input v-model.trim="updateform.staffId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="终端设备ID" :label-width="formLabelWidth" prop="deviceId">
                    <el-input v-model.trim="updateform.deviceId" autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="会话开始时间" :label-width="formLabelWidth" prop="startTime">
                    <el-date-picker
                      v-model="updateform.startTime"
                      type="datetime"
                      placeholder="请选择会话开始时间"
                    ></el-date-picker>
                  </el-form-item> -->
                  <el-form-item label="是否进行转接" :label-width="formLabelWidth">
                    <el-select v-model="updateform.isTransfer" placeholder="请选择是否进行转接">
                      <el-option label="是" value="1" key="1"></el-option>
                      <el-option label="否" value="0" key="0"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- <el-form-item label="会话结束时间" :label-width="formLabelWidth" prop="endTime">
                    <el-date-picker
                      v-model="updateform.endTime"
                      type="datetime"
                      placeholder="请选择会话结束时间"
                    ></el-date-picker>
                  </el-form-item> -->
                  <!-- <el-form-item label="是否进行协助" :label-width="formLabelWidth">
                    <el-select v-model="updateform.isControl" placeholder="请选择是否进行协助">
                      <el-option label="是" value="1" key="1"></el-option>
                      <el-option label="否" value="0" key="0"></el-option>
                    </el-select>
                  </el-form-item> -->
                  <!-- <el-form-item label="关联问题ID" :label-width="formLabelWidth" prop="problemId">
                    <el-input v-model.trim="updateform.problemId" autocomplete="off" type="number"></el-input>
                  </el-form-item>
                  <el-form-item label="市民身份证号" :label-width="formLabelWidth" prop="idCard">
                    <el-input v-model.trim="updateform.idCard" autocomplete="off"></el-input>
                  </el-form-item> -->
                  <!-- 隐藏id值 -->
                  <el-input v-model="updateform.id" v-if="false"/>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="updatedialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateNum('updateform')">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>

          <!--增加弹出框-->
          <div class="add">
            <el-dialog title="增加" :visible.sync="dialogFormVisible">
              <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="会话房间号" :label-width="formLabelWidth" prop="roomId">
                  <el-input v-model.trim="form.roomId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房间密码" :label-width="formLabelWidth" prop="roomPass">
                  <el-input v-model="form.roomPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="客服ID" :label-width="formLabelWidth" prop="staffId">
                  <el-input v-model.trim="form.staffId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="终端设备ID" :label-width="formLabelWidth" prop="deviceId">
                  <el-input v-model.trim="form.deviceId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否进行转接" :label-width="formLabelWidth">
                  <el-select v-model="form.isTransfer" placeholder="请选择是否进行转接">
                    <el-option label="是" value="1" key="1"></el-option>
                    <el-option label="否" value="0" key="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="会话开始时间" :label-width="formLabelWidth" prop="startTime">
                  <!-- <el-input v-model="form.startTime" autocomplete="off" type="datetime"></el-input> -->
                  <el-date-picker v-model="form.startTime" type="datetime" placeholder="请选择会话开始时间"/>
                </el-form-item>
                <el-form-item label="是否进行协助" :label-width="formLabelWidth">
                  <el-select v-model="form.isControl" placeholder="请选择是否进行协助">
                    <el-option label="是" value="1" key="1"></el-option>
                    <el-option label="否" value="0" key="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="会话结束时间" :label-width="formLabelWidth" prop="endTime">
                  <!-- <el-input v-model="form.endTime" autocomplete="off"></el-input> -->
                  <el-date-picker v-model="form.endTime" type="datetime" placeholder="请选择会话结束时间"/>
                </el-form-item>
                <el-form-item label="关联问题ID" :label-width="formLabelWidth" prop="problemId">
                  <el-input v-model.trim="form.problemId" autocomplete="off" type="number"></el-input>
                </el-form-item>
                <el-form-item label="市民身份证号" :label-width="formLabelWidth" prop="idCard">
                  <el-input v-model.trim="form.idCard" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="remoteNum('form')">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>

        <!-- 下载菜单 -->
        <transition name="fade" mode="out-in">
          <div class="tipmenu" v-if="isShowtip">
            <ul>
              <li>
                <span @click="exportDataFile('csv')">CSV</span>
              </li>
              <li>
                <span @click="exportDataFile('xlsx')">Excel</span>
              </li>
              <li>
                <span @click="getPdf();xiazai()">PDF</span>
              </li>
            </ul>
            <div class="out"></div>
            <div class="in"></div>
          </div>
        </transition>

        <!-- list列表 -->
        <div class="row" id="pdfDom" style="background-color:#fff;">
          <div class="dataList">
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :stripe="true"
              border
            >
              <el-table-column type="selection" width="150" align="center"></el-table-column>
              <el-table-column label="会话房间号">
                <template slot-scope="scope">{{ scope.row.roomId}}</template>
              </el-table-column>
              <el-table-column prop="roomPass" label="房间密码"></el-table-column>
              <el-table-column prop="staffId" label="客服ID" show-overflow-tooltip></el-table-column>
              <el-table-column prop="deviceId" label="终端设备ID"></el-table-column>
              <el-table-column prop="startTimeName" label="会话开始时间" width="180"></el-table-column>
              <el-table-column prop="endTimeName" label="会话结束时间" width="180"></el-table-column>
              <el-table-column prop="isTransferName" label="是否进行转接"></el-table-column>
              <el-table-column prop="isControlName" label="是否进行协助"></el-table-column>
              <el-table-column prop="problemId" label="关联问题ID"></el-table-column>
              <el-table-column prop="idCard" label="市民身份证号" width="230"></el-table-column>
            </el-table>
            <div class="pageNum">
              <!-- <span class="demonstration">显示总数</span> -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[7, 15, 30, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      htmlTitle: "会话参数设置",
      isShowtip: false,
      deviceId: "",
      page: 1,
      pageSize: 7,
      pageCount: 1,
      totalCount: 0,
      roomId: "",
      roomPass: "",
      staffId: "",
      currentPage4: 4,
      tableChecked: [],
      centerDialogVisible: false,
      updatedialogFormVisible: false,
      value: "",
      menuList: "",
      dialogFormVisible: false,
      form: {
        roomId: "",
        roomPass: "",
        staffId: "",
        deviceId: "",
        startTime: new Date(),
        endTime: new Date(),
        isTransfer: "",
        isControl: "",
        problemId: "",
        idCard: ""
      },
      updateform: {
        id: "",
        roomId: "",
        roomPass: "",
        staffId: "",
        deviceId: "",
        startTime: "",
        endTime: "",
        isTransfer: "",
        isControl: "",
        problemId: "",
        idCard: ""
      },
      rules: {
        roomId: [
          { required: true, message: "请输会话房间号", trigger: "blur" }
        ],
        roomPass: [
          { required: true, message: "请输入房间密码", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "房间密码长度在1到10个字符",
            trigger: "blur"
          }
        ],
        staffId: [
          { required: true, message: "请输入客服ID", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "客服ID长度在1到12个字符",
            trigger: "blur"
          }
        ],
        deviceId: [
          { required: true, message: "请输入终端设备ID", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "终端设备ID长度在1到20个字符",
            trigger: "blur"
          }
        ],
        idCard: [
          {
            max: 18,
            message: "市民身份证号长度不能超过18个字符",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "120px",
      tableData3: [],
      multipleSelection: []
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  mounted: function() {
    this.checkData(this.page);
  },
  methods: {
    xiazai() {
      this.isShowtip = !this.isShowtip;
    },
    exportDataFile(type) {
      require.ensure([], () => {
        var { exportFile } = require("@/vendor/Export2Excel");
        exportFile(this.tableData3, "room", type);
      });
      this.xiazai();
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange--", val);
      this.tableChecked = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.checkData(this.page);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.checkData(val);
    },
    getTime(date) {
      var date = new Date(date);
      var Y, m, d, H, i, s;
      (Y = date.getFullYear()),
        (m = date.getMonth() + 1),
        (d = date.getDate()),
        (H = date.getHours()),
        (i = date.getMinutes()),
        (s = date.getSeconds());
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (H < 10) {
        H = "0" + H;
      }
      if (i < 10) {
        i = "0" + i;
      }
      if (s < 10) {
        s = "0" + s;
      }
      var t = Y + "-" + m + "-" + d + " " + H + ":" + i + ":" + s;
      return t;
    },
    //新增
    remoteNum(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/apil/vas/room/add",
              this.$qs.stringify({
                roomId: that.form.roomId,
                roomPass: that.form.roomPass,
                staffId: that.form.staffId,
                deviceId: that.form.deviceId,
                problemId: that.form.problemId,
                startDate: that.getTime(that.form.startTime),
                endDate: that.getTime(that.form.endTime),
                isTransfer: that.form.isTransfer,
                isControl: that.form.isControl,
                idCard: that.form.idCard
              })
            )
            .then(function(res) {
              that.$message(res.data.msg, "info");
              if (res.data.code == 1) {
                that.resetForm(formName);
                that.dialogFormVisible = false;
                that.checkData(that.page);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 搜索查询
    checkData(pageNumber) {
      var that = this;
      this.$axios
        .post(
          "/apil/vas/room/list",
          this.$qs.stringify({
            pageNumber: pageNumber,
            pageSize: this.pageSize,
            roomId: this.roomId,
            staffId: this.staffId,
            deviceId: this.deviceId
          })
        )
        .then(function(res) {
          if (res.data.code == 1) {
            console.log(res.data.t);
          } else {
            that.$message(res.data.msg, "error");
          }
          that.page = res.data.t.pageNum;
          that.totalCount = res.data.t.count;
          that.pageCount = res.data.t.pageCount;
          that.tableData3 = res.data.t.list;
        })
        .catch(function(res) {
          that.$message("操作失败.", "error");
        });
    },
    // 清除
    cleanQuery() {
      this.roomId = "";
      this.staffId = "";
      this.deviceId = "";
      this.checkData(this.page);
    },
    deleteConfirm() {
      var selected = this.tableChecked.length;
      if (selected == 0) {
        this.$message("请选择需要删除的数据", "info");
      } else {
        this.centerDialogVisible = true;
      }
    },
    // 批量删除
    deletData() {
      // 遍历出ids
      const length = this.tableChecked.length;
      var ids = "";
      for (let i = 0; i < length; i++) {
        console.log(this.tableChecked[i].id);
        ids += this.tableChecked[i].id + ",";
      }
      console.log(ids);
      var that = this;
      this.$axios
        .post(
          "/apil/vas/room/delete",
          this.$qs.stringify({
            ids: ids
          })
        )
        .then(function(res) {
          that.$message(res.data.msg, "info");
          if (res.data.code == 1) {
            that.centerDialogVisible = false;
            that.checkData(that.page);
          }
        })
        .catch(function(res) {
          that.$message("操作失败", "error");
        });
    },
    updatedConfirm() {
      var selectedLength = this.tableChecked.length;
      if (selectedLength == 0) {
        this.$message("请选择需要修改的数据", "info");
      } else if (selectedLength > 1) {
        this.$message("只能选择一条数据", "info");
      } else {
        // 获取选中的数据 赋值
        this.updateform.id = this.tableChecked[0].id;
        this.updateform.roomId = this.tableChecked[0].roomId;
        this.updateform.roomPass = this.tableChecked[0].roomPass;
        this.updateform.staffId = this.tableChecked[0].staffId;
        this.updateform.deviceId = this.tableChecked[0].deviceId;
        this.updateform.startTime = this.tableChecked[0].startTime;
        this.updateform.endTime = this.tableChecked[0].endTime;
        this.updateform.isTransfer = this.tableChecked[0].isTransfer;
        this.updateform.isControl = this.tableChecked[0].isControl;
        this.updateform.idCard = this.tableChecked[0].idCard;
        this.updateform.problemId = this.tableChecked[0].problemId;
        // 显示弹出层
        this.updatedialogFormVisible = true;
      }
    },
    // 修改
    updateNum(formName) {
      var that = this;
      this.$axios
        .post(
          "/apil/vas/room/update",
          this.$qs.stringify({
            roomId: that.updateform.roomId,
            roomPass: that.updateform.roomPass,
            staffId: that.updateform.staffId,
            deviceId: that.updateform.deviceId,
            problemId: that.updateform.problemId,
            startDate: that.getTime(that.updateform.startTime),
            endDate: that.getTime(that.updateform.endTime),
            isTransfer: that.updateform.isTransfer,
            isControl: that.updateform.isControl,
            idCard: that.updateform.idCard,
            id: that.updateform.id
          })
        )
        .then(function(res) {
          that.$message(res.data.msg, "info");
          if (res.data.code == 1) {
            that.resetForm(formName);
            that.updatedialogFormVisible = false;
            that.checkData(that.page);
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
.search {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid rgb(238, 222, 222);
}
.search button {
  margin-left: 20px;
}
.search label {
  font-size: 15px;
  margin-right: 5px;
}
.tableList .tableBtn {
  padding: 15px 0;
  overflow: hidden;
}
.tableBtn .tableLeft {
  float: left;
}
.tableLeft button {
  margin-left: 20px;
}
.tableRight button {
  margin-right: 20px;
}
.tableBtn .tableRight {
  float: right;
  padding-right: 30px;
}
.pageNum {
  text-align: center;
  background-color: #ffff;
  padding: 25px 0;
}
button {
  font-size: 16px;
}
button img {
  vertical-align: middle;
}
.ivu-menu-submenu-title img {
  vertical-align: middle;
}

element.style {
  margin-top: 15vh;
}
.tipmenu {
  position: absolute;
  z-index: 100;
  width: 160px;
  height: 110px;
  border: 1px solid #387ee8;
  border-radius: 15px;
  background-color: #fff;
  padding: 0 20px;
}
.tipmenu li {
  border-bottom: 1px solid #e1e1e1;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #387ee8;
}
.tipmenu li:last-child {
  border: none;
}
.tipmenu span {
  cursor: pointer;
}
.out,
.in {
  position: absolute;
  width: 0;
  height: 0px;
}
.out {
  border: 25px solid transparent;
  border-bottom-color: #387ee8;
  top: -50px;
  left: 35%;
}
.in {
  border: 25px solid transparent;
  border-bottom-color: #fff;
  top: -50px;
  left: 35%;
}
</style>
