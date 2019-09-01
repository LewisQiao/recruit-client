<template>
  <div class="staff">
    <Content :style="{margin: '20px', background: 'f1f1f1'}">
      <!-- <div class="search">
        <label>客服ID</label>
        <Input v-model="staffId" style="width: 15%;margin-right:30px;" />
        <label>客服姓名</label>
        <Input v-model="name" style="width: 15%" />
        <Button @click="cleanQuery">清除</Button>
        <Button type="primary" @click="checkData">搜索</Button>
      </div> -->
      <div class="tableList">
        <div class="tableBtn">
          <div class="tableLeft">
            <Button type="primary" @click="xiazai">
              <img src="../../static/images/下载.png" alt />
              下载
            </Button>
            <Button type="primary" v-print="'.dataList'">
              <img src="../../static/images/打印.png" alt />
              打印
            </Button>
          </div>
          <div class="tableRight">
            <Button type="success" @click="dialogFormVisible = true">
              <img src="../../static/images/新增.png" alt />
              新增
            </Button>
            <Button type="warning" @click="updatedConfirm">
              <img src="../../static/images/修改.png" alt />
              修改
            </Button>
            <Button type="error" @click="deleteConfirm">
              <img src="../../static/images/删除.png" alt />
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
                  <el-form-item label="客服ID" :label-width="formLabelWidth" prop="staffId">
                    <el-input v-model.trim="updateform.staffId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="客服姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="updateform.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="关联用户ID" :label-width="formLabelWidth" prop="userId">
                    <el-input v-model.trim="updateform.userId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="客服级别" :label-width="formLabelWidth" prop="level">
                    <el-input v-model="updateform.level" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="IP地址" :label-width="formLabelWidth" prop="ipAddress">
                    <el-input v-model="updateform.ipAddress" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="房间号" :label-width="formLabelWidth" prop="roomId">
                    <el-input v-model="updateform.roomId" autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- 隐藏id值 -->
                  <el-input v-model="updateform.id" v-if="false" />
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
                <el-form-item label="客服ID" :label-width="formLabelWidth" prop="staffId">
                  <el-input v-model.trim="form.staffId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="客服姓名" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="关联用户ID" :label-width="formLabelWidth" prop="userId">
                  <el-input v-model.trim="form.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="客服级别" :label-width="formLabelWidth" prop="level">
                  <el-input v-model="form.level" autocomplete="off" type="number"></el-input>
                </el-form-item>
                <el-form-item label="IP地址" :label-width="formLabelWidth" prop="ipAddress">
                  <el-input v-model="form.ipAddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房间号" :label-width="formLabelWidth" prop="roomId">
                  <el-input v-model="form.roomId" autocomplete="off"></el-input>
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
              <el-table-column label="客服ID">
                <template slot-scope="scope">{{ scope.row.staffId}}</template>
              </el-table-column>
              <el-table-column prop="name" label="客服姓名"></el-table-column>
              <el-table-column prop="userId" label="关联用户ID" show-overflow-tooltip></el-table-column>
              <el-table-column prop="roomId" label="房间号" width="180"></el-table-column>
              <el-table-column prop="level" label="客服级别"></el-table-column>
              <el-table-column prop="ipAddress" label="IP地址"></el-table-column>
              <el-table-column prop="onlineStatusName" label="在线状态"></el-table-column>
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
      htmlTitle: "客服人员信息",
      isShowtip: false,
      page: 1,
      pageSize: 7,
      pageCount: 1,
      totalCount: 0,
      staffId: "",
      name: "",
      currentPage4: 4,
      tableChecked: [],
      centerDialogVisible: false,
      updatedialogFormVisible: false,
      value: "",
      menuList: "",
      dialogFormVisible: false,
      form: {
        staffId: "",
        name: "",
        userId: "",
        roomId: "",
        level: "",
        ipAddress: ""
      },
      updateform: {
        staffId: "",
        name: "",
        userId: "",
        roomId: "",
        level: "",
        ipAddress: "",
        id: ""
      },
      rules: {
        staffId: [
          { required: true, message: "请输入客服ID", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "客服ID长度在1到12个字符",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入客服姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "客服姓名长度在2到20个字符",
            trigger: "blur"
          }
        ],
        userId: [
          { required: true, message: "请输入关联用户ID", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "用户ID长度在1到20个字符",
            trigger: "blur"
          }
        ],
        level: [
          {
            max: 2,
            message: "客服级别不能超过2个字符",
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
    // this.menu();
    this.checkData(this.page);
  },
  methods: {
    xiazai() {
      this.isShowtip = !this.isShowtip;
    },
    exportDataFile(type) {
      require.ensure([], () => {
        var { exportFile } = require("@/vendor/Export2Excel");
        exportFile(this.tableData3, "staff", type);
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
    menu() {
      this.$axios
        .get(
          //  this.$url+"/login",
          "/apil/vas/resource/menu"
        )
        .then(function(res) {
          // that.$message("成功", "success");
          // that.$router.push({ path: "/index" });
          // console.log("res=" + res);
          // console.log("res.data=" + res.data);
          // console.log("res.data.code=" + res.data.code);
          // if (res.data.code == 1) {
          //   that.$router.push({ path: "/index" });
          // } else {
          //   // that.$message(res.data.msg, "error");
          //   that.isShowTip = !that.isShowTip;
          // }
          console.log(res.data.t);
          // this.menuList.push(res.data.t);
          this.menuList = res.data.t;
        })
        .catch(function(e) {
          // that.$message("服务错误", "error");
        });
    },
    //新增
    remoteNum(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/apil/vas/staff/add",
              this.$qs.stringify({
                staffId: this.form.staffId,
                name: this.form.name,
                userId: this.form.userId,
                roomId: this.form.roomId,
                level: this.form.level,
                ipAddress: this.form.ipAddress
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
      var staffId = this.staffId;
      var name = this.name;
      console.log(name);
      console.log(staffId);
      this.$axios
        .post(
          "/apil/vas/staff/list",
          this.$qs.stringify({
            staffId: staffId,
            name: name,
            pageNumber: pageNumber,
            pageSize: this.pageSize
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
      this.staffId = "";
      this.name = "";
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
          "/apil/vas/device/delete",
          this.$qs.stringify({
            ids: ids
          })
        )
        .then(function(res) {
          //  that.dialogFormVisible = false;
          console.log(res);
          if (res.data.code == 1) {
            that.centerDialogVisible = false;
            that.$message("操作成功", "success");
          } else {
            that.$message(res.data.msg, "error");
          }
          that.checkData(that.page);
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
        this.updateform.staffId = this.tableChecked[0].staffId;
        this.updateform.name = this.tableChecked[0].name;
        this.updateform.userId = this.tableChecked[0].userId;
        this.updateform.roomId = this.tableChecked[0].roomId;
        this.updateform.ipAddress = this.tableChecked[0].ipAddress;
        this.updateform.level = this.tableChecked[0].level;
        // 显示弹出层
        this.updatedialogFormVisible = true;
      }
    },
    // 修改
    updateNum(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/apil/vas/staff/update",
              this.$qs.stringify({
                id: this.updateform.id,
                staffId: this.updateform.staffId,
                name: this.updateform.name,
                userId: this.updateform.userId,
                roomId: this.updateform.roomId,
                level: this.updateform.level,
                ipAddress: this.updateform.ipAddress
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
              that.$message("操作失败", "error");
            });
        } else {
          return false;
        }
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

