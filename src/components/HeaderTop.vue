<template>
    <header>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
            <el-menu-item index="0">
                <img
                    alt="Vue logo"
                    class="logo"
                    src="@/assets/olive.png"
                    width="115"
                    height="150"
                />
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="1">一起看</el-menu-item>
            <el-menu-item index="2">一起看</el-menu-item>
            <el-menu-item index="3">介绍</el-menu-item>
        </el-menu>
    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>
