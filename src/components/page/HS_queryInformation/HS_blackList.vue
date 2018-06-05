<template>
    <div class="container">
        <el-form :model="form"  :rules="rules"  ref="form" label-width="100px"
 >
            <el-row >
                <el-col :span="6">
                      <el-form-item label="姓名" >
                        <el-input type="text" v-model="form.name" ></el-input>
                      </el-form-item>                
                </el-col>
                <el-col :span="6" >
                      <el-form-item label="手机号"  prop="phone">
                        <el-input type="text" v-model.number="form.phone" ></el-input>
                      </el-form-item>                
                </el-col>
                <el-col :span="6">
                      <el-form-item label="身份证" >
                        <el-input type="text" v-model="form.idCard" ></el-input>
                      </el-form-item>                
                </el-col>
                <el-col :span="6">
                      <el-form-item  >
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                      </el-form-item>                
                </el-col>                                                
            </el-row>

        </el-form>
        <el-row>
            <el-table  :data="tableData" border style="width: 100%" v-loading="loading">
                <el-table-column prop="id" sortable label="序号" width="80"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="phonenumber" label="手机号"></el-table-column>
                <el-table-column prop="idno" label="身份证"></el-table-column>
                <el-table-column prop="reason" label="被拒原因">
                    <template slot-scope="scope">
                        <el-tag type="danger">{{scope.row.reason}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column   width="200" sortable label="拉黑时间">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.createtime |dateServer }}</span>
                    </template>                     
                </el-table-column>
                <el-table-column  label="操作">
                   <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleConfiguration(scope.$index, scope.row)">查看报告</el-button>
                   </template>
                </el-table-column>
            </el-table>            
        </el-row>
        <el-row style="margin-top:20px" v-if="allsize>0">
            <div style="float:right">
                <el-pagination
                  @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"
                  :current-page="nPage"
                   :page-sizes="[10, 20,30, 40]"
                    :page-size="pagesize"
                  background
                  layout="total,sizes,prev, pager, next,jumper"
                  :total="allsize">
                </el-pagination>   
            </div>
        </el-row>          
    </div>
</template>

<script>
import { httpGetUserList } from "@/api/http";
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        idCard: ""
      },
      tableData: [],
      loading: true,
      nPage: 1,
      pagesize: 10,
      allsize: 0,
      rules: {
        phone: [
          { message: "请输入11位以内数字", trigger: "change" },
          {
            pattern: /^\d{1,16}$/,
            message: "请输入11位以内数字"
          }
        ]
      }
    };
  },
  methods: {
    getTabelDate(npage, pagesize, username, phoneNumber, idno) {
      let _this = this;
      _this.loading = true;
      httpGetUserList(npage, pagesize, username, phoneNumber, idno)
        .then(res => {
          let data = res.data;
          _this.tableData = data.rows;
          _this.allsize = data.total;
          _this.loading = false;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    handleSearch() {
      console.log(typeof this.form.phone);
      this.getTabelDate(
        this.nPage,
        this.pagesize,
        this.form.name,
        this.form.phone,
        this.form.idCard
      );
    },
    handleCurrentChange(val) {
      this.nPage = val;
      this.getTabelDate(
        this.nPage,
        this.pagesize,
        this.form.name,
        this.form.phone,
        this.form.idCard
      );
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getTabelDate(
        this.nPage,
        this.pagesize,
        this.form.name,
        this.form.phone,
        this.form.idCard
      );
    },
    handleConfiguration() {}
  },
  created() {
    this.getTabelDate(
      this.nPage,
      this.pagesize,
      this.form.name,
      this.form.phone,
      this.form.idCard
    );
  }
};
</script>

<style>
</style>

