<template>
    <div class="box">
        <div class="counter-container">
            <i class="el-icon-s-promotion fa-twitter fa-3x"></i>
            <div class="counter" data-target="12000"></div>
            <span>Twitter Followers</span>
        </div>

        <div class="counter-container">
            <i class="el-icon-s-opportunity fa-youtube fa-3x"></i>
            <div class="counter" data-target="5000"></div>
            <span>YouTube Subscribers</span>
        </div>

        <div class="counter-container">
            <i class="el-icon-camera-solid fa-facebook fa-3x"></i>
            <div class="counter" data-target="7500"></div>
            <span>Facebook Fans</span>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const counters = document.querySelectorAll('.counter')

        counters.forEach(counter => {
            counter.innerText = '0'

            const updateCounter = () => {
                const target = +counter.getAttribute('data-target')
                const c = +counter.innerText

                const increment = target / 200

                if (c < target) {
                    counter.innerText = `${Math.ceil(c + increment)}`
                    setTimeout(updateCounter, 1)
                } else {
                    counter.innerText = target
                }
            }

            updateCounter()
        })
    }
}
</script>
<style lang="less" scoped>
.box {
    background-color: #8e44ad;
    color: #fff;
    font-family: 'Roboto Mono', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;

    .counter-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin: 30px 50px;
    }

    .counter {
        font-size: 60px;
        margin: 10px;
        padding: 30px;
    }
}
</style>