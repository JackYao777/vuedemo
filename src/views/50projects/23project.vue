<template>
    <div class="box">
        <h1 id="text">Starting...</h1>
        <div>
            <label for="speed">Speed:</label>
            <input type="number" name="speed" id="speed" value="1" min="1" max="10" step="1">
        </div>

    </div>
</template>
<script>
export default {
    mounted() {
        const textEl = document.getElementById('text')
        const speedEl = document.getElementById('speed')
        const text = 'We Love Programming!'
        let idx = 1
        let speed = 300 / speedEl.value

        writeText()

        function writeText() {
            textEl.innerText = text.slice(0, idx)

            idx++

            if (idx > text.length) {
                idx = 1
            }

            setTimeout(writeText, speed)
        }


        speedEl.addEventListener('input', (e) => speed = 300 / e.target.value)
    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
}

.box {
    background-color: darksalmon;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;
    width: 100%;
}

div {
    position: absolute;
    bottom: 20px;
    background: rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    font-size: 18px;
}

input {
    width: 50px;
    padding: 5px;
    font-size: 18px;
    background-color: darksalmon;
    border: none;
    text-align: center;
}

input:focus {
    outline: none;
}
</style>