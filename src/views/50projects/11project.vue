<template>
    <div class="box">
        <div class="container">
            <h3>Enter all of the choices divided by a comma (','). <br> Press enter when you're done</h3>
            <textarea placeholder="Enter choices here..." id="textarea"></textarea>
            <div id="tags"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tagsEl: null,
        }
    },
    methods: {
        createTags(input) {
            const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
            this.tagsEl.innerHTML = ''
            tags.forEach(tag => {
                const tagEl = document.createElement('span')
                tagEl.classList.add('tag')
                tagEl.innerText = tag
                this.tagsEl.appendChild(tagEl)
            })
        },
        randomSelect() {
            const times = 30
            const interval = setInterval(() => {
                const randomTag = this.pickRandomTag()

                if (randomTag !== undefined) {
                    this.highlightTag(randomTag)

                    setTimeout(() => {
                        this.unHighlightTag(randomTag)
                    }, 100)
                }
            }, 100);
            setTimeout(() => {
                clearInterval(interval)

                setTimeout(() => {
                    console.log('this', this)
                    const randomTag = this.pickRandomTag()

                    this.highlightTag(randomTag)
                }, 100)

            }, times * 100)
        },
        pickRandomTag() {
            console.log('pickRandomTag')
            const tags = document.querySelectorAll('.tag')
            console.log('pickRandomTag', tags)
            return tags[Math.floor(Math.random() * tags.length)]
        },
        highlightTag(tag) {
            // console.log('tag添加高光', tag)
            tag.classList.add('highlight')
            console.log('tag添加高光', tag.classList)
        },
        unHighlightTag(tag) {
            tag.classList.remove('highlight')
        }
    },
    mounted() {
        this.tagsEl = document.getElementById('tags')
        console.log('this.tagsEl', this.tagsEl)
        const textarea = document.getElementById('textarea')

        textarea.focus()

        textarea.addEventListener('keyup', (e) => {
            this.createTags(e.target.value)

            if (e.key === 'Enter') {
                setTimeout(() => {
                    e.target.value = ''
                }, 10)
                this.randomSelect()
            }
        })
    }
}
</script>
<style lang="less" scoped>
.box {
    background-color: #2b88f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    width: 100%;
}

h3 {
    color: #fff;
    margin: 10px 0 20px;
    text-align: center;
}

.container {
    width: 500px;

    textarea {
        border: none;
        display: block;
        width: 100%;
        height: 100px;
        padding: 10px;
        margin: 0 0 20px;
        font-size: 16px;
    }

    textarea:focus {
        outline: none;
    }

    // #tags {
        /deep/.tag {
            background-color: #f0932b;
            color: #fff;
            border-radius: 50px;
            padding: 10px 20px;
            margin: 0 5px 10px 0;
            font-size: 50px;
            display: inline-block;
        }

        /deep/.tag.highlight {
            background-color: #273c75;
        }
    // }
}
</style>