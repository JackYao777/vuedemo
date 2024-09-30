<template>
    <div class="box">
        <div id="panel" class="panel-container">
            <strong>How satisfied are you with our <br /> customer support performance?</strong>
            <div class="ratings-container">
                <div class="rating">
                    <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-17.png"
                        alt="">
                    <small>Unhappy</small>
                </div>

                <div class="rating">
                    <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-3.png"
                        alt="" />
                    <small>Neutral</small>
                </div>

                <div class="rating active">
                    <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-30.png"
                        alt="" />
                    <small>Satisfied</small>
                </div>
            </div>
            <button class="btn" id="send">Send Review</button>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const ratings = document.querySelectorAll('.rating')
        const ratingsContainer = document.querySelector('.ratings-container')
        const sendBtn = document.querySelector('#send')
        const panel = document.querySelector('#panel')

        let selectedRating = 'Satisfied'

        ratingsContainer.addEventListener('click', (e) => {
            if (e.target.parentNode.classList.contains('rating') && e.target.nextElementSibling) {
                removeActive()
                e.target.parentNode.classList.add('active')
                selectedRating = e.target.nextElementSibling.innerHTML
            } else if (
                e.target.parentNode.classList.contains('rating') &&
                e.target.previousSibling &&
                e.target.previousElementSibling.nodeName === 'IMG'
            ) {
                removeActive()
                e.target.parentNode.classList.add('active')
                selectedRating = e.target.innerHTML
            }

        })

        sendBtn.addEventListener('click', (e) => {
            panel.innerHTML = `
        <i class="fas fa-heart"></i>
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
    `
        })

        function removeActive() {
            for (let i = 0; i < ratings.length; i++) {
                ratings[i].classList.remove('active')
            }
        }

    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
}

.box {
    background-color: #fef9f2;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;
}

.panel-container {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    font-size: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
    max-width: 400px;
}

.panel-container strong {
    line-height: 20px;
}

.ratings-container {
    display: flex;
    margin: 20px 0;
}

.rating {
    flex: 1;
    cursor: pointer;
    padding: 20px;
    margin: 10px 5px;
}

.rating:hover,
.rating.active {
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.rating img {
    width: 40px;
}

.rating small {
    color: #555;
    display: inline-block;
    margin: 10px 0 0;
}

.rating:hover small,
.rating.active small {
    color: #111;
}

.btn {
    background-color: #302d2b;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 12px 30px;
    cursor: pointer;
}

.btn:focus {
    outline: 0;
}

.btn:active {
    transform: scale(0.98);
}

.fa-heart {
    color: red;
    font-size: 30px;
    margin-bottom: 10px;
}
</style>