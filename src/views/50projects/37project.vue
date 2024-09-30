<template>
    <div class="box">
        <button class="nav-btn open-btn">
            <i class="el-icon-s-fold fa-bars"></i>
        </button>

        <img src="https://logos-download.com/wp-content/uploads/2016/03/Netflix_Logo_2014-700x188.png" alt="Logo"
            class="logo">

        <p class="text">Mobile Navigation</p>

        <div class="nav nav-black">
            <div class="nav nav-red">
                <div class="nav nav-white">
                    <button class="nav-btn close-btn">
                        <i class="el-icon-s-fold fa-times"></i>
                    </button>

                    <img src="https://logos-download.com/wp-content/uploads/2016/03/Netflix_Logo_2014-700x188.png"
                        alt="Logo" class="logo">

                    <ul class="list">
                        <li><a href="#">Teams</a></li>
                        <li><a href="#">Locations</a></li>
                        <li><a href="#">Life at Netflix</a></li>
                        <li>
                            <ul>
                                <li><a href="#">Netflix culture memo</a></li>
                                <li><a href="#">Work life balance</a></li>
                                <li><a href="#">Inclusion & diversity</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const open_btn = document.querySelector('.open-btn')
        const close_btn = document.querySelector('.close-btn')
        const nav = document.querySelectorAll('.nav')

        open_btn.addEventListener('click', (e) => {
            nav.forEach(nav_el => nav_el.classList.add('visible'))
        })

        close_btn.addEventListener('click', (e) => {
            nav.forEach(nav_el => nav_el.classList.remove('visible'))
        })
    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
}

.box {
    font-family: 'Muli', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.text {
    text-transform: uppercase;
}

.logo {
    width: 150px;
}

.nav-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 20px;
}

.open-btn {
    position: fixed;
    top: 10px;
    left: 10px;
}

.nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
}

.nav.visible {
    transform: translateX(0);
}

.nav-black {
    background-color: rgb(34, 31, 31);
    width: 60%;
    max-width: 480px;
    min-width: 320px;
    transition-delay: 0.4s;
}

.nav-black.visible {
    transition-delay: 0s;
}

.nav-red {
    background-color: rgb(229, 9, 20);
    width: 95%;
    transition-delay: 0.2s;
}

.nav-red.visible {
    transition-delay: 0.2s;
}

.nav-white {
    background-color: #fff;
    width: 95%;
    padding: 40px;
    position: relative;
    transition-delay: 0s;
}

.nav-white.visible {
    transition-delay: 0.4s;
}

.close-btn {
    opacity: 0.3;
    position: absolute;
    top: 40px;
    right: 30px;
}

.list {
    list-style-type: none;
    padding: 0;
}

.list li {
    margin: 20px 0;
}

.list li a {
    color: rgb(34, 31, 31);
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
}

.list ul {
    list-style-type: none;
    padding-left: 20px;
}
</style>