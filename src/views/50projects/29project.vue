<template>
    <div class="box">
        <div class="container" id="container"></div>
    </div>
</template>
<script>
export default {
    mounted() {
        const container = document.getElementById('container')
        const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']
        const SQUARES = 500

        for (let i = 0; i < SQUARES; i++) {
            const square = document.createElement('div')
            square.classList.add('square')

            square.addEventListener('mouseover', () => setColor(square))

            square.addEventListener('mouseout', () => removeColor(square))

            container.appendChild(square)
        }

        function setColor(element) {
            const color = getRandomColor()
            element.style.background = color
            element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
        }

        function removeColor(element) {
            element.style.background = '#1d1d1d'
            element.style.boxShadow = '0 0 2px #000'
        }

        function getRandomColor() {
            return colors[Math.floor(Math.random() * colors.length)]
        }
    }
}
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}

.box {
    background-color: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 400px;
}

/deep/ .square {
    background-color: #1d1d1d;
    box-shadow: 0 0 2px #000;
    height: 16px;
    width: 16px;
    margin: 2px;
    transition: 2s ease;
}

/deep/ .square:hover {
    transition-duration: 0s;
}
</style>