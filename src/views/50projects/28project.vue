<template>
    <div class="box">
        <div class="carousel">
            <div class="image-container" id="imgs">
                <img src="http://47.115.128.32:9000/vueadmin//UserIconadminVue/Another03.jpg" alt="first-image" />
                <img src="http://47.115.128.32:9000/vueadmin//UserIconadminVue/10%E6%9C%8823%E6%97%A5%20(3)(2).jpg"
                    alt="second-image" />
                <img src="http://47.115.128.32:9000/vueadmin//UserIconpic/bgimg.jpg" alt="third-image" />
                <img src="http://47.115.128.32:9000/vueadmin//UserIconpic/%E7%BA%A2%E8%8E%B2.jpg" alt="fourth-image" />
            </div>

            <!-- // docker run -it -d --name halo -p 8090:8090 -v ~/.halo2:/www/wwwroot/halo2 registry.fit2cloud.com/halo/halo:2.19 -->
            <div class="buttons-container">
                <button id="left" class="btn">Prev</button>
                <button id="right" class="btn">Next</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const imgs = document.getElementById('imgs')
        const leftBtn = document.getElementById('left')
        const rightBtn = document.getElementById('right')

        const img = document.querySelectorAll('#imgs img')

        let idx = 0

        let interval = setInterval(run, 2000)

        function run() {
            idx++
            changeImage()
        }

        function changeImage() {
            if (idx > img.length - 1) {
                idx = 0
            } else if (idx < 0) {
                idx = img.length - 1
            }

            imgs.style.transform = `translateX(${-idx * 500}px)`
        }

        function resetInterval() {
            clearInterval(interval)
            interval = setInterval(run, 2000)
        }

        rightBtn.addEventListener('click', () => {
            idx++
            changeImage()
            resetInterval()
        })

        leftBtn.addEventListener('click', () => {
            idx--
            changeImage()
            resetInterval()
        })

    }
}
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}

.box {
    font-family: 'Roboto', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}

img {
    width: 500px;
    height: 500px;
    object-fit: cover;
}

.carousel {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    height: 530px;
    width: 500px;
    overflow: hidden;
}

.image-container {
    display: flex;
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
}

.buttons-container {
    display: flex;
    justify-content: space-between;
}

.btn {
    background-color: rebeccapurple;
    color: #fff;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    width: 49.5%;
}

.btn:hover {
    opacity: 0.9;
}

.btn:focus {
    outline: none;
}
</style>