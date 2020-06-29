<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-12 09:16:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-06-28 14:47:02
 -->
<template>
  <div>
    <my-header></my-header>
    <div style="display:flex;">
      <div class="content">
        <el-row>
          <el-col :span="16">
            <el-button @click="opendialogVisible()"
                       icon="el-icon-plus">
              添加课程
            </el-button>
            <!--
            <el-button :span="8">批量删除</el-button>
            -->
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <template>
              <el-table :data="zsjz"
                        style="width:100%"
                        stripe>
                <el-table-column prop="zsjzTitle"
                                 label="课程名称"></el-table-column>
                <el-table-column prop="zsjzSummary"
                                 label="课程摘要"></el-table-column>
                <el-table-column prop="zsjzContent"
                                 label="专业介绍">
                  <!-- <template slot-scope="scope">
                    <div v-html="scope.row.zsjzContent">
                    </div>
                  </template> -->
                </el-table-column>
                <el-table-column prop="zsjzClass"
                                 label="学习课程"></el-table-column>
                <el-table-column prop="zsjzJob"
                                 label="就业方向"></el-table-column>
                <el-table-column prop="enCount"
                                 label="报名人数"></el-table-column>
                <el-table-column prop="endTime"
                                 label="截止日期"></el-table-column>
                <el-table-column prop="zsjzA"
                                 label="左图标"></el-table-column>
                <el-table-column prop="zsjzB"
                                 label="中图标"></el-table-column>
                <el-table-column prop="zsjzC"
                                 label="右图标"></el-table-column>
                <el-table-column label="图片">
                  <template slot-scope="scope">
                    <img :src="scope.row.img"
                         style="width: 100px;height:50px"></template>
                </el-table-column>
                <el-table-column prop="zsjzType"
                                 label="类型">
                  <template slot-scope="scope">
                    <!--三目运算符判断对应新闻类型-->
                    <el-tag>{{scope.row.zsjzType | zsjzType}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="zsjz">
                    <div style="display:block;">
                      <el-button icon="el-icon-edit"
                                 size="medium"
                                 @click="handleEdit(zsjz.$index,zsjz.row)">编辑</el-button>
                      <el-button type="danger"
                                 size="medium"
                                 icon="el-icon-delete"
                                 @click.native.prevent="handleDelete(zsjz.row.zsjzId)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-col>
        </el-row>
        <!-- 分页功能 -->
        <el-pagination background
                       layout="total,prev, pager, next"
                       :total="page.total"
                       :current-page="page.pageNum"
                       :page-size="page.pageSize"
                       @current-change="currentChange">
        </el-pagination>
        <!-- 添加新闻模态框 -->
        <el-dialog title="添加课程"
                   :visible.sync="dialogVisible"
                   width="80%">
          <el-form ref="zsjzForm"
                   :model="zsjzForm"
                   enctype="multipart/form-data">
            <el-form-item label="课程名称"
                          prop="zszjTitle">
              <el-input v-model="zsjzForm.zsjzTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="课程摘要"
                          prop="zsjzSummary">
              <el-input v-model="zsjzForm.zsjzSummary"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="专业介绍"
                          prop="zsjzContent">
              <el-input v-model="zsjzForm.zsjzContent"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学习课程"
                          prop="zsjzClass">
              <el-input v-model="zsjzForm.zsjzClass"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="就业方向"
                          prop="zsjzJob">
              <el-input v-model="zsjzForm.zsjzJob"
                        autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="报名人数"
                          prop="enCount">
              <el-input v-model="zsjzForm.enCount"
                        autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="截止日期"
                          prop="endTime">
              <el-date-picker v-model="zsjzForm.endTime"
                              placeholder="选择截止日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="左图标描述"
                          prop="zsjzA">
              <el-input v-model="zsjzForm.zsjzA"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="中图标描述"
                          prop="zsjzB">
              <el-input v-model="zsjzForm.zsjzB"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="右图标描述"
                          prop="zsjzC">
              <el-input v-model="zsjzForm.zsjzC"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片"
                          prop="file"
                          type="file">
              <el-upload class="avatar-uploader"
                         action="/api/zsjz/postZsjz"
                         :auto-upload="false"
                         ref="upload"
                         :limit="4"
                         :data="zsjzForm"
                         :on-success="handleAvatarUpload"
                         :before-upload="beforeAvatarUpload">
                <img v-if="zsjzForm.imgUrl"
                     :src="zsjzForm.imgUrl"
                     class="avatar">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <!-- <el-upload class="upload-demo"
                         action="/api/zsjz/postZsjz"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :before-remove="beforeRemove"
                         multiple
                         :limit="4"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
                <el-button size="small"
                           type="primary">点击上传</el-button>

              </el-upload> -->
            </el-form-item>
            <el-form-item label="类型"
                          prop="zsjzType">
              <el-radio-group v-model="zsjzForm.zsjzType">
                <div style="display:flex;flex-wrap: wrap;">
                  <el-radio border
                            v-for="item in zsjzTypeOptions"
                            :key="item.zsjzType"
                            :label="item.zsjzType">{{item.Text}}</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary"
                       @click="submitForm('zsjzForm')">确定</el-button>
          </span>
        </el-dialog>
        <!-- 编辑新闻模态框 -->
        <el-dialog title="编辑新闻"
                   :visible.sync="editFormVisible"
                   :close-on-click-modal="false"
                   width="80%">
          <el-form :model="editForm"
                   ref="editForm">
            <el-form-item prop="zsjzId"></el-form-item>
            <el-form-item label="标题"
                          prop="zsjzTitle">
              <el-input v-model="editForm.zsjzTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容"
                          prop="zsjzContent">
              <quill-editor ref="text"
                            v-model="editForm.zsjzContent"
                            class="myQuillEditor"
                            :options="editorOption" />
              <!--
              <el-input v-model="editForm.zsjzContent"
                        autocomplete="off"
                        type="textarea"></el-input>
                -->
            </el-form-item>
            <el-form-item label="图片"
                          prop="file"
                          type="file">
              <el-upload class="avatar-uploader"
                         action="/api/zsjz/update"
                         :auto-upload="false"
                         ref="upload"
                         :data="editForm"
                         :on-success="handleAvatarUpload"
                         :before-upload="beforeAvatarUpload">
                <img v-if="editForm.img"
                     :src="editForm.img"
                     class="avatar">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click.native.prevent="handleCancel('editForm')">取消</el-button>
            <el-button type="primary"
                       @click.native.prevent="handleUpdate('editForm')">更新</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import myHeader from '../../components/header'
export default {
  data() {
    return {
      dialogVisible: false,
      editFormVisible: false,
      zsjz: [],
      img: '',
      imgUrl: '',
      editorOption: {},
      zsjzForm: {
        zsjzTitle: '',
        zsjzContent: '',
        zsjzType: '',
        zsjzA: '',
        zsjzB: '',
        zsjzC: '',
        zsjzJob: '',
        enCount: '',
        zsjzSummary: '',
        endTime: ''
      },
      // 编辑模态框
      editForm: {
        zsjzTitle: '',
        zsjzContent: ''
      },
      zsjzTypeOptions: [
        { zsjzType: 1, Text: '护理专业' },
        { zsjzType: 2, Text: '幼儿教育' },
        { zsjzType: 3, Text: '计算机应用' },
        { zsjzType: 4, Text: '高铁专业' },
        { zsjzType: 5, Text: '航空服务' },
        { zsjzType: 6, Text: '会计' },
        { zsjzType: 7, Text: '汽车维修' },
        { zsjzType: 8, Text: '电子商务' },
        { zsjzType: 9, Text: '电气自动化' },
        { zsjzType: 10, Text: '数控加工' }
      ],
      // 分页数据
      page: {
        pageNum: 1,
        total: 0,
        pageSize: 6
      }
    }
  },
  // 引入头部组件
  components: {
    quillEditor,
    myHeader
  },
  //   页面初始化需要进行数据渲染
  mounted() {
    this.getzsjz()
  },
  methods: {
    // 点击添加新闻按钮打开模态框
    opendialogVisible() {
      this.dialogVisible = true
    },
    // 获取后台新闻数据
    getzsjz() {
      this.$axios
        .get('/api/zsjz/getAllZsjz/' + this.page.pageNum)
        .then(res => {
          if (res.data.uAuth === 'true') {
            this.$message.error('您已退出登陆，请重新登陆')
            return this.$router.push('/login')
          }
          console.log(res.data.data.list)
          this.zsjz = res.data.data.list
          this.page.total = res.data.data.total
        })
        .catch(err => {})
    },
    currentChange(pageNum) {
      this.page.pageNum = pageNum
      this.getzsjz()
    },
    submitForm(formName) {
      let vm = this
      // 表单登录之前的预验证
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          vm.$refs.upload.submit()
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.getzsjz()
        } else {
          return false
        }
      })
    },
    handleAvatarUpload(res, file) {
      this.imgUrl = res.push(this.imgUrl)
      console.log(res)
      console.log(this.imgUrl)
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isLt4M) {
        this.$message.error('上传新闻图片大小不能超过 4MB!')
      }
      return isLt4M
    },
    // 删除操作
    //根据zsjzId删除新闻
    async handleDelete(zsjzId) {
      const confirmResult = await this.$confirm('是否删除此条新闻？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 确认删除则返回字符串 confirm
      // 取消返回 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$axios
        .delete('/api/zsjz/deletezsjzById/' + zsjzId)
        .then(res => {
          if (this.success == true) {
            return this.$message.error('删除用户失败')
          }
          this.$message.success('删除用户成功')
          // 刷新列表
          this.getzsjz()
        })
    },
    // 编辑按钮
    handleEdit(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      this.editForm.index = index
    },
    handleCancel(formName) {
      this.editFormVisible = false
    },
    // 编辑完后点击确认提交数据
    handleUpdate(formName) {
      // 定义数据
      let data = {
        zsjzId: this.editForm.zsjzId,
        zsjzTitle: this.editForm.zsjzTitle,
        zsjzContent: this.editForm.zsjzContent,
        file: this.editForm.file
      }
      let vm = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          vm.$refs.upload.submit()
          this.$message.success('编辑成功')
          this.editFormVisible = false
          this.getzsjz()
        } else {
          return false
        }
      })
    }
  },
  filters: {
    zsjzType(value) {
      if (value === 1) {
        return '护理专业'
      } else if (value === 2) {
        return '幼儿教育'
      } else if (value === 3) {
        return '计算机应用'
      } else if (value === 4) {
        return '高铁专业'
      } else if (value === 5) {
        return '航空服务'
      } else if (value === 6) {
        return '会计'
      } else if (value === 7) {
        return '汽车维修'
      } else if (value === 8) {
        return '电子商务'
      } else if (value === 9) {
        return '电气自动化'
      } else if (value === 10) {
        return '数控加工'
      }
    }
  }
}
</script>
<style scopd>
.el-col-16 {
  display: flex;
}
.content {
  width: 2500px;
  height: 100%;
  margin: 0 auto;
}
.el-table .cell {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.el-dialog__header {
  padding: 10px 20px 0px;
}
.el-dialog__body {
  padding: 10px 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.el-form-item__content {
  line-height: 0px;
  text-align: left;
}
.el-pagination {
  padding: 2px 0px;
  text-align: right;
}
.el-pagination.is-background .btn-next {
  margin: 0px;
}
.el-radio.is-bordered {
  margin-right: 10px;
}
.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0px;
}
</style>
