<template>
    <div class="box">
        <h1>Drink Water</h1>
        <h3>Goal: 2 Liters</h3>

        <div class="cup">
            <div class="remained" id="remained">
                <span id="liters"></span>
                <small>Remained</small>
            </div>

            <div class="percentage" id="percentage"></div>
        </div>

        <p class="text">Select how many glasses of water that you have drank</p>

        <div class="cups">
            <div class="cup cup-small">250 ml</div>
            <div class="cup cup-small">250 ml</div>
            <div class="cup cup-small">250 ml</div>
            <div class="cup cup-small">250 ml</div>
            <div class="cup cup-small">250 ml</div>
            <div class="cup cup-small">250 ml</div>
            <div class="cup cup-small">250 ml</div>
            <div class="cup cup-small">250 ml</div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const smallCups = document.querySelectorAll('.cup-small')
        const liters = document.getElementById('liters')
        const percentage = document.getElementById('percentage')
        const remained = document.getElementById('remained')

        updateBigCup()

        smallCups.forEach((cup, idx) => {
            cup.addEventListener('click', () => highlightCups(idx))
        })

        function highlightCups(idx) {
            if (idx === 7 && smallCups[idx].classList.contains("full")) idx--;
            else if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
                idx--
            }

            //小杯上色 
            smallCups.forEach((cup, idx2) => {
                if (idx2 <= idx) {
                    cup.classList.add('full')
                } else {
                    cup.classList.remove('full')
                }
            })
            
            //大杯上色
            updateBigCup()
        }

        function updateBigCup() {
            const fullCups = document.querySelectorAll('.cup-small.full').length
            const totalCups = smallCups.length

            if (fullCups === 0) {
                percentage.style.visibility = 'hidden'
                percentage.style.height = 0
            } else {
                percentage.style.visibility = 'visible'
                percentage.style.height = `${fullCups / totalCups * 330}px`
                percentage.innerText = `${fullCups / totalCups * 100}%`
            }

            if (fullCups === totalCups) {
                remained.style.visibility = 'hidden'
                remained.style.height = 0
            } else {
                remained.style.visibility = 'visible'
                liters.innerText = `${2 - (250 * fullCups / 1000)}L`
            }
        }
    }
}
</script>
<style lang="less" scoped>
.box {
    --border-color: #144fc6;
    --fill-color: #6ab3f8;
    background-color: #3494e4;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    height: 100%;

    h1 {
        margin: 10px 0 0;
    }

    h3 {
        font-weight: 400;
        margin: 10px 0;
    }

    .cup {
        background-color: #fff;
        border: 4px solid var(--border-color);
        color: var(--border-color);
        border-radius: 0 0 40px 40px;
        height: 330px;
        width: 150px;
        margin: 30px 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .cup.cup-small {
        height: 95px;
        width: 50px;
        border-radius: 0 0 15px 15px;
        background-color: rgba(255, 255, 255, 0.9);
        cursor: pointer;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 5px;
        transition: 0.3s ease;
    }

    .cup.cup-small.full {
        background-color: var(--fill-color);
        color: #fff;
    }

    .cups {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 280px;
    }

    .remained {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex: 1;
        transition: 0.3s ease;
    }

    .remained span {
        font-size: 20px;
        font-weight: bold;
    }

    .remained small {
        font-size: 12px;
    }

    .percentage {
        background-color: var(--fill-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 30px;
        height: 0;
        transition: 0.3s ease;
    }

    .text {
        text-align: center;
        margin: 0 0 5px;
    }
}
</style>