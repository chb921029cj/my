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
                                 <el-button type="primary" icon="search" @click="handleSearch" >搜索</el-button> 
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
                     width="100">
                </el-table-column>
                 <el-table-column
                    prop="realname"
                    label="姓名"
                    width="100">
                 </el-table-column>
                <el-table-column
                    prop="idcard"
                    width="300"
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
        <el-dialog  :visible.sync="editVisible" width="78%">
            <el-row>
                    <p class="title">
                        基本信息
                    </p>
            </el-row>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="姓名" >
                    <el-input v-model="form.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" ></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="身份证号">
                    <el-input v-model="form.cardid" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="移动运行商密码">
                    <el-input v-model="form.operatorPassword" ></el-input>
                </el-form-item>                
            </el-form>            
            <el-row>
                    <p class="title">
                        联系人信息
                    </p>                
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
        <!-- 查勘报告         -->
        <el-dialog  :visible.sync="showVisible" :width="fullscreenWidth"   title="报告详情" :fullscreen="fullscreen" top="30px">
            <el-container   :style="{ height: fullscreenHeight}" style="border: 1px solid #eee">
              <el-header style="font-size: 12px;overflow：hidden;line-height:60px;    background-color:#EEEEEE">
                <el-row >
                  <el-col :span="6">
                    <h1 >贝利风投</h1>
                  </el-col>
                  <el-col :span="1" :offset="15">
                     <div class="btn-fullscreen"  >
                         <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                             <el-button type="info" icon="el-icon-rank" circle @click="changeFullscreen"></el-button>
                         </el-tooltip>
                     </div>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" @click="Print()">打印报告</el-button>
                  </el-col>
                  <el-col style="position:absolute;top:0;line-height:16px;text-align:right;color:rgb(153,153,153)">
                    <span >tips:若打印页面不全或不存在请重新点击打印报告</span>
                  </el-col>
                </el-row>
              </el-header>
              <el-main  id="subOutputRank-print" >
                <el-row v-show="false">
                    <canvas id="myCanvas" width="200" height="230" >
                    </canvas>
                </el-row> 
                <el-row    style="padding-top:0;position:relative;">
                  <el-row id="bg" style="width:100%;height:100%;position:absolute;top:0;left:0;zIndex:9999" :style ="note" >
                    <div >

                    </div>
                  </el-row>
                  <el-row class="report_t">
                    <div class="el-main-info l">
                      <span>报告编号：201805241119371288237</span>
                    </div>
                    <div class="el-main-info r">
                      <span>报告生成时间：2018-05-24 11:19:37</span>
                    </div>

                  </el-row>
                  <el-row >
                    <h1 style="text-align:center">
                      互联网资信报告
                    </h1>
                  </el-row>
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>用户基本信息</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <table cellpadding="0" cellspacing="0" class="table">
                      <tbody>
                        <tr>
                          <td>
                            <span class="item">姓名</span>
                            <span>张国军</span>
                            <span>男</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item">身份证</span>
                            <span>23412421241241</span>
                            <span class="tip_y">不在金融圈</span>
                            <span class="tip_y"></span>
 
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item">手机号</span>
                            <span>1231412412</span>
                            <span class="tip_y"></span>
                            <span class="remarks">用户姓名与运营商提供的姓名[张国军]匹配成功</span>
                            <span class="remarks"></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>                                       
                  </el-card>
                  <!-- 亲属联系人信息 -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>亲属联系人信息</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="kinsfolkTableData">
                        <el-table-column prop="relation" label="关系" width="140">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="phone" label="手机号">
                        </el-table-column>
                        <el-table-column prop="explain" label="说明">
                        </el-table-column>      
                    </el-table>                    
                  </el-card>
                  <!-- 用户信息检测 -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>用户信息检测</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                  <table cellpadding="0" cellspacing="0" class="table">
                      <tbody>
                        <tr >
                          <th width="100" rowspan="9"> 用户信息查询</th>    
                          <td width="220"> 查询过该用户的相关企业数量 </td>
                          <td><span>0</span></td>
                        </tr>
                        <tr>
                          <td> 查询过该用户的相关企业类型 </td>
                          <td> 
			   
                          </td>
                        </tr>
                        <tr>
                          <td> 身份证组合过的其他姓名 </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  身份证组合过其他电话  </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码组合过其他姓名  </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码组合过其他身份证  </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码注册过的相关企业数量  </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码注册过的相关企业类型  </td>
                          <td>

                          </td>
                        </tr> 
                        <tr>
                          <td>  电话号码出现过的公开网站  </td>
                          <td>

                          </td>
                        </tr>                                                                                                                                                
                      </tbody>
                      <tbody>
                        <tr>
                          <th width="100" rowspan="6">黑名单信息</th>
                          <td>黑中介分数</td>
                          <td>
                            <span>0</span>
                            （分数范围0-100，参考分为10，分数越低关系越紧密）
                          </td>
                        </tr>
                        <tr>
                          <td> 直接联系人中黑名单人  </td>
                          <td>
                            <span>0</span>
                            (直接联系人：和被查询号码有通话记录)
                          </td>
                        </tr>  
                        <tr>
                          <td> 间接联系人中黑名单人数  </td>
                          <td>
                            <span>0</span>
                            (间接联系人：和被查询号码的直接联系人有通话记录)
                          </td>
                        </tr>  
                        <tr>
                          <td> 直接联系人人数  </td>
                          <td>
                            <span>80</span>
                            (直接联系人：和被查询号码有通话记录)
                          </td>
                        </tr>  
                        <tr>
                          <td> 引起黑名单的直接联系人数量  </td>
                          <td>
                            <span>0</span>
                             (直接联系人有和黑名单用户的通讯记录的号码数量)
                          </td>
                        </tr>  
                        <tr>
                          <td> 直接联系人中引起间接黑名单占比  </td>
                          <td>
                              <span>0.00</span>
                              (直接联系人有和黑名单用户的通讯记录的号码数量在直接联系人数量中的百分比)
                          </td>
                        </tr>                                                                                                                         
                      </tbody>
                  </table>
                  </el-card> 
                  <!-- 用户行为检测 -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>用户行为检测</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="testTableData">
                        <el-table-column prop="testItem" label="检测项目" width="150">
                        </el-table-column>
                        <el-table-column prop="result" label="结果" width="150">
                        </el-table-column>
                        <el-table-column prop="gist" label="依据">
                        </el-table-column>
                    </el-table>                     
                  </el-card>   
                  <!-- 运营商消费数据               -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>运营商消费数据</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="operatorTableData">
                        <el-table-column prop="testItem" label="运行商" >
                        </el-table-column>
                        <el-table-column prop="result" label="号码" >
                        </el-table-column>
                        <el-table-column prop="gist" label="归属地">
                        </el-table-column>
                        <el-table-column prop="gist" label="月份">
                        </el-table-column>
                        <el-table-column prop="gist" label="呼叫次数">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="主叫次数">
                        </el-table-column>
                        <el-table-column prop="gist" label="主叫时间">
                        </el-table-column>  
                        <el-table-column prop="gist" label="被叫次数">
                        </el-table-column>  
                        <el-table-column prop="gist" label="被叫时间">
                        </el-table-column>  
                        <el-table-column prop="gist" label="短信数量">
                        </el-table-column>
                        <el-table-column prop="gist" label="话费消费">
                        </el-table-column>                                                                                                                                                
                    </el-table>                     
                  </el-card>  
                  <!-- 联系人区域汇总                  -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>联系人区域汇总 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="linkmanTableData">
                        <el-table-column prop="testItem" label="地区" >
                        </el-table-column>
                        <el-table-column prop="result" label="号码次数" >
                        </el-table-column>
                        <el-table-column prop="gist" label="呼入次数">
                        </el-table-column>
                        <el-table-column prop="gist" label="呼出次数">
                        </el-table-column>
                        <el-table-column prop="gist" label="呼入时间">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="呼出时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="呼入次数比">
                        </el-table-column>  
                        <el-table-column prop="gist" label="呼出次数比">
                        </el-table-column>  
                        <el-table-column prop="gist" label="呼入时间比">
                        </el-table-column>  
                        <el-table-column prop="gist" label="呼出时间比">
                        </el-table-column>
                    </el-table>                     
                  </el-card> 
                  <!-- 运营商数据分析                   -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>运营商数据分析 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="operatorDataTableData">
                        <el-table-column prop="testItem" label="号码" >
                        </el-table-column>
                        <el-table-column prop="result" label="互联网标识" >
                        </el-table-column>
                        <el-table-column prop="gist" label="需求类型">
                        </el-table-column>
                        <el-table-column prop="gist" label="归属地">
                        </el-table-column>
                        <el-table-column prop="gist" label="通话次数">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="通话时间(分)">
                        </el-table-column>
                        <el-table-column prop="gist" label="主叫次数">
                        </el-table-column>  
                        <el-table-column prop="gist" label="被叫次数">
                        </el-table-column>  
                    </el-table>                     
                  </el-card> 
                  <!-- 联系人信息                  -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>联系人信息 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="contactTableData">
                        <el-table-column prop="testItem" label="联系人" >
                        </el-table-column>
                        <el-table-column prop="result" label="最早联系时间" >
                        </el-table-column>
                        <el-table-column prop="gist" label="最晚联系时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="联系电话">
                        </el-table-column>
                        <el-table-column prop="gist" label="号码归属地">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="通话时长">
                        </el-table-column>
                    </el-table>                     
                  </el-card>  
                  <!-- 电商地址信息                  -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>电商地址信息 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="esAddTableData">
                        <el-table-column prop="testItem" label="地址" >
                        </el-table-column>
                        <el-table-column prop="result" label="	总消费金额" >
                        </el-table-column>
                        <el-table-column prop="gist" label="收货人姓名">
                        </el-table-column>
                        <el-table-column prop="gist" label="收货人手机">
                        </el-table-column>
                    </el-table>                     
                  </el-card>  
                  <!-- 电商数据分析                  -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>电商数据分析</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="esDataTableData">
                        <el-table-column prop="testItem" label="月份" >
                        </el-table-column>
                        <el-table-column prop="result" label="消费次数" >
                        </el-table-column>
                        <el-table-column prop="gist" label="消费金额">
                        </el-table-column>
                        <el-table-column prop="gist" label="品类分析">
                        </el-table-column>
                    </el-table>                     
                  </el-card> 
                  <!-- 出行数据分析                 -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>出行数据分析</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="tripTableData">
                        <el-table-column prop="testItem" label="时间段" >
                        </el-table-column>
                        <el-table-column prop="result" label="出发时间" >
                        </el-table-column>
                        <el-table-column prop="gist" label="回程时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="出发地">
                        </el-table-column>
                        <el-table-column prop="gist" label="目的地">
                        </el-table-column>                        
                    </el-table>                     
                  </el-card>                                                       
                </el-row>
              </el-main>
            </el-container>
        </el-dialog>
    </div>
