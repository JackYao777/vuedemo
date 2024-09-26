<template>
    <div class="box">
        <button class="add" id="add">
            <i class="fas fa-plus"></i> Add note
        </button>
    </div>
</template>
<script>
export default {
    mounted() {
        const addBtn = document.getElementById('add')
    
        const loveMe = document.querySelector('#box')
        const notes = JSON.parse(localStorage.getItem('notes'))

        if (notes) {
            notes.forEach(note => addNewNote(note))
        }

        addBtn.addEventListener('click', () => addNewNote())

        function addNewNote(text = '') {
            const note = document.createElement('div')
            note.classList.add('note')

            note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="el-icon-edit-outline fa-edit"></i></button>
        <button class="delete"><i class="el-icon-delete fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `
            const box=document.querySelector('.box')
            const box1=document.getElementsByClassName('box')
            const editBtn = note.querySelector('.edit')
            const deleteBtn = note.querySelector('.delete')
            const main = note.querySelector('.main')
            const textArea = note.querySelector('textarea')

            textArea.value = text
            main.innerHTML = text

            deleteBtn.addEventListener('click', () => {
                note.remove()

                updateLS()
            })

            editBtn.addEventListener('click', () => {
                main.classList.toggle('hidden')
                textArea.classList.toggle('hidden')
            })

            textArea.addEventListener('input', (e) => {
                const { value } = e.target

                main.innerHTML = text

                updateLS()
            })

            // document.body.appendChild(note)
             box1[0].appendChild(note);
            console.log('box',box)
            console.log('box1',box1[0])
        }

        function updateLS() {
            const notesText = document.querySelectorAll('textarea')

            const notes = []

            notesText.forEach(note => notes.push(note.value))

            localStorage.setItem('notes', JSON.stringify(notes))
        }
    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
    outline: none;
}

.box {
    background-color: #7bdaf3;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding-top: 3rem;
    width: 100%;
}

.add {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background-color: #9ec862;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 0.5rem 1rem;
    cursor: pointer;
}

.add:active {
    transform: scale(0.98);
}

.note {
    background-color: #fff;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
    margin: 30px 20px;
    height: 400px;
    width: 400px;
    overflow-y: scroll;
}

.note .tools {
    background-color: #9ec862;
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem;
}

.note .tools button {
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    margin-left: 0.5rem;
}

.note textarea {
    outline: none;
    font-family: inherit;
    font-size: 1.2rem;
    border: none;
    height: 400px;
    width: 100%;
    padding: 20px;
}

.main {
    padding: 20px;
}

.hidden {
    display: none;
}
</style>