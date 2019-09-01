<template>
  <div class="userCon">
    <Content :style="{margin: '20px', background: 'f1f1f1'}">
      <div class="search">
        <label>登录名</label>
        <Input v-model.trim="loginName" style="width: 15%;margin-right:30px"/>
        <label>姓名</label>
        <Input v-model="name" style="width: 15%"/>
        <Button @click="cleanQuery">清除</Button>
        <Button type="primary" @click="checkData">搜索</Button>
      </div>
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
            <Button type="success" @click="newReady">
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
          </div>

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
                <el-form-item label="登录名" :label-width="formLabelWidth" prop="loginName">
                  <el-input v-model.trim="updateform.loginName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 隐藏id值 -->
                <el-input v-model="updateform.id" v-if="false"/>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="updateform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input
                    v-model="updateform.plainPassword"
                    autocomplete="off"
                    placeholder="不修改密码请留空"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
                  <el-select v-model="updateform.roleId" placeholder="请选择角色">
                    <el-option
                      v-for="item in roleData"
                      :key="item.id"
                      :label="item.roleName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
                  <el-input v-model.trim="updateform.mobile" autocomplete="off" type="number"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                  <el-select v-model="updateform.status" placeholder="请选择状态">
                    <el-option label="正常" value="0" key="0"></el-option>
                    <el-option label="禁用" value="1" key="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                  <el-input v-model="updateform.email" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updatedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateNum">确 定</el-button>
              </div>
            </el-dialog>
          </div>

          <!--增加弹出框-->
          <div class="add">
            <el-dialog title="增加" :visible.sync="dialogFormVisible">
              <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="登录名" :label-width="formLabelWidth" prop="loginName">
                  <el-input v-model.trim="form.loginName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" autocomplete="new-password"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="plainPassword">
                  <el-input
                    v-model="form.plainPassword"
                    autocomplete="new-password"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
                  <el-select v-model="form.roleId" placeholder="请选择角色">
                    <el-option
                      v-for="item in roleData"
                      :key="item.id"
                      :label="item.roleName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
                  <el-input v-model.trim="form.mobile" autocomplete="off" type="number"></el-input>
                </el-form-item>
                <el-input v-model="form.id" v-if="false"/>
                <el-input v-model="form.plainPassword" v-if="false"/>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                  <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-select v-model="form.status" placeholder="请选择状态">
                    <el-option label="正常" value="0" key="0"></el-option>
                    <el-option label="禁用" value="1" key="1"></el-option>
                  </el-select>
                </el-form-item>-->
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
              <el-table-column label="登录名">
                <template slot-scope="scope">{{ scope.row.loginName}}</template>
              </el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="mobile" label="手机" show-overflow-tooltip></el-table-column>
              <el-table-column prop="email" label="邮箱"></el-table-column>
              <el-table-column prop="roleName" label="角色"></el-table-column>
              <el-table-column prop="statusName" label="状态"></el-table-column>
              <!-- 隐藏列 -->
              <el-table-column prop="id" label="id" v-if="false"></el-table-column>
              <el-table-column prop="role.id" label="role.id" v-if="false"></el-table-column>
              <el-table-column prop="status" label="status" v-if="false"></el-table-column>
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
      htmlTitle: "用户管理",
      isShowtip: false,
      page: 1,
      pageSize: 7,
      pageCount: 1,
      totalCount: 0,
      loginName: "",
      name: "",
      mobile: "",
      email: "",
      "role.roleName": "",
      status: "",
      currentPage4: 4,
      tableChecked: [],
      centerDialogVisible: false,
      updatedialogFormVisible: false,
      value: "",
      menuList: "",
      dialogFormVisible: false,
      form: {
        loginName: "",
        name: "",
        mobile: "",
        email: "",
        plainPassword: "",
        roleId: ""
      },
      updateform: {
        id: "",
        loginName: "",
        name: "",
        mobile: "",
        email: "",
        plainPassword: "",
        roleId: "",
        status: ""
      },
      rules: {
        loginName: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            min: 1,
            max: 32,
            message: "登录名长度在1到32个字符",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 32,
            message: "姓名长度在2到32个字符",
            trigger: "blur"
          }
        ],
        plainPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 40,
            message: "密码长度在6到40个字符",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            min: 11,
            max: 11,
            message: "手机长度必须为11个字符",
            trigger: "blur"
          }
        ],
        email: [
          {
            min: 6,
            max: 32,
            message: "邮箱长度必须在6到32个字符",
            trigger: "blur"
          }
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      tableData3: [],
      roleData: [],
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
        exportFile(this.tableData3, "user", type);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 搜索查询
    checkData(pageNumber) {
      var that = this;
      var loginName = this.loginName;
      var name = this.name;
      console.log(name);
      console.log(loginName);
      this.$axios
        .post(
          "/apil/vas/user/list",
          this.$qs.stringify({
            loginName: loginName,
            name: name,
            pageNumber: pageNumber,
            pageSize: this.pageSize
          })
        )
        .then(function(res) {
          if (res.data.code == 1) {
            console.log(res.data.t.list);
          } else {
            that.$message(res.data.msg, "error");
          }

          that.page = res.data.t.pageNum;
          that.totalCount = res.data.t.count;
          that.pageCount = res.data.t.pageCount;
          that.tableData3 = res.data.t.list;
          console.log(res.data.t.pageNum);
          console.log(res.data.t.count);
          console.log(res.data.t.pageCount);
        })
        .catch(function(res) {
          that.$message("操作失败.", "error");
        });
    },
    // 新增数据准备
    newReady() {
      var that = this;
      this.$axios
        .get("/apil/vas/role/allrole")
        .then(function(res) {
          if (res.data.code == 1) {
            that.roleData = res.data.t;
            that.dialogFormVisible = true;
          } else {
            that.$message(res.data.msg, "error");
          }
        })
        .catch(function(res) {
          that.$message("操作失败", "error");
        });
    },
    //新增
    remoteNum(formName) {
      var that = this;

      var loginName = this.form.loginName;
      var name = this.form.name;
      var plainPassword = this.form.plainPassword;
      var roleId = this.form.roleId;
      var mobile = this.form.mobile;
      var email = this.form.email;

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/apil/vas/user/add",
              this.$qs.stringify({
                loginName: loginName,
                name: name,
                mobile: mobile,
                email: email,
                plainPassword: plainPassword,
                "role.id": roleId
              })
            )
            .then(function(res) {
              if (res.data.code == 1) {
                that.dialogFormVisible = false;
                that.$message(res.data.msg, "success");
              } else {
                that.$message(res.data.msg, "error");
              }

              that.checkData(that.page);
              that.resetForm(formName);
            })
            .catch(function(res) {
              that.$message("操作失败", "error");
            });
        } else {
          return false;
        }
      });
    },
    // 删除确认
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
          "/apil/vas/user/delete",
          this.$qs.stringify({
            ids: ids
          })
        )
        .then(function(res) {
          //  that.dialogFormVisible = false;
          console.log(res);
          if (res.data.code == 1) {
            that.centerDialogVisible = false;
            that.$message(res.data.msg, "success");
          } else {
            that.$message(res.data.msg, "error");
          }
          that.checkData(that.page);
        })
        .catch(function(res) {
          that.$message("操作失败", "error");
        });
    },
    // 修改数据准备
    updatedConfirm() {
      var that = this;
      var selectedLength = this.tableChecked.length;
      if (selectedLength == 0) {
        this.$message("请选择需要修改的数据", "info");
      } else if (selectedLength > 1) {
        this.$message("只能选择一条数据", "info");
      } else {
        // 获取角色列表
        this.$axios
          .get("/apil/vas/role/allrole")
          .then(function(res) {
            if (res.data.code == 1) {
              that.roleData = res.data.t;

              // 获取选中的数据
              var id, loginName, name, mobile, email, roleId, status;
              for (let i = 0; i < selectedLength; i++) {
                id = that.tableChecked[i].id;
                loginName = that.tableChecked[i].loginName;
                name = that.tableChecked[i].name;
                mobile = that.tableChecked[i].mobile;
                email = that.tableChecked[i].email;
                roleId = that.tableChecked[i].role.id;
                status = that.tableChecked[i].status;
              }
              // 赋值
              that.updateform.id = id;
              that.updateform.loginName = loginName;
              that.updateform.name = name;
              that.updateform.mobile = mobile;
              that.updateform.email = email;
              that.updateform.roleId = roleId;
              that.updateform.status = status;
              // 显示弹出层
              that.updatedialogFormVisible = true;
            } else {
              that.$message(res.data.msg, "error");
            }
          })
          .catch(function(res) {
            that.$message("操作失败", "error");
          });
      }
    },
    // 修改
    updateNum() {
      var that = this;
      var loginName = this.updateform.loginName;
      var name = this.updateform.name;
      var mobile = this.updateform.mobile;
      var email = this.updateform.email;
      var id = this.updateform.id;
      var status = this.updateform.status;
      var plainPassword = this.updateform.plainPassword;
      var roleId = this.updateform.roleId;
      this.$axios
        .post(
          "/apil/vas/user/update",
          this.$qs.stringify({
            loginName: loginName,
            name: name,
            mobile: mobile,
            email: email,
            status: status,
            plainPassword: plainPassword,
            "role.id": roleId,
            id: id
          })
        )
        .then(function(res) {
          that.$message(res.data.msg, "info");
          if (res.data.code == 1) {
            that.updatedialogFormVisible = false;
          }
          that.checkData(that.page);
        })
        .catch(function(res) {
          that.$message("操作失败.", "error");
        });
    },
    // 清除搜索项
    cleanQuery() {
      this.loginName = "";
      this.name = "";
      this.checkData(this.page);
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
