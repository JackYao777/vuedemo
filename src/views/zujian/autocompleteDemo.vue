<template>
    <div>
        <el-autocomplete class="inline-input" v-model="state" :fetch-suggestions="querySearch" placeholder="请输入内容"
            @select="handleSelect" clearable @change="handleChange($event)" @blur="handleBlur($event)"
            @clear="handleClear($event)"></el-autocomplete>
        <el-button type="primary" @click="handleClick">搜索</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            restaurants: [],
            state: '',
            someData: 'Pending'
        };
    },
    methods: {
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 需要调用 callback 来返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "三全餐厅", "address": "天山西路游乐湖边" },
                { "value": "Hotdog", "address": "南京西路 hot dog  with chili" },
                // ... 更多数据
            ];
        },
        handleSelect(item) {
            console.log('选中的建议:', item);
        },
        handleBlur(obj) {
            this.someData = 'Pending';
            console.log('start handleBlur:');
            setTimeout(() => {
                console.log('end handleBlur:');
                this.someData = 'Processed';
            }, 500);
        },
        handleClear(obj) {
            console.log('start handleClear:', obj);
        },
        handleChange(obj) {
            console.log('start handleChange:', obj);
        },
        handleClick(event) {
            // 阻止点击事件直接触发，等待blur事件完成
            event.preventDefault();
            // 检查blur事件是否已处理
            if (this.someData === 'Processed') {
                // blur事件处理完毕后的逻辑
                console.log('Start Search');
                //处理业务逻辑
                console.log('End Search');
            } else {
                // blur事件还在处理中，可以设置标志或者使用Promise等待其完成
                console.log('Waiting for blur event to finish');
                // 假设你有一个Promise来检查someData状态
                this.waitForBlur().then(() => {
                    // blur事件处理完毕后的逻辑
                    console.log('Start Search');
                    //处理业务逻辑
                    console.log('End Search');
                });
            }
        },
        waitForBlur() {
            // 返回一个Promise，在someData更新时解决
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (this.someData === 'Processed') {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100);
            });
        },
    },
    mounted() {
        this.restaurants = this.loadAll();
    }
}
</script>
<style lang="less"></style>