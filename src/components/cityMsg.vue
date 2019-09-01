<template>
  <div class="cityMsg">
    <Content :style="{margin: '20px', background: 'f1f1f1'}">
      <div class="search">
        <label>姓名</label>
        <Input v-model="visitorName" style="width: 10%;margin-right:30px"/>
        <label>身份证号</label>
        <Input v-model="idCard" style="width: 10%;margin-right:30px"/>
        <label>电话</label>
        <Input v-model="phone" style="width: 10%"/>
        <Button @click="cleanQuery">清除</Button>
        <Button type="primary" @click="checkData">搜索</Button>
      </div>
      <div class="tableList">
        <div class="tableBtn">
          <div class="tableLeft">
            <el-button type="primary" @click="xiazai">
              <img src="../../static/images/下载.png" alt>
              下载
            </el-button>
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
                  <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard">
                    <el-input v-model.trim="updateform.idCard" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" :label-width="formLabelWidth" prop="visitorName">
                    <el-input v-model="updateform.visitorName" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="updateform.phone" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                    <el-select v-model="updateform.sex" placeholder="性别">
                      <el-option label="男" value="M" key="M"></el-option>
                      <el-option label="女" value="F" key="F"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="updateform.address" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="人脸图像路径" :label-width="formLabelWidth" prop="photoPath">
                    <el-input v-model="updateform.photoPath" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                    <el-input v-model="updateform.remark" autocomplete="off"></el-input>
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
                <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard">
                  <el-input v-model.trim="form.idCard" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="visitorName">
                  <el-input v-model="form.visitorName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                  <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                  <el-select v-model="form.sex" placeholder="性别">
                    <el-option label="男" value="M" key="M"></el-option>
                    <el-option label="女" value="F" key="F"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                  <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="人脸图像路径" :label-width="formLabelWidth" prop="photoPath">
                  <el-input v-model="form.photoPath" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                  <el-input v-model="form.remark" autocomplete="off"></el-input>
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
              <el-table-column label="身份证号" width="200">
                <template slot-scope="scope">{{scope.row.idCard}}</template>
              </el-table-column>
              <el-table-column prop="visitorName" label="姓名"></el-table-column>
              <el-table-column prop="sexName" label="性别" show-overflow-tooltip></el-table-column>
              <el-table-column prop="phone" label="电话" width="200"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
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
      isShowtip: false,
      htmlTitle: "市民信息",
      page: 1,
      pageSize: 7,
      pageCount: 1,
      totalCount: 0,
      idCard: "",
      phone: "",
      visitorName: "",
      currentPage4: 4,
      tableChecked: [],
      centerDialogVisible: false,
      updatedialogFormVisible: false,
      value: "",
      menuList: "",
      dialogFormVisible: false,
      form: {
        idCard: "",
        visitorName: "",
        sex: "",
        phone: "",
        address: "",
        photoPath: "",
        remark: ""
      },
      updateform: {
        id: "",
        idCard: "",
        visitorName: "",
        sex: "",
        phone: "",
        address: "",
        photoPath: "",
        remark: ""
      },
      rules: {
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            min: 1,
            max: 18,
            message: "身份证号长度在1到18个字符",
            trigger: "blur"
          }
        ],
        visitorName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "姓名长度在2到20个字符",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        phone: [
          {
            max: 20,
            message: "电话长度不能超过20个字符",
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
        exportFile(this.tableData3, "visitor", type);
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
    //新增
    remoteNum(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/apil/vas/visitor/add",
              this.$qs.stringify({
                idCard: this.form.idCard,
                visitorName: this.form.visitorName,
                sex: this.form.sex,
                phone: this.form.phone,
                address: this.form.address,
                remark: this.form.remark,
                photoPath: this.form.photoPath
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
    resetForm(formvisitorName) {
      this.$refs[formvisitorName].resetFields();
    },
    // 搜索查询
    checkData(pageNumber) {
      var that = this;
      this.$axios
        .post(
          "/apil/vas/visitor/list",
          this.$qs.stringify({
            idCard: this.idCard,
            visitorName: this.visitorName,
            phone: this.phone,
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
      this.idCard = "";
      this.phone = "";
      this.visitorName = "";
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
          "/apil/vas/visitor/delete",
          this.$qs.stringify({
            ids: ids
          })
        )
        .then(function(res) {
          that.$message(res.data.msg, "error");
          if (res.data.code == 1) {
            that.centerDialogVisible = false;
            that.checkData(that.page);
            that.$message("操作成功", "success");
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
        this.updateform.idCard = this.tableChecked[0].idCard;
        this.updateform.visitorName = this.tableChecked[0].visitorName;
        this.updateform.sex = this.tableChecked[0].sex;
        this.updateform.phone = this.tableChecked[0].phone;
        this.updateform.photoPath = this.tableChecked[0].photoPath;
        this.updateform.remark = this.tableChecked[0].remark;
        this.updateform.address = this.tableChecked[0].address;
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
              "/apil/vas/visitor/update",
              this.$qs.stringify({
                idCard: this.updateform.idCard,
                visitorName: this.updateform.visitorName,
                sex: this.updateform.sex,
                phone: this.updateform.phone,
                address: this.updateform.address,
                remark: this.updateform.remark,
                photoPath: this.updateform.photoPath,
                id: this.updateform.id
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
.cityMsg {
  height: 100%;
}
.search {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid rgb(238, 222, 222);
}
.search label {
  font-size: 15px;
  margin-right: 5px;
}
.search button {
  margin-left: 20px;
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
