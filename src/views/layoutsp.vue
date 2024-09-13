<template>
    <div style="margin-top:50px;">
        <div style="max-width:1350px; margin-top:50px; margin:auto; background:pink;display: flex;justify-content:center;flex-flow: wrap;">
            <!-- <slot>
            <template> -->
            <div  v-for="id, item in 10" style="flex:1 1 300px;max-width:300px; margin: 10px;">
                <ceshi :id="item"></ceshi>
            </div>
            <!-- </template>
</slot> -->
            <!-- <ceshi :id="id"></ceshi>
            <ceshi id="2"></ceshi>
            <ceshi id="3"></ceshi>
            <ceshi id="4"></ceshi>
            <ceshi id="5"></ceshi> -->
        </div></div>
</template>
<script>
import ceshi from './ceshi.vue';
export default {
    components: { ceshi },
    data() {
        return {
            id: "1"
        }
    }
}
</script>
<style lang="">

</style>