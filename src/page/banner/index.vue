<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-12 09:16:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-07-11 09:04:15
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
              <el-table :data="banner"
                        style="width:100%"
                        stripe>
                <el-table-column prop="bannerTitle"
                                 label="标题"></el-table-column>
                <el-table-column prop="bannerUrl"
                                 label="跳转地址"></el-table-column>
                <el-table-column prop="bannerType"
                                 label="使用设备">
                  <template slot-scope="scope">
                    <el-tag>
                      {{scope.row.bannerType | bannerType}}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="图片">
                  <template slot-scope="scope">
                    <img :src="scope.row.img"
                         style="width: 100px;height:50px"></template>
                </el-table-column>
                <el-table-column prop="bannerFlag"
                                 label="是否可用">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.bannerFlag"
                               active-value="true"
                               inactive-value="false"
                               active-color="#13ce66"
                               inactive-color="#ff4949"
                               @change="changeSwitch($event,scope.row,scope.$index)">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="banner">
                    <div style="display:flex;">
                      <el-button icon="el-icon-edit"
                                 size="medium"
                                 @click="handleEdit(banner.$index,banner.row)">编辑</el-button>
                      <el-button type="danger"
                                 size="medium"
                                 icon="el-icon-delete"
                                 @click.native.prevent="handleDelete(banner.row.bannerId)">删除</el-button>
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
        <el-dialog title="添加轮播图"
                   :visible.sync="dialogVisible"
                   width="80%">
          <el-form ref="bannerForm"
                   :model="bannerForm"
                   enctype="multipart/form-data">
            <el-form-item label="标题"
                          prop="bannerTitle">
              <el-input v-model="bannerForm.bannerTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="跳转地址"
                          prop="bannerUrl">
              <el-input v-model="bannerForm.bannerUrl"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="使用设备"
                          prop="bannerType">
              <el-radio-group v-model="bannerForm.bannerType">
                <div style="display:flex;">
                  <el-radio border
                            v-for="item in bannerTypeOptions"
                            :key="item.bannerType"
                            :label="item.bannerType">{{item.Text}}</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片"
                          prop="file"
                          type="file">
              <el-upload class="avatar-uploader"
                         action="/api1/banner/postBanner"
                         :auto-upload="false"
                         ref="upload"
                         :data="bannerForm"
                         :on-success="handleAvatarUpload"
                         :before-upload="beforeAvatarUpload">
                <img v-if="bannerForm.imgUrl"
                     :src="bannerForm.imgUrl"
                     class="avatar">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

          </el-form>
          <span slot="footer">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary"
                       @click="submitForm('bannerForm')">确定</el-button>
          </span>
        </el-dialog>
        <!-- 编辑新闻模态框 -->
        <el-dialog title="编辑新闻"
                   :visible.sync="editFormVisible"
                   :close-on-click-modal="false"
                   width="80%">
          <el-form :model="editForm"
                   ref="editForm">
            <el-form-item prop="bannerId"></el-form-item>
            <el-form-item label="标题"
                          prop="bannerTitle">
              <el-input v-model="editForm.bannerTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="跳转地址"
                          prop="bannerUrl">
              <el-input v-model="editForm.bannerUrl"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="使用设备"
                          prop="bannerType">
              <el-radio-group v-model="editForm.bannerType">
                <div style="display:flex;">
                  <el-radio border
                            v-for="item in bannerTypeOptions"
                            :key="item.bannerType"
                            :label="item.bannerType">{{item.Text}}</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片"
                          prop="file"
                          type="file">
              <el-upload class="avatar-uploader"
                         action="/api1/banner/putBannerById"
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
      form: {
        bannerType: ''
      },
      dialogVisible: false,
      editFormVisible: false,
      banner: [],
      img: '',
      imgUrl: '',
      editorOption: {},
      bannerForm: {
        bannerTitle: '',
        bannerUrl: '',
        bannerType: ''
      },
      // 编辑模态框
      editForm: {
        bannerTitle: '',
        bannerUrl: '',
        bannerType: ''
      },
      bannerTypeOptions: [
        { bannerType: 1, Text: '电脑端' },
        { bannerType: 2, Text: '移动端' }
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
    this.getBanners()
  },
  methods: {
    // 点击添加新闻按钮打开模态框
    opendialogVisible() {
      this.dialogVisible = true
    },
    // 获取后台新闻数据
    getBanners() {
      this.$axios
        .get('/api1/banner/getAllBanner/' + this.page.pageNum)
        .then(res => {
          if (res.data.code === 401) {
            this.$message.error('您已退出登陆，请重新登陆')
            return this.$router.push('/login')
          }
          // console.log(JSON.parse(res.data.data).list)
          this.banner = JSON.parse(res.data.data).list
          this.page.total = JSON.parse(res.data.data).total
        })
        .catch(err => {})
    },
    currentChange(pageNum) {
      this.page.pageNum = pageNum
      this.getBanners()
    },

    submitForm(formName) {
      let vm = this
      // 表单登录之前的预验证
      this.$refs[formName].validate(valid => {
        // console.log(valid)
        if (valid) {
          vm.$refs.upload.submit()
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.getBanners()
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
      this.$axios
        .put('/api1/banner/putBannerById', { file: file })
        .then(res => {})
        .catch(err => {})
    },
    // 删除操作
    //根据bannerId删除新闻
    async handleDelete(bannerId) {
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
        .delete('/api1/banner/deleteBannerById/' + bannerId)
        .then(res => {
          if (this.success == true) {
            return this.$message.error('删除用户失败')
          }
          this.$message.success('删除用户成功')
          // 刷新列表
          this.getBanners()
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
        bannerId: this.editForm.bannerId,
        bannerTitle: this.editForm.bannerTitle,
        bannerContent: this.editForm.bannerContent,
        file: this.editForm.file
      }
      let vm = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          vm.$refs.upload.submit()
          this.$message.success('编辑成功')
          this.editFormVisible = false
          this.getBanners()
        } else {
          return false
        }
      })
    },
    changeSwitch(data, b, index) {
      // console.log(b.bannerId)
      // console.log(data)
      // console.log(index)
      let form = { bannerType: this.data }
      this.$axios
        .put(`/api1/banner/putBannerFlagById/${b.bannerId}/${data}`)
        .then(res => {
          // console.log(res)
        })
    }
  },
  filters: {
    bannerType(value) {
      if (value === 1) {
        return '电脑端'
      } else if (value === 2) {
        return '移动端'
      }
    },
    bannerFlag(value) {
      if (value == 'true') {
        return true
      } else if (value == 'false') {
        return false
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
