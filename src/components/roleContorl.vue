<template>
  <div class="roleCon">
    <Content :style="{margin: '20px', background: 'f1f1f1'}">
      <div class="search">
        <label>角色名</label>
        <Input v-model="roleName" style="width: 15%"/>
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
                  <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
                    <el-input
                      v-model.trim="updateform.roleName"
                      autocomplete="off"
                      placeholder="请输入角色名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="资源权限" :label-width="formLabelWidth" prop="resource">
                    <el-tree
                      :data="resourceTreeData"
                      show-checkbox
                      node-key="id"
                      default-expand-all
                      :default-checked-keys="updateCheckedKeys"
                      :props="{label: 'text'}"
                      ref="tree"
                    ></el-tree>
                  </el-form-item>
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
                <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
                  <el-input v-model.trim="form.roleName" autocomplete="off" placeholder="请输入角色名"></el-input>
                </el-form-item>
                <el-form-item label="资源权限" :label-width="formLabelWidth" prop="resource">
                  <el-tree
                    :data="resourceTreeData"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :props="{label: 'text'}"
                    ref="tree"
                  ></el-tree>
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
              <el-table-column type="selection" width="300" align="center"></el-table-column>
              <el-table-column prop="roleName" label="角色名"></el-table-column>
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
      htmlTitle: "角色管理",
      isShowtip: false,
      page: 1,
      pageSize: 7,
      pageCount: 1,
      totalCount: 0,
      roleName: "",
      currentPage4: 4,
      tableChecked: [],
      centerDialogVisible: false,
      updatedialogFormVisible: false,
      value: "",
      menuList: "",
      dialogFormVisible: false,
      resourceTreeData: [],
      updateCheckedKeys: [],
      form: {
        roleName: "",
        resource: ""
      },
      updateform: {
        roleName: "",
        resource: "",
        id: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          {
            min: 1,
            max: 32,
            message: "角色名长度在1到32个字符",
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
        exportFile(this.tableData3, "role", type);
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
    // 新增准备
    newReady() {
      var that = this;
      this.$axios
        .post("/apil/vas/resource/tree")
        .then(function(res) {
          if (res.data.code == 1) {
            // 权限列表赋值
            that.resourceTreeData = res.data.t;
            // 打开新增窗口
            that.dialogFormVisible = true;
          } else {
            that.$message(res.data.msg, "error");
          }
        })
        .catch(function(res) {
          that.$message("操作失败", "error");
        });
    },
    // 新增
    remoteNum(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var roleName = this.form.roleName;
          var resource = this.$refs.tree.getCheckedKeys();
          console.log("resource=" + resource);
          if (resource[0] == undefined) {
            this.$message("请选择资源权限", "info");
            return false;
          } else {
            resource = resource.join(",");
          }

          this.$axios
            .post(
              "/apil/vas/role/add",
              this.$qs.stringify({
                roleName: roleName,
                resource: resource
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
      var roleName = this.roleName;
      console.log(roleName);
      this.$axios
        .post(
          "/apil/vas/role/list",
          this.$qs.stringify({
            roleName: roleName,
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
      this.roleName = "";
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
          "/apil/vas/role/delete",
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
    // 修改数据准备
    updatedConfirm() {
      var selectedLength = this.tableChecked.length;
      if (selectedLength == 0) {
        this.$message("请选择需要修改的数据", "info");
      } else if (selectedLength > 1) {
        this.$message("只能选择一条数据", "info");
      } else {
        var that = this;
        var id = this.tableChecked[0].id;
        console.log("id=" + id);
        this.$axios
          .post(
            "/apil/vas/resource/tree",
            this.$qs.stringify({
              roleId: id
            })
          )
          .then(function(res) {
            if (res.data.code == 1) {
              // 权限列表赋值
              that.resourceTreeData = res.data.t;
              // 获取已有的权限，设置选中
              var checkedKeys = "";
              for (
                let index = 0;
                index < that.resourceTreeData.length;
                index++
              ) {
                const element = that.resourceTreeData[index].children;
                for (let index1 = 0; index1 < element.length; index1++) {
                  const element1 = element[index1];
                  if (element1.state.selected) {
                    checkedKeys += element1.id + ",";
                  }
                }
              }
              console.log("checkedKeys=" + checkedKeys);
              that.updateCheckedKeys = checkedKeys.split(",");
              // 获取选中的数据 赋值
              that.updateform.id = id;
              that.updateform.roleName = that.tableChecked[0].roleName;
              // 打开新增窗口
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
    updateNum(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var id = this.updateform.id;
          var roleName = this.updateform.roleName;
          var resource = this.$refs.tree.getCheckedKeys();
          console.log("resource=" + resource);
          if (resource[0] == undefined) {
            this.$message("请选择资源权限", "info");
            return false;
          } else {
            resource = resource.join(",");
          }

          this.$axios
            .post(
              "/apil/vas/role/update",
              this.$qs.stringify({
                id: id,
                roleName: roleName,
                resource: resource
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
  margin-left: 30px;
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

