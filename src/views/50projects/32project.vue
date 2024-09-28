<template>
    <div class="contains">
        <button id="btn" class="magic">Magic 🎩</button>
        <div id="boxes" class="boxes big"></div>
    </div>
</template>
<script>
export default {
    mounted() {
        const boxesContainer = document.getElementById('boxes')
        const btn = document.getElementById('btn')

        btn.addEventListener('click', () => boxesContainer.classList.toggle('big'))

        function createBoxes() {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    const box = document.createElement('div')
                    box.classList.add('box')
                    box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`
                    boxesContainer.appendChild(box)
                }
            }
        }

        createBoxes()

    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
}

.contains {
    background-color: #fafafa;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
}

.magic {
    background-color: #f9ca24;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    border: 0;
    border-radius: 3px;
    font-size: 16px;
    padding: 12px 20px;
    cursor: pointer;
    position: fixed;
    top: 20px;
    letter-spacing: 1px;
    box-shadow: 0 3px rgba(249, 202, 36, 0.5);
    z-index: 100;
}

.magic:focus {
    outline: none;
}

.magic:active {
    box-shadow: none;
    transform: translateY(2px);
}

.boxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 500px;
    width: 500px;
    position: relative;
    transition: 0.4s ease;
}

.boxes.big {
    width: 600px;
    height: 600px;
}

.boxes.big .box {
    transform: rotateZ(360deg);
}

.box {
    // background-image: url('https://media.giphy.com/media/EZqwsBSPlvSda/giphy.gif');
    background-image: url('http://47.115.128.32:9000/vueadmin//UserIconadminVue/Another03.jpg');
    background-repeat: no-repeat;
    background-size: 500px 500px;
    position: relative;
    height: 125px;
    width: 125px;
    transition: 0.4s ease;
}

.box::after {
    content: '';
    background-color: #f6e58d;
    position: absolute;
    top: 8px;
    right: -15px;
    height: 100%;
    width: 15px;
    transform: skewY(45deg);
}

.box::before {
    content: '';
    background-color: #f9ca24;
    position: absolute;
    bottom: -15px;
    left: 8px;
    height: 15px;
    width: 100%;
    transform: skewX(45deg);
}
</style>