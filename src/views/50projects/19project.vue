<template>
    <div class="box">
        <div class="slider-container">
            <div class="left-slide">
                <div style="background-color: #FD3555">
                    <h1>反叛的露露修</h1>
                    <p>all in pink</p>
                </div>
                <div style="background-color: #2A86BA">
                    <h1>死亡笔记</h1>
                    <p>with it's mountains</p>
                </div>
                <div style="background-color: #252E33">
                    <h1>未来日记</h1>
                    <p>in the wilderness</p>
                </div>
                <div style="background-color: #FFB866">
                    <h1>Another</h1>
                    <p>in the sunset</p>
                </div>
            </div>
            <div class="right-slide">
                <div
                    style="background-image: url('http://47.115.128.32:9000/vueadmin//UserIconadminVue/Another03.jpg')">
                </div>
                <div
                    style="background-image: url('http://47.115.128.32:9000/vueadmin//UserIconadminVue/10%E6%9C%8823%E6%97%A5%20(3)(2).jpg')">
                </div>
                <div
                    style="background-image: url('http://47.115.128.32:9000/vueadmin//UserIconpic/bgimg.jpg')">
                </div>
                <div
                    style="background-image: url('http://47.115.128.32:9000/vueadmin//UserIconpic/%E7%BA%A2%E8%8E%B2.jpg')">
                </div>
            </div>
            <div class="action-buttons">
                <button class="down-button">
                    <i class="el-icon-bottom" style="font-weight: bold;font-size: 20px;"></i>
                </button>
                <button class="up-button">
                    <i class="el-icon-top fa-arrow-up" style="font-weight: bold; font-size: 20px;"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const sliderContainer = document.querySelector('.slider-container')
        const slideRight = document.querySelector('.right-slide')
        const slideLeft = document.querySelector('.left-slide')
        const upButton = document.querySelector('.up-button')
        const downButton = document.querySelector('.down-button')
        const slidesLength = slideRight.querySelectorAll('div').length

        let activeSlideIndex = 0

        slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`

        upButton.addEventListener('click', () => changeSlide('up'))
        downButton.addEventListener('click', () => changeSlide('down'))

        const changeSlide = (direction) => {
            const sliderHeight = sliderContainer.clientHeight
            if (direction === 'up') {
                activeSlideIndex++
                if (activeSlideIndex > slidesLength - 1) {
                    activeSlideIndex = 0
                }
            } else if (direction === 'down') {
                activeSlideIndex--
                if (activeSlideIndex < 0) {
                    activeSlideIndex = slidesLength - 1
                }
            }

            slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
            slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
        }
    }
}
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Open Sans', sans-serif;
    height: 100vh;
}

.slider-container {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
}

.left-slide {
    height: 100%;
    width: 35%;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.5s ease-in-out;
}

.left-slide>div {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
}

.left-slide h1 {
    font-size: 40px;
    margin-bottom: 10px;
    margin-top: -30px;
}

.right-slide {
    height: 100%;
    position: absolute;
    top: 0;
    left: 35%;
    width: 65%;
    transition: transform 0.5s ease-in-out;
}

.right-slide>div {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 100%;
    width: 100%;
}

button {
    background-color: #fff;
    border: none;
    color: #aaa;
    cursor: pointer;
    font-size: 16px;
    padding: 15px;
}

button:hover {
    color: #222;
}

button:focus {
    outline: none;
}

.slider-container .action-buttons button {
    position: absolute;
    left: 35%;
    top: 50%;
    z-index: 100;
}

.slider-container .action-buttons .down-button {
    transform: translateX(-100%);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.slider-container .action-buttons .up-button {
    transform: translateY(-100%);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>