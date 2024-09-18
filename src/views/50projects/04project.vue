<template>
    <div class="box">
        <div class="search">
            <input type="text" class="input" placeholder="Search...">
            <button class="btn">
                <i class="el-icon-search"></i>
            </button>
        </div>
        <span>

        </span>
    </div>
</template>
<script>
export default {
    mounted() {
        const search = document.querySelector('.search')
        const btn = document.querySelector('.btn')
        const input = document.querySelector('.input')
        console.log('btn',btn);
        btn.addEventListener('click', () => {
            search.classList.toggle('active')
            input.focus()
        })
    },
}
</script>
<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    background: powderblue;
    overflow: hidden;

    .search {
        position: relative;
        height: 50px;
    }

    .search .input {
        background-color: #fff;
        border: 0;
        font-size: 18px;
        padding: 15px;
        height: 20px;
        width: 20px;
        transition: width 0.3s ease;
    }

    .btn {
        background-color: #fff;
        border: 0;
        cursor: pointer;
        font-size: 24px;
        position: absolute;
        top: 0;
        left: 0;
        height: 50px;
        width: 50px;
        transition: transform 0.3s ease;
    }

    .btn:focus,
    .input:focus {
        outline: none;
    }

    .search.active .input {
        width: 200px;
    }

    .search.active .btn {
        transform: translateX(198px);
    }
}
</style>