<template>
        <div class="box">
            <div class="circle-container" :class="{ open: open }">
                <div class="circle">
                    <div class="circle-btn">
                        <span id="close" :class="{ close: close }" @click="closeF">
                            关闭
                        </span>
                        <span id="open" :class="{ open: open }" @click="openF">
                            打开
                        </span>
                    </div>
                </div>
            </div>


            <div class="content" :class="{ open: open }">
                <h1>Amazing Article</h1>
                <small>Florin Pop</small>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quia in ratione dolores
                    cupiditate, maxime aliquid impedit dolorem nam dolor omnis atque fuga labore modi veritatis porro
                    laborum minus, illo, maiores recusandae cumque ipsa quos. Tenetur, consequuntur mollitia labore
                    pariatur sunt quia harum aut. Eum maxime dolorem provident natus veritatis molestiae cumque quod
                    voluptates ab non, tempore cupiditate? Voluptatem, molestias culpa. Corrupti, laudantium iure
                    aliquam rerum sint nam quas dolor dignissimos in error placeat quae temporibus minus optio eum
                    soluta cupiditate! Cupiditate saepe voluptates laudantium. Ducimus consequuntur perferendis
                    consequatur nobis exercitationem molestias fugiat commodi omnis. Asperiores quia tenetur nemo ipsa.
                </p>

                <h3>My Dog</h3>
                <img src="http://47.115.128.32:9000/vueadmin//UserIconadminVue/捕获.PNG" height="500px" width="100%"
                    alt="doggy" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti rerum quo, incidunt vel
                    consequatur culpa ullam. Magnam facere earum unde harum. Ea culpa veritatis magnam at aliquid.
                    Perferendis totam placeat molestias illo laudantium? Minus id minima doloribus dolorum fugit
                    deserunt qui vero voluptas, ut quia cum amet temporibus veniam ad ea ab perspiciatis, enim accusamus
                    asperiores explicabo provident. Voluptates sint, neque fuga cum illum, tempore autem maxime
                    similique laborum odio, magnam esse. Aperiam?</p>
            </div>

            <nav>
                <ul>
                    <li :class="{ shownav: open }"><i class="fas fa-home"></i><a href="#"> Home</a></li>
                    <li :class="{ shownav: open }"><i class="fas fa-user-alt"></i><a href="#"> About</a></li>
                    <li :class="{ shownav: open }"><i class="fas fa-envelope"></i><a href="#"> Contact</a></li>
                </ul>
            </nav>

        </div>

</template>
<script>
export default {
    data() {
        return {
            open: false,
            close: false,
        }
    },
    methods: {
        openF() {
            this.close = false;
            this.open = true;
        },
        closeF() {
            this.open = false;
            this.close = true;
        }
    }
}
</script>
<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;
    border: 1px solid pink;
    position: relative;
    padding: 50px;
    background:pink;



    .circle-container {
        width: 200px;
        height: 200px;
        // border: 1px solid chartreuse;
        position: absolute;
        left: -100px;
        top: -100px;
        border-radius: 50%;
        background-color: #ff7979;
        transition: transform 0.5s linear;

        &.open {
            transform: rotate(-70deg);
        }

        .circle {
            // border: 1px solid sienna;
            width: 100%;
            height: 100%;
            text-align: center;
            position: relative;

            .circle-btn {
                // border: 1px solid skyblue;
                position: absolute;
                bottom: 20%;
                left: 15%;

                span {
                    cursor: pointer;
                    padding: 0 15px;
                    width: 50%;
                    font-size: 20px;
                    background-color: transparent;
                }
            }

        }

    }

    .content {
        background-color: aqua;
        border: 1px solid orange;
        width: 1250px;
        margin: auto;
        transition: transform 0.5s linear;

        &.open {
            transform: rotateZ(-20deg);
        }

        h1 {
            font-size: 48px;
            padding: 15px;
        }

        h3 {
            font-size: 30px;
            padding: 10px;
        }

        small {
            font-size: 24px;
            padding: 15px;
        }

        p {
            font-size: 18px;
            padding: 15px;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
    }

    nav {
        position: fixed;
        bottom: 40px;
        left: 0;
        z-index: 100;
       
    }

    nav ul {
        list-style-type: none;
        padding-left: 30px;
    }

    nav ul li {
        text-transform: uppercase;
        color: #fff;
        margin: 40px 0;
        transform: translateX(-100%);
        transition: transform 0.4s ease-in;
        &.shownav{
            transform: translateX(0);
            transition-delay: 0.3s;
        }
    }

    nav ul li i {
        font-size: 20px;
        margin-right: 10px;
    }

    nav ul li+li {
        margin-left: 15px;
        transform: translateX(-150%);
        &.shownav{
            transform: translateX(0);
            transition-delay: 0.4s;
        }
    }

    nav ul li+li+li {
        margin-left: 30px;
        transform: translateX(-200%);
        &.shownav{
            transform: translateX(0);
            transition-delay: 0.5s;
        }
    }

    nav a {
        color: #fafafa;
        text-decoration: none;
        transition: all 0.5s;
    }

    nav a:hover {
        color: #FF7979;
        font-weight: bold;
    }
}
</style>