<template>
    <div class="box">
        <h1>Scroll to see the animation</h1>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
        <div class="box-content">
            <h2>Content</h2>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            boxes: null
        }
    },
    methods: {
        checkBoxes() {
            const triggerBottom = window.innerHeight / 5 * 4
            console.log('triggerBottom', triggerBottom)
            this.boxes.forEach(box => {
                const boxTop = box.getBoundingClientRect().top
                console.log('boxTop',boxTop)
                if (boxTop < triggerBottom) {

                    box.classList.add('show')
                } else {
                    box.classList.remove('show')
                }
            })
        }
    },
    mounted() {
        this.boxes = document.querySelectorAll('.box-content')
        window.addEventListener('scroll', this.checkBoxes)
        this.checkBoxes()
    }
}

</script>
<style lang="less" scoped>
.box {
    width: 100%;
    // height: 100%;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    overflow-x: hidden;

    h1 {
        margin: 10px;
    }

    .box-content {
        background-color: steelblue;
        color: #aa2f2f;
        border: 1px solid orange;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 400px;
        height: 200px;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
        transform: translateX(400%);
        transition: transform 0.4s ease;
    }

    .box-content:nth-of-type(even) {
        transform: translateX(-400%);
    }

    .box-content{
        &.show{
            transform: translateX(0);
        }
    }
    // .box-content.show{
    //     transform: translateX(0);
    // }
}
</style>