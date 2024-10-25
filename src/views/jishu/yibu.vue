<template>
    <div>
        <input type="text" ref="input" @blur="handleBlur" />
        <input type="text" ref="input1" @blur="handleBlurOne" />
        <button @click="handleClick">Click Me</button>
    </div>
</template>

<script>
export default {
    methods: {
        handleBlur() {
            this.someData = 'Started';
            // 模拟耗时操作
            setTimeout(async() => {
                console.log('Blur event handled');
                // 假设处理完毕后需要做的事情
                this.someData = 'Processed';
            }, 1000);
        },
        handleBlurOne() {
            // 模拟耗时操作
            this.someData = 'Started';
            setTimeout(async() => {
        
                console.log('Blur event handledOne');
                // 假设处理完毕后需要做的事情
                this.someData = 'Processed';
            }, 1000);
        },
        handleClick(event) {
            // 阻止点击事件直接触发，等待blur事件完成
            event.preventDefault();
            // 检查blur事件是否已处理
            if (this.someData === 'Processed') {
                // blur事件处理完毕后的逻辑
                console.log('Click event handled');
            } else {
                // blur事件还在处理中，可以设置标志或者使用Promise等待其完成
                console.log('Waiting for blur event to finish');
                // 假设你有一个Promise来检查someData状态
                this.waitForBlur().then(() => {
                    // blur事件处理完毕后的逻辑
                    console.log('Click event handled');
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
    data() {
        return {
            someData: 'Pending', // 初始化一个状态来跟踪处理状态
        };
    },
};
</script>