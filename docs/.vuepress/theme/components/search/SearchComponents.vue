<script setup lang="ts">
import {theme} from "../../func/themeChange";
</script>

<template>
    <SearchBox :style="{
       backgroundColor: theme === null ? '#f2f0f6' : '#332844',
       color: theme === null ? '#101014' : '#ffffff',
       '--search-suggestions-text': theme === null ? '#101014' : '#ffffff',
       '--search-suggestions-bg': theme === null ? '#f2f0f6' : '#332844',
    }"></SearchBox>
</template>

<style scoped>

</style>