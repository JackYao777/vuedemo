<template>
    <div class="box">
        <h1>Random Image Feed</h1>
        <div class="container"></div>
    </div>
</template>
<script>
export default {
    mounted() {
        const container = document.querySelector('.container')
        const unsplashURL = 'https://source.unsplash.com/random/'
        const rows = 5

        for (let i = 0; i < rows * 3; i++) {
            const img = document.createElement('img')
            img.src = `${unsplashURL}${getRandomSize()}`
            container.appendChild(img)
        }

        function getRandomSize() {
            return `${getRandomNr()}x${getRandomNr()}`
        }

        function getRandomNr() {
            return Math.floor(Math.random() * 10) + 300
        }
    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
}

.box {
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
}

.title {
    margin: 10px 0 0;
    text-align: center;
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1000px;
}

.container img {
    object-fit: cover;
    margin: 10px;
    height: 300px;
    width: 300px;
    max-width: 100%;
}
</style>