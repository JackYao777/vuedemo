<template>
    <div class="box">
        <button class="toggle">Dark mode</button>
        <div class="clock-container">
            <div class="clock">
                <div class="needle hour"></div>
                <div class="needle minute"></div>
                <div class="needle second"></div>
                <div class="center-point"></div>
            </div>

            <div class="time"></div>
            <div class="date"></div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const hourEl = document.querySelector('.hour')
        const minuteEl = document.querySelector('.minute')
        const secondEl = document.querySelector('.second')
        const timeEl = document.querySelector('.time')
        const dateEl = document.querySelector('.date')
        const toggle = document.querySelector('.toggle')

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        toggle.addEventListener('click', (e) => {
            const html = document.querySelector('.box')
            if (html.classList.contains('dark')) {
                html.classList.remove('dark')
                e.target.innerHTML = 'Dark mode'
            } else {
                html.classList.add('dark')
                e.target.innerHTML = 'Light mode'
            }
        })

        function setTime() {
            const time = new Date();
            const month = time.getMonth()
            const day = time.getDay()
            const date = time.getDate()
            const hours = time.getHours()
            const hoursForClock = hours >= 13 ? hours % 12 : hours;
            const minutes = time.getMinutes()
            const seconds = time.getSeconds()
            const ampm = hours >= 12 ? 'PM' : 'AM'

            hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`
            minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`
            secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`

            timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
            dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
        }

        // StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
        const scale = (num, in_min, in_max, out_min, out_max) => {
            return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        }

        setTime()

        setInterval(setTime, 1000)

    }
}
</script>
<style lang="less" scoped>
.box {
    --primary-color: #000;
    --secondary-color: #fff;
    ----primarybox-color: #fff;
    --secondarybox-color: #333;

    font-family: 'Heebo', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;

    &.dark{
        background-color: #111;
        color: var(--primarybox-color);
    }

    .toggle {
        cursor: pointer;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        border: 0;
        border-radius: 4px;
        padding: 8px 12px;
        position: absolute;
        top: 100px;
    }

    .toggle:focus {
        outline: none;
    }

    .clock-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .clock {
        position: relative;
        width: 200px;
        height: 200px;
    }

    .needle {
        background-color: var(--primary-color);
        position: absolute;
        top: 50%;
        left: 50%;
        height: 65px;
        width: 3px;
        transform-origin: bottom center;
        transition: all 0.5s ease-in;
    }

    .needle.hour {
        transform: translate(-50%, -100%) rotate(0deg);
    }

    .needle.minute {
        transform: translate(-50%, -100%) rotate(0deg);
        height: 100px;
    }

    .needle.second {
        transform: translate(-50%, -100%) rotate(0deg);
        height: 100px;
        background-color: #e74c3c;
    }

    .center-point {
        background-color: #e74c3c;
        width: 10px;
        height: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
    }

    .center-point::after {
        content: '';
        background-color: var(--primary-color);
        width: 5px;
        height: 5px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
    }

    .time {
        font-size: 60px;
    }

    .date {
        color: #aaa;
        font-size: 14px;
        letter-spacing: 0.3px;
        text-transform: uppercase;
    }

    .date .circle {
        background-color: var(--primary-color);
        color: var(--secondarybox-color);
        border-radius: 50%;
        height: 18px;
        width: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 18px;
        transition: all 0.5s ease-in;
        font-size: 12px;
    }
}
</style>