<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-12 09:16:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-17 09:10:37
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
              添加栏目seo
            </el-button>
            <!--
            <el-button :span="8">批量删除</el-button>
            -->
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <template>
              <el-table :data="news"
                        style="width:100%"
                        stripe>
                <el-table-column prop="addTime"
                                 label="添加时间">
                  <template slot-scope="scope">
                    {{scope.row.addTime| time}}
                  </template>
                </el-table-column>
                <el-table-column prop="seoTitle"
                                 label="标题"></el-table-column>
                <el-table-column prop="seoKeywords"
                                 label="关键字"></el-table-column>
                <el-table-column prop="seoKeywords"
                                 label="栏目描述"></el-table-column>
                <el-table-column prop="seoType"
                                 label="seo表示">
                  <template slot-scope="scope">
                    <el-tag>{{scope.row.seoType | seoType}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="news">
                    <div style="display:flex;">
                      <el-button icon="el-icon-edit"
                                 size="medium"
                                 @click="handleEdit(news.$index,news.row)">编辑</el-button>
                      <el-button type="danger"
                                 size="medium"
                                 icon="el-icon-delete"
                                 @click.native.prevent="handleDelete(news.row.seoId)">删除</el-button>
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
        <el-dialog title="添加新闻"
                   :visible.sync="dialogVisible"
                   width="80%">
          <el-form ref="newsForm"
                   :model="newsForm"
                   enctype="multipart/form-data">

            <el-form-item label="标题"
                          prop="seoTitle">
              <el-input v-model="newsForm.seoTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="关键字"
                          prop="seoKeywords">
              <el-input v-model="newsForm.seoKeywords"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述"
                          prop="seoDescription">
              <el-input v-model="newsForm.seoDescription"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="seo表示"
                          prop="seoType">
              <el-radio-group v-model="newsForm.seoType">
                <div style="display:flex;">
                  <el-radio border
                            v-for="item in seoTypeOptions"
                            :key="item.seoType"
                            :label="item.seoType">{{item.Text}}</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary"
                       @click="submitForm()">确定</el-button>
          </span>
        </el-dialog>
        <!-- 编辑新闻模态框 -->
        <el-dialog title="编辑新闻"
                   :visible.sync="editFormVisible"
                   :close-on-click-modal="false"
                   width="80%">
          <el-form :model="editForm"
                   ref="editForm">
            <el-form-item prop="seoId"></el-form-item>
            <el-form-item label="标题"
                          prop="seoTitle">
              <el-input v-model="editForm.seoTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="关键字"
                          prop="seoKeywords">
              <el-input v-model="editForm.seoKeywords"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述"
                          prop="seoDescription">
              <el-input v-model="editForm.seoDescription"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="seo表示"
                          prop="seoType">
              <el-radio-group v-model="editForm.seoType">
                <div style="display:flex;">
                  <el-radio border
                            v-for="item in seoTypeOptions"
                            :key="item.seoType"
                            :label="item.seoType">{{item.Text}}</el-radio>
                </div>
              </el-radio-group>
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
      news: [],
      img: '',
      imgUrl: '',
      editorOption: {},
      newsForm: {
        seoType: '',
        seoTitle: '',
        seoKeywords: '',
        seoDescription: '',
      },
      // 编辑模态框
      editForm: {
        seoId: '',
        seoType: '',
        seoTitle: '',
        seoKeywords: '',
        seoDescription: '',
      },
      seoTypeOptions: [
        { seoType: 1, Text: '首页' },
        { seoType: 2, Text: '招生简章' },
        { seoType: 3, Text: '行业新闻' },
        { seoType: 4, Text: '护理专业' },
        { seoType: 5, Text: '幼儿教育' },
        { seoType: 6, Text: '高铁专业' },
        { seoType: 7, Text: '剑桥英语' },
        { seoType: 8, Text: '联系我们' },
      ],
      // 分页数据
      page: {
        pageNum: 1,
        total: 0,
        pageSize: 8,
      },
    }
  },
  // 引入头部组件
  components: {
    quillEditor,
    myHeader,
  },
  //   页面初始化需要进行数据渲染
  mounted() {
    this.getNews()
  },
  methods: {
    // 点击添加seo栏目按钮打开模态框
    opendialogVisible() {
      this.dialogVisible = true
    },
    // 获取后台栏目数据
    getNews() {
      this.$axios
        .get('/api1/seo/selectSeo/' + this.page.pageNum)
        .then((res) => {
            console.log(res)
          if (res.data.code === 401) {
            this.$message.error('您已退出登陆，请重新登陆')
            return this.$router.push('/login')
          }
          this.news = res.data.data.list
          this.page.total = res.data.data.total
        })
        .catch((err) => {})
    },
    currentChange(pageNum) {
      this.page.pageNum = pageNum
      this.getNews()
    },
    // 添加栏目seo
    submitForm() {
      //   let vm = this
      // 表单登录之前的预验证
      //   this.$refs[formName].validate((valid) => {
      this.$axios
        .post('/api1/seo/postSeo', this.newsForm)
        .then((res) => {
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.getNews()
        })
        .catch((err) => {})
      //   })
    },

    // 删除操作
    //根据seoId删除新闻
    async handleDelete(seoId) {
      const confirmResult = await this.$confirm(
        '是否删除此条栏目seo？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      // 确认删除则返回字符串 confirm
      // 取消返回 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$axios
        .delete('/api1//seo/deleteSeoById/' + seoId)
        .then((res) => {
          if (this.success == true) {
            return this.$message.error('删除栏目失败')
          }
          this.$message.success('删除栏目成功')
          // 刷新列表
          this.getNews()
        })
    },
    // 编辑按钮
    handleEdit(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      //   this.editForm.index = index
      this.seoId = this.editForm.seoId
      console.log(this.editForm.seoId)
    },
    handleCancel(formName) {
      this.editFormVisible = false
    },
    // 编辑完后点击确认提交数据
    handleUpdate(formName) {
      //   console.log('2222')
      // 定义数据
      let data = {
        seoId: this.editForm.seoId,
        seoTitle: this.editForm.newsTitle,
        seoKeywords: this.editForm.seoKeywords,
        seoDescription: this.editForm.seoDescription,
        seoType: this.editForm.seoType,
      }
      this.$axios
        .post('/api1/seo/putSeoById/', this.editForm)
        .then((res) => {
          this.$message.success('编辑成功')
          this.editFormVisible = false
          this.getNews()
        })
        .catch((err) => {})
    },
  },
  filters: {
    seoType(value) {
      if (value === 1) {
        return '首页'
      } else if (value === 2) {
        return '招生简章'
      } else if (value === 3) {
        return '行业新闻'
      } else if (value === 4) {
        return '护理专业'
      } else if (value === 5) {
        return '幼儿教育'
      } else if (value === 6) {
        return '高铁专业'
      } else if (value === 7) {
        return '剑桥英语'
      } else if (value === 8) {
        return '联系我们'
      }
    },
    time(e) {
      return (e || '').slice(0, 10)
    },
  },
}
</script>
<style scopd>
.el-col-16 {
  display: flex;
}
.content {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.el-table .cell {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.newsContent {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-inline-box;
}
.newsContent img {
  display: none;
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
  margin-right: 0px;
}
</style>
