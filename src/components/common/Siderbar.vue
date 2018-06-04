<template>
    <div class="sidebar" id="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.list">
                    <el-submenu :index="item.nurl" :key="item.nurl">
                        <template slot="title">
                            <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.list" :key="i" :index="subItem.nurl">
                            <i :class="subItem.icon"></i><span slot="title">{{subItem.mname}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.nurl" :key="item.nurl">
                        <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../common/bus";
import { httpGetCreditMenuList } from "@/api/http";
export default {
  data() {
    return {
      collapse: false,
      items: []
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    getHttpGetCreditMenuList() {
      let _this = this;
      httpGetCreditMenuList()
        .then(res => {
          let data = res.data;
          _this.items = data;
        })
        .catch(err => {
          console.log(err);
          _this.items = [
            {
              icon: "el-icon-setting",
              nurl: "dashb22oard",
              mname: "风险大2222盘概览",
              list: [
                {
                  icon: "el-icon-setting",
                  nurl: "riskTrend",
                  mname: "风险趋势"
                }
              ]
            },
            {
              icon: "el-icon-tickets",
              nurl: "table",
              mname: "报表统计",
              list: [
                {
                  icon: "el-icon-tickets",
                  nurl: "riskControlResult",
                  mname: "风险结果展示"
                }
              ]
            },
            {
              icon: "el-icon-message",
              nurl: "tabs",
              mname: "信用报告",
              list: [
                {
                  icon: "el-icon-tickets",
                  nurl: "operatorReport",
                  mname: "运营商报告列表"
                },
                {
                  icon: "el-icon-tickets",
                  nurl: "creditPredict",
                  mname: "信贷预测报告列表"
                }
              ]
            },
            {
              icon: "el-icon-message",
              nurl: "t2abs",
              mname: "财务管理",
              list: [
                {
                  icon: "el-icon-tickets",
                  nurl: "consumptionDetail",
                  mname: "消费明细"
                },
                {
                  icon: "el-icon-tickets",
                  nurl: "customerConsumption",
                  mname: "客户消费详情"
                }
              ]
            },
            {
              icon: "el-icon-message",
              nurl: "1tabs",
              mname: "风控配置管理",
              list: [
                {
                  icon: "el-icon-tickets",
                  nurl: "userDecision",
                  mname: "新增用户决策集管理"
                },
                {
                  icon: "el-icon-tickets",
                  nurl: "reditDecision",
                  mname: "复贷用户决策集管理"
                }
              ]
            },
            {
              icon: "el-icon-date",
              nurl: "3",
              mname: "账户管理",
              list: [
                {
                  nurl: "basicInformation",
                  mname: "基本资料"
                },
                {
                  nurl: "passwordManagement",
                  mname: "密码管理"
                }
              ]
            },
            {
              icon: "el-icon-star-on",
              nurl: "charts",
              mname: "信息查询",
              list: [
                {
                  icon: "el-icon-star-on",
                  nurl: "blacklist",
                  mname: "黑名单管理"
                },
                {
                  icon: "el-icon-star-on",
                  nurl: "whitelist",
                  mname: "白名单管理"
                }
              ]
            }
          ];
        });
    }
  },
  mounted() {
    this.getHttpGetCreditMenuList();
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
<style>
#sidebar .el-submenu__title,
.el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
}
#sidebar .el-submenu .el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  padding-left: 20px;
  min-width: 160px;
}
#sidebar .el-upload--text {
  height: 36px;
}
</style>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 185px;
}
.sidebar > ul {
  height: 100%;
}

.iconfont {
  margin-right: 5px;
}
</style>

