<template>
    <div class="box">
        <div class="container">
            <div class="progress-container">
                <div class="progress" id="progress"></div>
                <div class="circle active">1</div>
                <div class="circle">2</div>
                <div class="circle">3</div>
                <div class="circle">4</div>
            </div>
            <button class="btn" id="prev" disabled @click="clickPrev">Prev</button>
            <button class="btn" id="next" @click="clickNext">Next</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentActive: 1,
            // progress: document.getElementById('progress'),
            // prev: document.getElementById('prev'),
            // next: document.getElementById('next'),
            // circles: document.querySelectorAll('.circle')
        }
    },
    methods: {
        clickNext() {
            console.log('似懂非懂',document)
            const progress = document.getElementById('progress')
            const prev = document.getElementById('prev')
            const next = document.getElementById('next')
            const circles = document.querySelectorAll('.circle')
            this.currentActive++
            if (this.currentActive > circles.length) {
                this.currentActive = circles.length
            }
            this.update(circles, prev, next, progress)
        },
        clickPrev() {
            const progress = document.getElementById('progress')
            const prev = document.getElementById('prev')
            const next = document.getElementById('next')
            const circles = document.querySelectorAll('.circle')
            this.currentActive--;
            if (this.currentActive < 1) {
                this.currentActive = 1
            }
            this.update(circles, prev, next, progress)
        },
        update(circles, prev, next, progress) {
            circles.forEach((circle, idx) => {
                if (idx < this.currentActive) {
                    console.log('不合理')
                    circle.classList.add('active')
                } else {
                    circle.classList.remove('active')
                }
            })

            const actives = document.querySelectorAll('.active')

            progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'

            if (this.currentActive === 1) {
                prev.disabled = true
            } else if (this.currentActive === circles.length) {
                next.disabled = true
            } else {
                prev.disabled = false
                next.disabled = false
            }
        }
    },
    mounted() {
        // this.progress= document.getElementById('progress');
        // this.prev=document.getElementById('prev');
        // this.next=document.getElementById('next');
        // this.circles=document.querySelectorAll('.circle');
    }
}
</script>
<style lang="less" scoped>
.box {
    --line-border-fill: #3498db;
    --line-border-empty: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    border: 1px solid rebeccapurple;
}

.container {
    text-align: center;
    border: 1px solid sandybrown;
}

.progress-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 30px;
    max-width: 100%;
    width: 350px;
}

.progress-container::before {
    content: '';
    background-color: var(--line-border-empty);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    z-index: -1;
}

.progress {
    background-color: var(--line-border-fill);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 0%;
    z-index: -1;
    transition: 0.4s ease;
}

.circle {
    background-color: #fff;
    color: #999;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--line-border-empty);
    transition: 0.4s ease;
}

.circle.active {
    border-color: var(--line-border-fill);
}

.btn {
    background-color: var(--line-border-fill);
    color: #fff;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    font-family: inherit;
    padding: 8px 30px;
    margin: 5px;
    font-size: 14px;
}

.btn:active {
    transform: scale(0.98);
}

.btn:focus {
    outline: 0;
}

.btn:disabled {
    background-color: var(--line-border-empty);
    cursor: not-allowed;
}
</style>