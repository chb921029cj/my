<template>
    <div class="container">
        <el-row>
            <el-col :span="6">
                <el-button type="primary" @click="handleEdit()">新增用户</el-button>
            </el-col>
            <el-col :span="18" >
                <el-row>
                    <el-col :span="12">
                       <el-date-picker
                           v-model="select_time"
                              type="daterange"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           value-format="yyyy-MM-dd">
                       </el-date-picker>   
                    </el-col>
                    <el-col :span="12" >
                        <el-row>
                            <el-col :span="20">
                                <el-input v-model="select_phone" placeholder="请输入手机号搜索" ></el-input>
                            </el-col>
                            <el-col :span="4">
                                 <el-button type="primary" icon="search" @click="handleSearch">搜索</el-button> 
                            </el-col>    
                        </el-row>
                    </el-col>
                </el-row>

            </el-col>            
        </el-row>
        <el-row style="margin-top:20px">
           <el-table
                :data="tableData"
                 v-loading="loading"
                border
                style="width: 100%">
                <el-table-column
                    sortable
                    prop="id"
                    label="序号"
                     width="180">
                </el-table-column>
                 <el-table-column
                    prop="realname"
                    label="姓名"
                    width="180">
                 </el-table-column>
                <el-table-column
                    prop="idcard"
                    label="身份证">
                </el-table-column>
                <el-table-column
                    prop="phonenume"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    sortable
                    label="时间">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.applytime |dateServer }}</span>                        
                    </template>
                </el-table-column> 
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleReport(scope.$index, scope.row)">查看报告</el-button>
                    </template>                                
                </el-table-column>
            </el-table>            
        </el-row>
        <el-row style="margin-top:20px" v-if="allpage>0">
            <div style="float:right">
                <el-pagination
                  @current-change="handleCurrentChange"
                  
                   @size-change="handleSizeChange"
                  :current-page="currentPage"
                   :page-sizes="[5, 10, 20, 30]"
                    :page-size="pageSize"
                  background
                  layout="total,sizes,prev, pager, next,jumper"
                  :total="allpage">
                </el-pagination>   
            </div>
        </el-row>       
        <!-- 编辑弹出框 -->        
        <el-dialog  :visible.sync="editVisible" width="80%">
            <el-row>
                    <p class="title">基本信息</p>
            </el-row>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="姓名" >
                    <el-input v-model="form.name" class="input-width" ></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" class="input-width"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="身份证号">
                    <el-input v-model="form.cardid" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="移动卡号">
                    <el-input v-model="form.operatorPassword" class="input-width"></el-input>
                </el-form-item>                
            </el-form>  
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="qq">
                    <el-input v-model="form.cardid" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="email">
                    <el-input v-model="form.operatorPassword" class="input-width"></el-input>
                </el-form-item>                
            </el-form>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="学历">
                    <el-select v-model="form.region" placeholder="————请选择————">
                        <el-option label="高中" value="shanghai"></el-option>
                        <el-option label="大专" value="beijing"></el-option>
                        <el-option label="本科" value="beijing"></el-option>
                        <el-option label="硕士" value="beijing"></el-option>
                        <el-option label="博士" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="婚姻">
                    <el-select v-model="form.region" placeholder="————请选择————">
                        <el-option label="未婚" value="shanghai"></el-option>
                        <el-option label="已婚" value="beijing"></el-option>
                        <el-option label="离婚" value="beijing"></el-option>
                    </el-select>
                </el-form-item>                
            </el-form>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="户籍地址">
                    <el-input v-model="form.cardid" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="通讯地址">
                    <el-input v-model="form.operatorPassword" class="input-width"></el-input>
                </el-form-item>                
            </el-form> 
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="申请人类别">
                    <el-select v-model="form.region" placeholder="————请选择————">
                        <el-option label="学生" value="shanghai"></el-option>
                        <el-option label="在职" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>                                                           
            <el-row>
                    <p class="title">联系人信息</p>
            </el-row>            
           <el-form :inline="true" :model="form" label-position="right" label-width="120px" class="demo-form-inline">           
             <el-form-item label="第一联系人关系">
               <el-select v-model="form.region" placeholder="————请选择————">
                 <el-option label="父母" value="shanghai"></el-option>
                 <el-option label="配偶" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="姓名">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>             
             <el-form-item label="手机号">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>
           </el-form>
           <el-form :inline="true" :model="form" label-position="right" label-width="120px" class="demo-form-inline">           
             <el-form-item label="第二联系人关系">
               <el-select v-model="form.region" placeholder="————请选择————">
                 <el-option label="兄弟姐妹" value="shanghai"></el-option>
                 <el-option label="子女" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="姓名">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>             
             <el-form-item label="手机号">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>
           </el-form> 
           <el-form :inline="true" :model="form" label-position="right" label-width="120px" class="demo-form-inline">           
             <el-form-item label="第三联系人关系">
               <el-select v-model="form.region" placeholder="————请选择————">
                 <el-option label="同事" value="shanghai"></el-option>
                 <el-option label="同学" value="beijing"></el-option>
                 <el-option label="朋友" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="姓名">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>             
             <el-form-item label="手机号">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>
           </el-form>
           <el-row style="margin-bottom:30px">
               <el-col :span="8" :offset="8">
                    <el-button type="primary" @click="saveEdit" style="width:100%" >提交</el-button>
               </el-col>
            </el-row>                                  
        </el-dialog>  
        <el-dialog :visible.sync="showVisible" width="60%" >
            <el-row class="flx">
                <div class="fl">
                    贷前审核报告报告编号: <span>ER20180528172649D479D4D6</span>
                </div>
                <div class="fr">
                    报告时间:<span>{{new Date() |dateServer}}</span>
                </div>
            </el-row>
            <el-row >
                <el-card>
                    <el-col :span="6" :offset="2">
                        <div >
                            <div class="progress-text">
                                <strong>100</strong>
                                <p >建议拒绝</p>
                            </div>
                                <el-progress type="circle" :percentage="80" color="#8e71c7" :show-text="showText">aaaaa</el-progress>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-row style="text-align:center;padding-top:30px">
                           <strong style="font-size:20px">申请用户测出高危风险建议拒绝</strong>
                        <br/><span>
                            共发现15条异常信息
                           </span>
                        </el-row>
                    </el-col>
                </el-card>
            </el-row> 
            <el-row style="margin-top:20px">
                <el-card>
                    <el-row>
                        <h3>个人基本信息</h3>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5">
                                    姓名：
                                </el-col>
                                <el-col :span="6">
                                    {{information.username}}
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5">
                                    身份证号：
                                </el-col>
                                <el-col :span="6">
                                    {{information.idnumber}}
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5">
                                    手机号码：
                                </el-col>
                                <el-col :span="6">
                                   {{information.phonenumber}}
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col :span="8">
                            <el-row>
                                <h3>第一个联系人</h3>
                            </el-row>
                            <el-row style="margin-top:20px">
                                <el-col :span="8">
                                    姓名：
                                </el-col>
                               <el-col :span="12">
                                    {{contacts.firstcontactsname}}
                                </el-col>                                
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    手机号码：
                                </el-col>
                               <el-col :span="12">
                                    {{contacts.firstcontactsphonenumber}}
                                </el-col>                                
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                   社会关系：
                                </el-col>
                               <el-col :span="12">
                                   {{contacts.firstcontactsrelationship}}
                                </el-col>                                
                            </el-row>                                                        
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                                <h3>第二个联系人</h3>
                            </el-row>                            
                            <el-row style="margin-top:20px">
                                <el-col :span="8">
                                    姓名：
                                </el-col>
                               <el-col :span="12">
                                    {{contacts.secondcontactsname}}
                                </el-col>                                
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    手机号码：
                                </el-col>
                               <el-col :span="12">
                                   {{contacts.secondcontactsphonenumbe}}
                                </el-col>                                
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                   社会关系：
                                </el-col>
                               <el-col :span="12">
                                  {{contacts.secondcontactsrelationship}}
                                </el-col>                                
                            </el-row>                                                        
                        </el-col>                        
                    </el-row>
                </el-card>
            </el-row>  
            <el-row style="margin-top:20px">
                <el-card>
                    <el-row>
                        <h3>归属地解析</h3>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col :span="5">
                            身份证所属地地址:
                        </el-col>
                        <el-col :span="12">
                            {{tongDunAddressDetectVO.idCardAddress}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            手机所属地地址:
                        </el-col>
                        <el-col :span="12">
                           {{tongDunAddressDetectVO.mobileAddress}}
                        </el-col>
                    </el-row>                    
                </el-card>
            </el-row>
            <el-row style="margin-top:20px">
                <el-card>
                    <el-table
                        :data="tableData6"
                        :span-method="arraySpanMethod"
                        border
                        style="width:100%"
                    >
                        <el-table-column
                            prop="jiancexiangmu"
                            width="100"
                        >
                            
                        </el-table-column>
                        <el-table-column
                         prop="jianchaxiangmu"
                        label="检查项目"
                        width="200"
                        >
                            
                        </el-table-column>
                        <el-table-column
                         prop="fengxiandengji"
                        label="风险等级"                        
                        >
                            
                        </el-table-column>
                        <el-table-column
                        
                        label="备注"
                        >
                            <template slot-scope="scope">
                                总个数{{scope.row.total}}
                                <el-collapse  >
                                  <el-collapse-item :title="scope.row.title" v-if="scope.row.beizhu.length>0">
                                    <div v-for=" (temp ,index) in scope.row.beizhu " :key="index">
                                        {{temp.description}}
                                    </div>
                                  </el-collapse-item>
                                </el-collapse>
                            </template>
                        </el-table-column>                                                                        

                    </el-table>
                </el-card>
            </el-row>         
        </el-dialog>      
    </div>
</template>

<script>
import { httpGetCreditReport, httpGetList } from "@/api/http";
import { timeFormat } from "../../../../static/js/time";
export default {
  data() {
    return {
      form: {
        name: "",
        date: "",
        address: ""
      },
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      allpage: 0,
      select_phone: "",
      select_time: [],
      loading: true,
      editVisible: false,
      showVisible: false,
      showText: false,
      information: {},
      contacts: {},
      tongDunAddressDetectVO: {},
      activeNames: ["1"],
      tableData6: [],
      tableData: [],
      column_row_offset: [[2, 1], [0, 0], [3, 1], [0, 0], [0, 0], [1, 1]]
    };
  },
  methods: {
    handleEdit() {
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    //查看报告
    handleReport(index, row) {
      let _this = this;
      this.showVisible = true;
      console.log(index, row);
      let id = row.tongdunReportId;
      httpGetList(id)
        .then(res => {
          let data = res.data;
          _this.information = data.information;
          _this.contacts = data.contacts;
          _this.tongDunAddressDetectVO = data.tongDunAddressDetectVO;
          //   _this.tableData6 =
          let tongDunOverdueVOIDCard = [];
          let tongDunOverdueVOIDPhoneNumber = [];
          let tongDunPlatformThreeMonth = [];
          let tongDunPlatformOneMonth = [];
          let tongDunPlatformSevenDay = [];
          let courtDetailsInfoVO = [];
          let d1 = data.tongDunOverdueVOIDCard;
          let d2 = data.tongDunOverdueVOIDPhoneNumber;
          let d3 = data.tongDunPlatformThreeMonth;
          let d4 = data.tongDunPlatformOneMonth;
          let d5 = data.tongDunPlatformSevenDay;
          let d6 = data.courtDetailsInfoVO;
          for (var i = 0; i < d1.length; i++) {
            tongDunOverdueVOIDCard.push({
              description: `${d1[i].description}`,
              discreditTimes: `${d1[i].discreditTimes}`,
              overdueAmountRange: `${d1[i].overdueAmountRange}`,
              overdueCount: `${d1[i].overdueCount}`,
              overdueDayRange: `${d1[i].overdueDayRange}`
            });
          }
          for (var i = 0; i < d2.length; i++) {
            tongDunOverdueVOIDPhoneNumber.push({
              description: `${d2[i].description}`,
              discreditTimes: `${d2[i].discreditTimes}`,
              overdueAmountRange: `${d2[i].overdueAmountRange}`,
              overdueCount: `${d2[i].overdueCount}`,
              overdueDayRange: `${d2[i].overdueDayRange}`
            });
          }
          //7天内申请人在多个平台申请借款
          for (var i = 0; i < d3.length; i++) {
            tongDunPlatformSevenDay.push({
              platformCount: `${d3[i].platformCount}`,
              industryDisplayName: `${d3[i].industryDisplayName}`,
              total: `${d3[i].total}`,
              dimension: `${d3[i].dimension}`,
              dimensionCount: `${d3[i].dimensionCount}`
            });
          }
          //1个月天内申请人在多个平台申请借款
          for (var i = 0; i < d4.length; i++) {
            tongDunPlatformOneMonth.push({
              platformCount: `${d4[i].platformCount}`,
              industryDisplayName: `${d4[i].industryDisplayName}`,
              total: `${d4[i].total}`,
              dimension: `${d4[i].dimension}`,
              dimensionCount: `${d4[i].dimensionCount}`
            });
          }
          //3个月天内申请人在多个平台申请借款
          for (var i = 0; i < d5.length; i++) {
            tongDunPlatformThreeMonth.push({
              platformCount: `${d5[i].platformCount}`,
              industryDisplayName: `${d5[i].industryDisplayName}`,
              total: `${d5[i].total}`,
              dimension: `${d5[i].dimension}`,
              dimensionCount: `${d5[i].dimensionCount}`
            });
          }
          //风险名单详情
          for (var i = 0; i < d6.length; i++) {
            courtDetailsInfoVO.push({
              total: `${d6[i].total}`,
              description: `${d6[i].description}`,
              fraudTypeDisplayName: `${d6[i].fraudTypeDisplayName}`
            });
          }
          _this.tableData6 = [
            {
              jiancexiangmu: "客户行为检测",
              jianchaxiangmu: `身份证命中信贷逾期名单`,
              fengxiandengji: "低",
              title: "各维度多头详情",
              total: tongDunOverdueVOIDCard.length,
              beizhu: tongDunOverdueVOIDCard
            },
            {
              jiancexiangmu: "客户行为检测",
              jianchaxiangmu: `手机号命中信贷逾期名单`,
              fengxiandengji: "低",
              title: "各维度多头详情",
              total: tongDunOverdueVOIDPhoneNumber.length,
              beizhu: tongDunOverdueVOIDPhoneNumber
            },
            {
              jiancexiangmu: "多平台借贷申请检测",
              jianchaxiangmu: "7天内申请人在多个平台申请借款",
              fengxiandengji: "低",
              total: tongDunPlatformSevenDay.length,
              beizhu: tongDunPlatformSevenDay
            },
            {
              jiancexiangmu: "多平台借贷申请检测",
              jianchaxiangmu: "1个月内申请人在多个平台申请借款",
              fengxiandengji: "低",
              total: tongDunPlatformSevenDay.length,
              beizhu: tongDunPlatformSevenDay
            },
            {
              jiancexiangmu: "多平台借贷申请检测",
              jianchaxiangmu: "3个月内申请人在多个平台申请借款",
              fengxiandengji: "低",
              total: tongDunPlatformSevenDay.length,
              beizhu: tongDunPlatformSevenDay
            },
            {
              jianchaxiangmu: "风险名单详情",
              fengxiandengji: "低",
              total: courtDetailsInfoVO.length,
              beizhu: courtDetailsInfoVO,
              title: "各维度多头详情",
              jiancexiangmu: "不良信息扫描"
            }
          ];
          //   for (var i = 0; i < data.tongDunPlatformThreeMonth.lentgh; i++) {
          //     _this.tableData6.push({
          //       jiancexiangmu: `${tongDunPlatformThreeMonth[i]}`,
          //       jianchaxiangmu: 1,
          //       fengxiandengji: "低",
          //       beizhu: "不错"
          //     });
          //   }
          console.log(_this.tableData6);
          console.log(res);
        })
        .catch();
    },
    arraySpanMethod(row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 0) {
        let j = row.rowIndex;
        return this.column_row_offset[j];
      }
    },
    //得到数据
    getTableData(pagesize, npage, time, phonenume, interfaceCallType = 4) {
      let _this = this;
      _this.loading = true;
      if (time.length === 0) {
        httpGetCreditReport(pagesize, npage, "", "", phonenume, 4)
          .then(res => {
            let data = res.data;
            _this.allpage = data.allsize;
            _this.currentPage = data.npage;
            _this.tableData = data.list;
            _this.loading = false;
          })
          .catch();
      } else {
        httpGetCreditReport(pagesize, npage, ...time, phonenume, 4)
          .then(res => {
            let data = res.data;
            _this.allpage = data.allsize;
            _this.currentPage = data.npage;
            _this.tableData = data.list;
            _this.loading = false;
          })
          .catch(() => {
            _this.loading = false;
          });
      }
    },
    handleSearch() {
      this.currentPage = 1;
      console.log(1);
      this.getTableData(
        this.currentPage,
        this.pageSize,
        this.select_time,
        this.select_phone
      );
    },
    handleCurrentChange(val) {
      this.getTableData(
        val,
        this.pageSize,
        this.select_time,
        this.select_phone
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(
        this.currentPage,
        this.pageSize,
        this.select_time,
        this.select_phone
      );
    }
  },
  mounted: function() {
    this.getTableData(
      this.currentPage,
      this.pageSize,
      this.select_time,
      this.select_phone
    );
  }
};
</script>

<style scoped>
.title {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
}
.input-width {
  width: 215px;
}
.flx {
  position: absolute;
  width: 85%;
  top: 0px;
  padding-top: 10px;
  overflow: hidden;
  line-height: 30px;
}
.fl {
  float: left;

  font-size: 24px;
  font-weight: bold;
}
.fl span {
  font-size: 12px;
  font-weight: normal;
}
.fr {
  float: right;
  font-size: 12px;
}
.bar {
  position: relative;
  width: 50%;
  display: inline-block;
}
.progress-text {
  position: absolute;
  text-align: center;
  font-size: 32px;
  line-height: 126px;
  width: 126px;
  height: 126px;
}
.progress-text p {
  width: 100%;
  position: absolute;
  top: 80px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}
.table tbody tr td:nth-child(3),
.table tbody tr:not(:nth-child(1)) td:nth-child(2) {
  text-align: center;
}
</style>

