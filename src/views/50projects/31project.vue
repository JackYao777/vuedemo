<template>
    <div class="box">
        <div class="phone">
            <img src="http://47.115.128.32:9000/vueadmin//UserIconpic/%E7%BA%A2%E8%8E%B2.jpg"
                alt="home" class="content show">
            <img src="http://47.115.128.32:9000/vueadmin//UserIconpic/bgimg.jpg"
                alt="work" class="content">
            <img src="http://47.115.128.32:9000/vueadmin//UserIconadminVue/Another03.jpg"
                alt="blog" class="content">
            <img src="http://47.115.128.32:9000/vueadmin//UserIconpic/bgimg.jpg"
                alt="about" class="content">
            <nav>
                <ul>
                    <li class="active">
                        <i class="fas fa-home"></i>
                        <p>Home</p>
                    </li>
                    <li>
                        <i class="fas fa-box"></i>
                        <p>Work</p>
                    </li>
                    <li>
                        <i class="fas fa-book-open"></i>
                        <p>Blog</p>
                    </li>
                    <li>
                        <i class="fas fa-users"></i>
                        <p>About Us</p>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const contents = document.querySelectorAll('.content')
        const listItems = document.querySelectorAll('nav ul li')

        listItems.forEach((item, idx) => {
            item.addEventListener('click', () => {
                hideAllContents()
                hideAllItems()

                item.classList.add('active')
                contents[idx].classList.add('show')
            })
        })

        function hideAllContents() {
            contents.forEach(content => content.classList.remove('show'))
        }


        function hideAllItems() {
            listItems.forEach(item => item.classList.remove('active'))
        }
    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
}

.box {
    background-color: rgba(155, 89, 182, 0.7);
    font-family: 'Open Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}

.phone {
    position: relative;
    overflow: hidden;
    border: 3px solid #eee;
    border-radius: 15px;
    height: 600px;
    width: 340px;
}

.phone .content {
    opacity: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% - 60px);
    width: 100%;
    transition: opacity 0.4s ease;
}

.phone .content.show {
    opacity: 1;
}

nav {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-top: -5px;
    width: 100%;
}

nav ul {
    background-color: #fff;
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 60px;
}

nav li {
    color: #777;
    cursor: pointer;
    flex: 1;
    padding: 10px;
    text-align: center;
}

nav ul li p {
    font-size: 12px;
    margin: 2px 0;
}

nav ul li:hover,
nav ul li.active {
    color: #8e44ad;
}
</style>