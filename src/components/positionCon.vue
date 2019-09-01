<template>
  <div class="remote">
    <Content :style="{margin: '20px', background: 'f1f1f1'}">
      <!-- <div class="search">
        <label>ID</label>
        <Input v-model.trim="m_id" style="width: 15%;margin-right:30px" />
        <label>名称</label>
        <Input v-model="deviceName" style="width: 15%" />
        <Button @click="cleanQuery">清除</Button>
        <Button type="primary" @click="checkData">搜索</Button>
      </div>-->
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
                <!-- <el-form-item label="ID" :label-width="formLabelWidth" prop="m_id">
                  <el-input v-model.trim="updateform.m_id" autocomplete="off"></el-input>
                </el-form-item> -->
                <!-- 隐藏id值 -->
                <el-input v-model="updateform.pt_id" v-if="false" />
                <el-form-item label="职位类型" :label-width="formLabelWidth" prop="pt_name">
                  <el-input v-model="updateform.pt_name" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="时间" :label-width="formLabelWidth" prop="w_time">
                  <el-input v-model="updateform.w_time" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="状态" :label-width="formLabelWidth" prop="pt_state">
                  <!-- <el-input v-model="updateform.accessPassword" autocomplete="off"></el-input> -->
                  <el-select v-model="updateform.pt_state" placeholder="请选择状态">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updatedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateNum">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
        <!--增加弹出框-->
        <div class="add">
          <el-dialog title="增加" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
              <!-- <el-form-item label="ID" :label-width="formLabelWidth" prop="m_id">
                <el-input v-model.trim="form.m_id" autocomplete="off"></el-input>
              </el-form-item> -->
              <el-form-item label="职位类型" :label-width="formLabelWidth" prop="deviceName">
                <el-input v-model="form.deviceName" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="时间" :label-width="formLabelWidth" prop="ipAddress">
                <el-input v-model="form.ipAddress" autocomplete="off"></el-input>
              </el-form-item> -->
              <el-form-item label="状态" :label-width="formLabelWidth" prop="accessPassword">
                <!-- <el-input v-model="form.accessPassword" autocomplete="off"></el-input> -->
                <el-select v-model="form.accessPassword" placeholder="请选择状态">
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="禁用" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="remoteNum('form')">确 定</el-button>
            </div>
          </el-dialog>
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
            <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange" :stripe="true" border>
              <el-table-column type="selection" width="150" align="center"></el-table-column>
              <el-table-column label="ID" width="300">
                <template slot-scope="scope">{{ scope.row.pt_id}}</template>
              </el-table-column>
              <el-table-column prop="pt_name" label="职位类型"></el-table-column>
              <el-table-column prop="pt_time" label="时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="pt_state" label="状态"></el-table-column>
            </el-table>
          </div>
          <div class="pageNum">
            <!-- <span class="demonstration">显示总数</span> -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
              :page-sizes="[7, 15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"></el-pagination>
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
        htmlTitle: "远程参数设置",
        isShowtip: false,
        page: 1,
        pageSize: 7,
        pageCount: 1,
        totalCount: 0,
        pt_id: "",
        deviceName: "",
        currentPage4: 4,
        tableChecked: [],
        centerDialogVisible: false,
        updatedialogFormVisible: false,
        value: "",
        menuList: "",
        dialogFormVisible: false,
        form: {
          pt_id: "",
          deviceName: "",
          ipAddress: "",
          accessPassword: ""
        },
        updateform: {
          pt_id: "",
          pt_name: "",
          pt_time: "",
          pt_state: "",
        },
        rules: {
          pt_id: [
            { required: true, message: "ID", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: "ID长度在1到20个字符",
              trigger: "blur"
            }
          ],
          deviceName: [
            { required: true, message: "请输入职位类型", trigger: "blur" }
          ],
          ipAddress: [{ required: true, message: "请输入时间", trigger: "blur" }]
          // accessPassword: [
          //   { required: true, message: "请输入状态", trigger: "blur" }
          // ]
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
    mounted: function () {
      this.checkData(this.page);
    },
    methods: {
      xiazai() {
        this.isShowtip = !this.isShowtip;
      },
      exportDataFile(type) {
        require.ensure([], () => {
          var { exportFile } = require("@/vendor/Export2Excel");
          exportFile(this.tableData3, "device", type);
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
        this.tableChecked = val;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.checkData(this.page);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.checkData(val);
      },
      //新增
      remoteNum(formName) {
        var that = this;
        var deviceName = this.form.deviceName;
        // var ipAddress = this.form.ipAddress;
        var accessPassword = this.form.accessPassword;
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios
              .post(
                "/recruit/positionType/insertOrUpdatePositionType",
                this.$qs.stringify({
                  pt_name: deviceName,
                  pt_state: accessPassword
                })
              )
              .then(function (res) {
                if (res.data.code == 1) {
                  that.dialogFormVisible = false;
                  that.$message("操作成功", "success");
                } else {
                  that.$message(res.data.msg, "error");
                }
                that.checkData(that.page);
                that.resetForm("form");
              })
              .catch(function (res) {
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
        var pt_id = this.pt_id;
        var deviceName = this.deviceName;
        this.$axios
          .post(
            "/recruit/positionType/selectPositionTypeByPage"
          )
          .then(function (res) {
            if (res.data.code == 1) {
              that.tableData3 = res.data.obj.records;
            } else {
              that.$message(res.data.msg, "error");
            }

            that.page = res.data.obj.records.pages;
            that.totalCount = res.data.obj.records.current;
            that.pageCount = res.data.obj.records.pt_time;
            var pt_state;
            // if(res.data.obj.records.w_state = 1){
            //   w_state = "启用";
            // }else{
            //   w_state = "停用";
            // }
          })
          .catch(function (res) {
            that.$message("操作失败.", "error");
          });
      },
      // 清除
      cleanQuery() {
        this.pt_id = "";
        this.deviceName = "";
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
          ids += this.tableChecked[i].pt_id + ",";
        }
        ids = ids.slice(0, ids.length - 1);
        var that = this;
        this.$axios
          .post(
            "/recruit/positionType/deletePositionTypeById",
            this.$qs.stringify({
              ptid: ids
            })
          )
          .then(function (res) {
            //  that.dialogFormVisible = false;
            if (res.data.code == 1) {
              that.centerDialogVisible = false;
              that.$message("操作成功", "success");
            } else {
              that.$message(res.data.msg, "error");
            }
            that.checkData(that.page);
          })
          .catch(function (res) {
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
          // 获取选中的数据
          var pt_id, pt_name, pt_state;
          console.log(this.tableChecked.length)
          for (let i = 0; i < selectedLength; i++) {
            console.log("for" + selectedLength)
            pt_id = this.tableChecked[i].pt_id;
            pt_name = this.tableChecked[i].pt_name;
            pt_state = this.tableChecked[i].pt_state;
          }
          // 赋值
          this.updateform.pt_id = pt_id;
          this.updateform.pt_name = pt_name;
          this.updateform.pt_state = pt_state;
          // 显示弹出层
          this.updatedialogFormVisible = true;
        }
      },
      // 修改
      updateNum() {
        var that = this;
        var pt_id = this.updateform.pt_id;
        var deviceName = this.updateform.pt_name;
        // var ipAddress = this.updateform.ipAddress;
        var accessPassword = this.updateform.pt_state;
        // var id = this.updateform.id;
        console.log(pt_id)
        this.$axios
          .post(
            "/recruit/workPlace/insertOrUpdateWorkPlace",
            this.$qs.stringify({
              pt_id: pt_id,
              pt_name: deviceName,
              pt_state: accessPassword,
            })
          )
          .then(function (res) {
            if (res.data.code == 1) {
              that.updatedialogFormVisible = false;
              that.$message("操作成功", "success");
            } else {
              that.$message(res.data.msg, "error");
            }
            that.checkData(that.page);
          })
          .catch(function (res) {
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
