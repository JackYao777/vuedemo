<template>
    <div class="box">
        <div id="toasts"></div>

        <button class="btn" id="button">Show Notification</button>
    </div>
</template>
<script>
export default {
    mounted() {
        const button = document.getElementById('button')
        const toasts = document.getElementById('toasts')

        const messages = [
            'Message One',
            'Message Two',
            'Message Three',
            'Message Four',
        ]

        const types = ['info', 'success', 'error']

        button.addEventListener('click', () => createNotification())

        function createNotification(message = null, type = null) {
            const notif = document.createElement('div')
            notif.classList.add('toast')
            notif.classList.add(type ? type : getRandomType())

            notif.innerText = message ? message : getRandomMessage()

            toasts.appendChild(notif)

            setTimeout(() => {
                notif.remove()
            }, 3000)
        }

        function getRandomMessage() {
            return messages[Math.floor(Math.random() * messages.length)]
        }

        function getRandomType() {
            return types[Math.floor(Math.random() * types.length)]
        }
    }
}
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}

.box {
    background-color: rebeccapurple;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;

    .btn {
        background-color: #ffffff;
        color: rebeccapurple;
        font-family: inherit;
        font-weight: bold;
        padding: 1rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }

    .btn:focus {
        outline: none;
    }

    .btn:active {
        transform: scale(0.98);
    }

    #toasts {
        position: fixed;
        bottom: 10px;
        right: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        /deep/ .toast {
            background-color: #fff;
            border-radius: 5px;
            padding: 1rem 2rem;
            margin: 0.5rem;
        }

        /deep/ .toast.info {
            color: rebeccapurple;
        }

        /deep/ .toast.success {
            color: green;
        }

        /deep/ .toast.error {
            color: red;
        }
    }
}
</style>