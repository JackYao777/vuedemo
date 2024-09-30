<template>
    <div class="box">
        <div class="container">
            <h2>Verify Your Account</h2>
            <p>We emailed you the six digit code to cool_guy@email.com <br /> Enter the code below to confirm your email
                address.</p>
            <div class="code-container">
                <input type="number" class="code" placeholder="0" min="0" max="9" required>
                <input type="number" class="code" placeholder="0" min="0" max="9" required>
                <input type="number" class="code" placeholder="0" min="0" max="9" required>
                <input type="number" class="code" placeholder="0" min="0" max="9" required>
                <input type="number" class="code" placeholder="0" min="0" max="9" required>
                <input type="number" class="code lastcode" placeholder="0" min="0" max="9" required>
            </div>
            <small class="info">
                This is design only. We didn't actually send you an email as we don't have your email, right?
            </small>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const codes = document.querySelectorAll('.code')
        console.log('codes', codes)
        codes[0].focus()

        codes.forEach((code, idx) => {
            console.log('idx', idx)
            code.addEventListener('keydown', (e) => {
                if (e.key >= 0 && e.key <= 9) {
                    codes[idx].value = ''
                    if (e.target.classList.contains("lastcode")) {
                        console.log('这里就去做验证是否正确的验证码')
                    }
                    else {
                        setTimeout(() => codes[idx + 1].focus(), 10)
                        console.log('e', e)
                    }
                } else if (e.key === 'Backspace') {
                    setTimeout(() => codes[idx - 1].focus(), 10)
                }
            })
        })
    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
}

.box {
    background-color: #fbfcfe;
    font-family: 'Muli', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;
}

.container {
    background-color: #fff;
    border: 3px #000 solid;
    border-radius: 10px;
    padding: 30px;
    max-width: 1000px;
    text-align: center;
}

.code-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
}

.code {
    caret-color: transparent;
    border-radius: 5px;
    font-size: 75px;
    height: 120px;
    width: 100px;
    border: 1px solid #eee;
    margin: 1%;
    text-align: center;
    font-weight: 300;
    -moz-appearance: textfield;
}

.code::-webkit-outer-spin-button,
.code::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.code:valid {
    border-color: #3498db;
    box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.25);
}

.info {
    background-color: #eaeaea;
    display: inline-block;
    padding: 10px;
    line-height: 20px;
    max-width: 400px;
    color: #777;
    border-radius: 5px;
}

@media (max-width: 600px) {
    .code-container {
        flex-wrap: wrap;
    }

    .code {
        font-size: 60px;
        height: 80px;
        max-width: 70px;
    }
}
</style>