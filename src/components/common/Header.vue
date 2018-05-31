<template>
    <div class="header" >
        <!-- 折叠按钮 -->
        <div class="header-btn">
            <i class="el-icon-menu"></i>
        </div>
        <div class="header-logo">
            贝利风投
        </div>
        <div class="header-right">
            <!-- 全屏显示 -->
            <div class="header-fullscreen">
                <el-tooltip effect="dark" placement="bottom">
                    <i class="el-icon-rank"></i>
                </el-tooltip>
            </div>
            <!-- 用户头像 -->
            <div class="header-user-avator">
                <img src="static/img/img.jpg" alt="">
            </div>
            <!-- 用户名下拉列表 -->
            <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}<i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >基本资料</el-dropdown-item>
                    <el-dropdown-item >基本资料</el-dropdown-item>
                    <el-dropdown-item >基本资料</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="btn-bell" >
                <el-color-picker>

                </el-color-picker>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin"
    };
  },
  methods: {
    handleCommand() {}
  }
};
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #fff;
  background: #000;
}
.header-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 50px;
}
.header-logo {
  float: left;
  width: 250px;
  line-height: 50px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
</style>
