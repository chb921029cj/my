<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.list">
                    <el-submenu :index ="item.nurl" :key="item.nurl">
                        <template>
                            
                        </template>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../common/bus";
export default {
  daata() {
    return {};
  }
};
</script>

<style scoped>
</style>

