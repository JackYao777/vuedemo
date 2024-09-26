<template>
    <div class="box">
        <div>
            <h3>Double click on the image to <i class="el-icon-umbrella fa-heart"></i> it</h3>
            <small>You liked it <span id="times">0</span> times</small>
            <div class="loveMe"></div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const loveMe = document.querySelector('.loveMe')
        const times = document.querySelector('#times')

        let clickTime = 0
        let timesClicked = 0

        loveMe.addEventListener('click', (e) => {
            if (clickTime === 0) {
                clickTime = new Date().getTime()
                console.log('clickTiem', clickTime)
            } else {
                if ((new Date().getTime() - clickTime) < 800) {
                    createHeart(e)
                    clickTime = 0
                } else {
                    clickTime = new Date().getTime()
                    console.log('elseclickTiem', clickTime)
                }
            }
        })

        const createHeart = (e) => {
            const heart = document.createElement('i')
            heart.classList.add('el-icon-umbrella')
            heart.classList.add('fa-heart')

            const x = e.clientX
            const y = e.clientY

            const leftOffset = e.target.offsetLeft
            const topOffset = e.target.offsetTop

            const xInside = x - leftOffset
            const yInside = y - topOffset

            heart.style.top = `${yInside}px`
            heart.style.left = `${xInside}px`

            loveMe.appendChild(heart)

            times.innerHTML = ++timesClicked

            setTimeout(() => heart.remove(), 1000)
        }
    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
}

.box {
    font-family: 'Oswald', sans-serif;
    text-align: center;
    overflow: hidden;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
}

h3 {
    margin-bottom: 0;
    text-align: center;
    font-size: 20px;
}

small {
    display: block;
    margin-bottom: 20px;
    text-align: center;
}

.fa-heart {
    color: red;
}

.loveMe {
    height: 440px;
    width: 300px;
    background: url('http://47.115.128.32:9000/vueadmin//UserIconadminVue/Another03.jpg') no-repeat center center/cover;
    margin: auto;
    cursor: pointer;
    max-width: 100%;
    position: relative;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    overflow: hidden;
}

.loveMe .fa-heart {
    position: absolute;
    transform: translate(-50%, -50%) scale(0);
    animation: grow 0.6s linear;
}

@keyframes grow {
    to {
        transform: translate(-50%, -50%) scale(10);
        opacity: 0;
    }
}
</style>