</template>

<script>
import { httpGetCreditReport } from "@/api/http";
import { timeFormat } from "../../../../static/js/time";
// import "../../../assets/libs/jquery/jQuery.print.js";
export default {
  data() {
    return {
      form: {
        name: "",
        date: "",
        address: ""
      },
      loading: true,
      select_time: [],
      select_word: "",
      editVisible: false,
      showVisible: false,
      fullscreen: false,
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      allpage: 0,
      select_phone: "",
      userBasicInformation: [], //用户基本信息检测
      fullscreenWidth: "80%",
      fullscreenHeight: "450px",
      kinsfolkTableData: [{ name: "小王" }], //亲属联系人
      testTableData: [{ testItem: "fas" }],
      operatorTableData: [{ testItem: "fas" }], //运营商消费数据
      linkmanTableData: [{ testItem: "fas" }], //联系人区域汇总
      operatorDataTableData: [{ testItem: "fas" }], //运行商数据分析
      contactTableData: [{ testItem: "fas" }], //联系人信息
      esAddTableData: [{ testItem: "fas" }], //电商信息
      esDataTableData: [{ testItem: "fas" }], //电商数据统计
      tripTableData: [{ testItem: "fas" }],
      canvasimg: "",
      canvasShow: true,
      note: {
        backgroundImage: ""
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "25px auto",
        // marginTop: "5px"
      }
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
      this.showVisible = true;
      setTimeout(() => {
        if (this.canvasShow) {
          var canvas = document.getElementById("myCanvas");
          var ctx = canvas.getContext("2d");
          ctx.save();
          ctx.font = "30px Microsoft YaHei";
          ctx.rotate(-45 * Math.PI / 180);
          ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
          ctx.fillText("贝利风投", -100, 220);
          ctx.restore();
          this.note.backgroundImage = 'url("' + ctx.canvas.toDataURL() + '")';
          this.canvasShow = false;
        }
      }, 20);
    },
    changeFullscreen() {
      if (this.fullscreen) {
        this.fullscreen = false;
        this.fullscreenWidth = "80%";
        this.fullscreenHeight = "450px";
      } else {
        this.fullscreen = true;
        this.fullscreenWidth = "100%";
        this.fullscreenHeight = "1050px";
      }
    },
    //得到数据
    getTableData(
      pagesize,
      npage,
      startDate,
      EndDate,
      phonenume,
      interfaceCallType
    ) {
      let _this = this;
      _this.loading = true;
      httpGetCreditReport(pagesize, npage, startDate, EndDate, phonenume, 2)
        .then(res => {
          let data = res.data;
          _this.allpage = data.allsize;
          _this.currentPage = data.npage;
          _this.tableData = data.list;
          _this.loading = false;
        })
        .catch();
    },
    handleSearch() {
      this.currentPage = 1;
      if (this.select_time.length === 0) {
        this.getTableData(
          this.currentPage,
          this.pageSize,
          "",
          "",
          this.select_phone
        );
      } else {
        this.getTableData(
          this.currentPage,
          this.pageSize,
          ...select_time,
          this.select_phone
        );
      }
    },
    handleCurrentChange(val) {
      if (this.select_time.length === 0) {
        this.getTableData(val, this.pageSize, "", "", this.select_phone);
      } else {
        this.getTableData(
          val,
          this.pageSize,
          ...select_time,
          this.select_phone
        );
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(this.currentPage, this.pageSize);
    },

    Print() {
      $("#subOutputRank-print").print({
        //Use Global styles
        globalStyles: false,
        //Add link with attrbute media=print
        mediaPrint: false,
        //Custom stylesheet
        //Print in a hidden iframe
        //Don't print this
        //Add this at top
        stylesheet: "../static/css/print.css",
        prepend: "贝利风投<br/>"
        //Add this on bottom
        // append: "<br/>Buh Bye!"
      });
    }
  },
  mounted: function() {
    this.getTableData(
      this.currentPage,
      this.pageSize,
      "",
      "",
      this.select_phone,
      2
    );
  },
  created() {}
};
</script>

<style scoped>
.title {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
}
.input-width {
  width: 215px;
}
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.el-main-info {
  color: #999;
}
.l {
  float: left;
}
.r {
  float: right;
}
.report_t {
  overflow: hidden;
  color: #999;
}
.el-card {
  margin-top: 24px;
}
.panel_title {
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
  height: 40px;
  text-align: center;
}
.panel_title h2 {
  height: 30px;
  line-height: 30px;
  display: inline-block;
  background: #e88f08;
  color: #fff;
  border-radius: 100px;
  padding: 0;
  margin: 0;
  font-size: 16px;
  position: absolute;
  z-index: 99;
  width: 200px;
  left: 50%;
  margin-left: -100px;
}
.line {
  background: #e88f08;
  height: 4px;
  top: 13px;
  position: absolute;
  width: 100%;
  border-radius: 10px;
}
.table {
  width: 100%;
  border-radius: 2px;
  border: 1px solid #f1f1f1;
  border-bottom: none;
}
/* .table tr:hover {
  background:#c0b184 ;
} */
.table tr td {
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
}
.table tr th {
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 14px;
  text-align: left;
  background: #f7f7f9;
}

.table span {
  margin-right: 20px;
  display: inline-block;
}
span.item {
  width: 60px;
  font-weight: bold;
  text-align: right;
}
.tip_y {
  background: #5cb85c;
  padding: 2px 10px;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
}
span.remarks {
  display: block;
  padding-left: 85px;
  padding-top: 5px;
  color: #c0b184;
}

.tip {
  background: #ccbfae;
  padding: 2px 10px;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
}
.wrap {
  margin: 0 auto;
  padding: 20px;
  width: 640px;
  border: 1px solid #ccc;
}
.form .row {
  padding: 10px 0 0;
}
.btn {
  display: block;
  margin: 20px auto;
  padding: 8px 16px;
}
</style>

