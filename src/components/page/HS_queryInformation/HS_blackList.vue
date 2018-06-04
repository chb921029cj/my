<template>
    <div class="container">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" >
            <el-row >
                <el-col :span="6">
                      <el-form-item label="姓名" >
                        <el-input type="text" v-model="form.name" ></el-input>
                      </el-form-item>                
                </el-col>
                <el-col :span="6">
                      <el-form-item label="手机号" >
                        <el-input type="text" v-model="form.phone" ></el-input>
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
                <el-table-column  label="编号">
                    <template slot-scope="scope">
                        <el-row>
                            <span style="margin-left: 10px">编号:{{ scope.row.id }}</span>
                        </el-row>
                        <el-row>
                            <span style="margin-left: 10px">{{ scope.row.executeName}}</span>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="executeNameCn" label="描述"></el-table-column>
                <el-table-column  label="操作">
                   <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleConfiguration(scope.$index, scope.row)">查看报告</el-button>
                   </template>
                </el-table-column>
            </el-table>            
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        idCard: ""
      },
      tableData: [],
      loading: true
    };
  },
  methods: {
    handleSearch() {}
  }
};
</script>

<style>
</style>

