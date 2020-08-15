<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-12 09:16:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-15 11:07:27
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
              添加新闻
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
                <el-table-column prop="addtime"
                                 label="添加时间"></el-table-column>
                <el-table-column prop="newsTitle"
                                 label="标题"></el-table-column>
                <el-table-column prop="seoTitle"
                                 label="seo标题"></el-table-column>
                <el-table-column prop="seoKeywords"
                                 label="seo关键字"></el-table-column>
                <el-table-column prop="seoDescription"
                                 label="seo描述"></el-table-column>
                <el-table-column prop="readCount"
                                 label="阅读次数"></el-table-column>
                <el-table-column prop="newsContent"
                                 label="内容">
                  <template slot-scope="scope">
                    <!--v-html:将后端返回的带标签的内容解析成html页面形式的内容-->
                    <div v-html="scope.row.newsContent"
                         class="newsContent">
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="图片">
                  <template slot-scope="scope">
                    <img :src="scope.row.img"
                         style="width: 100px;height:50px"></template>
                </el-table-column>
                <el-table-column prop="newsScource"
                                 label="新闻来源">
                  <template slot-scope="scope">
                    <!--三目运算符判断对应新闻类型-->
                    <el-tag>{{scope.row.newsScource}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="newsType"
                                 label="新闻类型">
                  <template slot-scope="scope">
                    <!--三目运算符判断对应新闻类型-->
                    <el-tag>{{scope.row.newsType | newsType}}</el-tag>
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
                                 @click.native.prevent="handleDelete(news.row.newsId)">删除</el-button>
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
                          prop="newsTitle">
              <el-input v-model="newsForm.newsTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="seo标题"
                          prop="seoTitle">
              <el-input v-model="newsForm.seoTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="seo关键字"
                          prop="seoKeywords">
              <el-input v-model="newsForm.seoKeywords"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="seo描述"
                          prop="seoDescription">
              <el-input v-model="newsForm.seoDescription"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="阅读次数"
                          prop="readCount">
              <el-input v-model="newsForm.readCount"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容"
                          prop="newsContent">
              <quill-editor ref="text"
                            v-model="newsForm.newsContent"
                            class="myQuillEditor"
                            :options="editorOption" />
            </el-form-item>
            <el-form-item label="图片"
                          prop="file"
                          type="file">
              <el-upload class="avatar-uploader"
                         action="/api1/news/postNews"
                         :auto-upload="false"
                         ref="upload"
                         :data="newsForm"
                         :on-success="handleAvatarUpload"
                         :before-upload="beforeAvatarUpload">
                <img v-if="newsForm.imgUrl"
                     :src="newsForm.imgUrl"
                     class="avatar">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="新闻来源"
                          prop="newsScource">
              <el-radio-group v-model="newsForm.newsScource">
                <div style="display:flex;">
                  <el-radio border
                            v-for="item in newsScourceOptions"
                            :key="item.Text"
                            :label="item.Text">{{item.Text}}</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="新闻类型"
                          prop="newsType">
              <el-radio-group v-model="newsForm.newsType">
                <div style="display:flex;">
                  <el-radio border
                            v-for="item in newsTypeOptions"
                            :key="item.newsType"
                            :label="item.newsType">{{item.Text}}</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary"
                       @click="submitForm('newsForm')">确定</el-button>
          </span>
        </el-dialog>
        <!-- 编辑新闻模态框 -->
        <el-dialog title="编辑新闻"
                   :visible.sync="editFormVisible"
                   :close-on-click-modal="false"
                   width="80%">
          <el-form :model="editForm"
                   ref="editForm">
            <el-form-item prop="newsId"></el-form-item>
            <el-form-item label="标题"
                          prop="newsTitle">
              <el-input v-model="editForm.newsTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="seo标题"
                          prop="seoTitle">
              <el-input v-model="editForm.seoTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="seo关键字"
                          prop="seoKeywords">
              <el-input v-model="editForm.seoKeywords"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="seo描述"
                          prop="seoDescription">
              <el-input v-model="editForm.seoDescription"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="阅读次数"
                          prop="readCount">
              <el-input v-model="editForm.readCount"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容"
                          prop="newsContent">
              <quill-editor ref="text"
                            v-model="editForm.newsContent"
                            class="myQuillEditor"
                            :options="editorOption" />
            </el-form-item>
            <el-form-item label="图片"
                          prop="file"
                          type="file">
              <el-upload class="avatar-uploader"
                         action="/api1/news/putNewsById"
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
            <el-form-item label="新闻来源"
                          prop="newsScource">
              <el-radio-group v-model="editForm.newsScource">
                <div style="display:flex;">
                  <el-radio border
                            v-for="item in newsScourceOptions"
                            :key="item.Text"
                            :label="item.Text">{{item.Text}}</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="新闻类型"
                          prop="newsType">
              <el-radio-group v-model="editForm.newsType">
                <div style="display:flex;">
                  <el-radio border
                            v-for="item in newsTypeOptions"
                            :key="item.newsType"
                            :label="item.newsType">{{item.Text}}</el-radio>
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
        newsType: '',
        newsTitle: '',
        seoTitle: '',
        seoKeywords: '',
        seoDescription: '',
        newsContent: '',
        newsScource: '',
        readCount: '',
      },
      // 编辑模态框
      editForm: {
        newsTitle: '',
        newsContent: '',
        seoTitle: '',
        seoKeywords: '',
        seoDescription: '',
        readCount: '',
      },
      newsScourceOptions: [
        { Text: '剑桥英语' },
        { Text: '高铁专业' },
        { Text: '护理专业' },
        { Text: '幼儿教育' },
      ],
      newsTypeOptions: [
        { newsType: 1, Text: '行业资讯' },
        { newsType: 2, Text: '招生解答' },
        { newsType: 3, Text: '校园动态' },
        { newsType: 4, Text: '通知动态' },
        { newsType: 5, Text: '实时动态' },
      ],
      // 分页数据
      page: {
        pageNum: 1,
        total: 0,
        pageSize: 6,
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
    // 点击添加新闻按钮打开模态框
    opendialogVisible() {
      this.dialogVisible = true
    },
    // 获取后台新闻数据
    getNews() {
      this.$axios
        .get('/api1/news/getAllNews/' + this.page.pageNum)
        .then((res) => {
          if (res.data.uAuth === 'true') {
            this.$message.error('您已退出登陆，请重新登陆')
            return this.$router.push('/login')
          }
          // console.log(res)
          this.news = res.data.data.list
          this.page.total = res.data.data.total
        })
        .catch((err) => {})
    },
    currentChange(pageNum) {
      this.page.pageNum = pageNum
      this.getNews()
    },
    // 添加新闻
    submitForm(formName) {
      let vm = this
      // 表单登录之前的预验证
      this.$refs[formName].validate((valid) => {
        // console.log(valid)
        if (valid) {
          vm.$refs.upload.submit()
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.getNews()
        } else {
          return false
        }
      })
    },
    handleAvatarUpload(res, file) {
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
    //根据newsId删除新闻
    async handleDelete(newsId) {
      const confirmResult = await this.$confirm('是否删除此条新闻？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      // 确认删除则返回字符串 confirm
      // 取消返回 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$axios
        .delete('/api1/news/deleteNewsById/' + newsId)
        .then((res) => {
          if (this.success == true) {
            return this.$message.error('删除用户失败')
          }
          this.$message.success('删除用户成功')
          // 刷新列表
          this.getNews()
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
        newsId: this.editForm.newsId,
        newsTitle: this.editForm.newsTitle,
        newsContent: this.editForm.newsContent,
        file: this.editForm.file,
        newsScource: this.editForm.newsScource,
        newsType: this.editForm.newsType,
      }
      let vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$refs.upload.submit()
          this.$message.success('编辑成功')
          this.editFormVisible = false
          this.getNews()
        } else {
          return false
        }
      })
    },
  },
  filters: {
    newsScource(value) {
      if (value === 1) {
        return '剑桥英语'
      } else if (value === 2) {
        return '高铁专业'
      } else if (value === 3) {
        return '护理专业'
      } else if (value === 4) {
        return '幼儿教育'
      }
    },
    newsType(value) {
      if (value === 1) {
        return '行业资讯'
      } else if (value === 2) {
        return '招生解答'
      } else if (value === 3) {
        return '校园动态'
      } else if (value === 4) {
        return '通知动态'
      } else if (value === 5) {
        return '实时动态2'
      }
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
