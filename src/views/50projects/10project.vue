<template>
    <div class="box">
        <h1>Frequently Asked Questions</h1>
        <div class="faq-container">
            <div class="faq active">
                <h3 class="faq-title">
                    Why shouldn't we trust atoms?
                </h3>

                <p class="faq-text">
                    They make up everything
                </p>

                <button class="faq-toggle">
                    <i class="el-icon-arrow-down fa-chevron-down"></i>
                    <i class="el-icon-close fa-times"></i>
                </button>
            </div>

            <div class="faq">
                <h3 class="faq-title">
                    What do you call someone with no body and no nose?
                </h3>
                <p class="faq-text">
                    Nobody knows.
                </p>
                <button class="faq-toggle">
                    <i class="el-icon-arrow-down fa-chevron-down"></i>
                    <i class="el-icon-close fa-times"></i>
                </button>
            </div>

            <div class="faq">
                <h3 class="faq-title">
                    What's the object-oriented way to become wealthy?
                </h3>
                <p class="faq-text">
                    Inheritance.
                </p>
                <button class="faq-toggle">
                    <i class="el-icon-arrow-down fa-chevron-down"></i>
                    <i class="el-icon-close fa-times"></i>
                </button>
            </div>

            <div class="faq">
                <h3 class="faq-title">
                    How many tickles does it take to tickle an octopus?
                </h3>
                <p class="faq-text">
                    Ten-tickles!
                </p>
                <button class="faq-toggle">
                    <i class="el-icon-arrow-down fa-chevron-down"></i>
                    <i class="el-icon-close fa-times"></i>
                </button>
            </div>

            <div class="faq">
                <h3 class="faq-title">
                    What is: 1 + 1?
                </h3>
                <p class="faq-text">
                    Depends on who are you asking.
                </p>
                <button class="faq-toggle">
                    <i class="el-icon-arrow-down fa-chevron-down"></i>
                    <i class="el-icon-close fa-times"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const toggles = document.querySelectorAll('.faq-toggle')

        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.parentNode.classList.toggle('active')
            })
        })
    }
}
</script>
<style lang="less" scoped>
.box {
    height: 100%;

    h1 {
        margin: 50px 0 30px;
        font-weight: bold;
        text-align: center;
        font-size: 40px;
    }

    .faq-container {
        max-width: 600px;
        margin: 0 auto;

        .faq {
            background-color: transparent;
            border: 1px solid #9fa4a8;
            border-radius: 10px;
            margin: 20px 0;
            padding: 30px;
            position: relative;

            h3 {
                font-size: 20px;
                font-weight: bold;
            }

            .faq-title {
                margin: 0 35px 0 0;
            }

            .faq-text {
                display: none;
                margin: 30px 0 0;
            }

            .faq-toggle {
                background-color: transparent;
                border: 0;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                padding: 0;
                position: absolute;
                top: 30px;
                right: 30px;
                height: 30px;
                width: 30px;

            }

            .faq-toggle .fa-times {
                display: none;
            }
        }

        .faq.active {
            // &.active{
            background-color: #fff;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
            // }
        }

        .faq.active::before,
        .faq.active::after {
            content: '\f075';
            font-family: 'Font Awesome 5 Free';
            color: #2ecc71;
            font-size: 7rem;
            position: absolute;
            opacity: 0.2;
            top: 20px;
            left: 20px;
            z-index: 0;
        }

        .faq.active::before {
            color: #3498db;
            top: -10px;
            left: -30px;
            transform: rotateY(180deg);
        }

        .faq.active .faq-text {
            display: block;
        }

        .faq.active .faq-toggle .fa-times {
            color: #292626;
            display: block;
        }

        .faq.active .faq-toggle .fa-chevron-down {
            display: none;
        }

        .faq.active .faq-toggle {
            background-color: #9fa4a8;
        }

    }
}
</style>