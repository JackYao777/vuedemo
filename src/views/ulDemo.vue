<template>
    <!-- <div style="max-width: 1240px; height: 100px; background: pink; margin:0 auto; ">
    <ul style="display: flex; height: 100%; justify-content:flex-end;align-items: center;">
        <li>大师傅似的</li>
        <li>大师傅似的</li>
        <li>大师傅似的</li>
        <li>大师傅似的</li>
        <li>大师傅似的</li>
    </ul>
    </div> -->

    <div>
        <div class="fix-Box" :class="{ show: isFixed }" style="width: 100%;">
            <ul style="display: flex; height:53px; max-width: 1240px; background: red; margin: auto; justify-content:flex-end;align-items: center;position: relative;">
                <template v-if="true">
                    <li><a href="javascript:;"><i class="iconfont icon-user"></i>
                            王五
                        </a></li>
                    <li>
                        <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;" @click="$router.push('/member/order')">我的订单</a></li>
                    <li><a href="javascript:;" @click="$router.push('/member')">会员中心</a></li>
                </template>
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>

        <div style="background: #000; max-width: 1240px; margin: 0 auto;">
            <ul style="display: flex; height:53px; justify-content:flex-end;align-items: center;">
                <template v-if="true">
                    <li><a href="javascript:;"><i class="iconfont icon-user"></i>
                            王五
                        </a></li>
                    <li>
                        <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;" @click="$router.push('/member/order')">我的订单</a></li>
                    <li><a href="javascript:;" @click="$router.push('/member')">会员中心</a></li>
                </template>
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
        <div style="height: 1000px;"></div>
    </div>
</template>
<script>
import { useScroll } from '@vueuse/core'
export default {
    data() {
        return {
            isFixed: true
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.scroll)
    },
    methods: {
        scroll() {
            console.log(document.documentElement.scrollTop)
            if (document.documentElement.scrollTop >= 55) {
                this.isFixed = true
            } else {
                this.isFixed = false
            }
        }
    }
}
</script>
<style scoped lang="less">
ul>li {
    margin-left: 10px;

}

.fix-Box {
    margin: auto;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    // 此处为关键样式!!!
    // 状态一：往上平移自身高度 + 完全透明
    transform: translateY(-100%);
    opacity: 0;

    &.show {
        transition: all 0.3s linear;
        transform: none;
        opacity: 1;
    }
}

// .fix-Box {
//     max-width: 1240px;
//     position: fixed;
//     transform: translate(-100%);
//     opacity: 0;

//     &.show {
//         opacity: 1;
//         top: 0;
//         left: 50%;
//         transform: translateX(-50%);
//         // transition: all 0.3s;
//     }
// }</style>