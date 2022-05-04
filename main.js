const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const inputsElement = $$('.form-input input');
const openBtn = $('.btn-open');
const submitBtn = $('.btn-submit');
const cancelBtn = $('.btn-cancel');
const loverListRoot = $('.lover-list')
const form = $('.form');
const overlay = $('.overlay');
const formTitle = $('.form-title');

let isAdd = false;

let newLover = { first_name: '', last_name: '', email: '', avatar: '' };
let loverList = JSON.parse(localStorage.getItem('lovers')) || []


// const fetchLoverList = async () => {
//     const response = await fetch('https://reqres.in/api/users').then(req => req.json()).then(result => result.data)
//     loverList = response;
//     render();
// }

setTimeout(async () => {
    const response = await fetch('https://reqres.in/api/users').then(req => req.json()).then(result => result.data)
    loverList = response;
    render();
},2000)

function render() {
    const html = loverList.map((item, index) => {
        return `
        <div class="lover-item">
            <div class="lover-item_img">
                <img src=${item.avatar} alt="">
            </div>
            <div class="lover-item_info">
                <h1 class="lover-item_name">${item.first_name} ${item.last_name}</h1>
                <p class="lover-item_email">${item.email}</p>
            </div>
            <div class="lover-item_icon">
                <i class="fa-solid fa-marker btn-edit" onclick="edit(${index})"></i>
                <i class="fa-solid fa-xmark  bnt-delete" onclick="remove(${index})"></i>
            </div>
        </div>`
    }).join(' ');

    loverListRoot.innerHTML = html;
}

function getValueInput() {
    inputsElement.forEach(input => {
        input.onblur = (e) => {
            const value = e.target.value
            checkEmpty(e.target, value)
            switch (e.target.name) {
                case 'fname':
                    newLover.first_name = value.trim();
                    break;
                case 'lname':
                    newLover.last_name = value.trim();
                    break;
                case 'email':
                    newLover.email = value.trim();
                    break;
                case 'avatar':
                    newLover.avatar = value.trim();
                    break;
                default:
                    break;
                }
        }
    });
}

function checkHasValue() {
    let isHasValue = false;
    for (const prop in newLover) {
        if(newLover[prop] === ''){
            isHasValue = false;
            break;
        }
        isHasValue = true;
    }
    return isHasValue
}

function checkEmpty(input, value) {
    const formMessage = input.parentElement.querySelector('.form-message');

    if (value.trim() === '') {
        formMessage.innerText = 'Không được để trống';
        input.style.border = '2px solid red'
    } else {
        formMessage.innerText = ' ';
        input.style.border = '2px solid black'
    }
}

function unShow() {
    form.classList.add('hide');
    overlay.classList.add('hide');
    inputsElement.forEach(input => {
        const formMessage = input.parentElement.querySelector('.form-message');
        formMessage.innerText = ' ';
        input.style.border = '2px solid black'
        input.value = '';
    })
    newLover = {first_name: '', last_name: '', email: '', avatar: '' };
}

function show() {
    isAdd ? formTitle.innerText = 'Form Create' : formTitle.innerText = 'Form Edit'
    form.classList.remove('hide');
    overlay.classList.remove('hide');
}

function addOrEdit() {
    const isTrue = checkHasValue();
    if (isTrue && isAdd) {
        loverList.push({ ...newLover, id: Math.floor(Math.random() * 99 + 7) })
        unShow();
        render();
    }
    if(isTrue && !isAdd){
        loverList = loverList.map(item => item.id === newLover.id ? newLover : item)
        unShow();
        render();
    }    
}

function remove(index) {
    const isConfirm = confirm('Có chắc xóa hem dzị !!!')
    if (isConfirm) {
        loverList.splice(index, 1);
        render();
    }
}

function edit(index) {
    isAdd = false;
    const lover = loverList[index];
    newLover.id = lover.id
    inputsElement.forEach(input => {
        switch (input.name) {
            case 'fname':
                input.value = lover.first_name
                newLover.first_name = lover.first_name
                break;
            case 'lname':
                input.value = lover.last_name
                newLover.last_name = lover.last_name
                break;
            case 'email':
                input.value = lover.email
                newLover.email = lover.email
                break;
            case 'avatar':
                input.value = lover.avatar
                newLover.avatar = lover.avatar
                break;
            default:
                break;
        }
    })
    show();
}

cancelBtn.onclick = unShow;

openBtn.onclick = () => {
    isAdd = true;
    show();
}

submitBtn.onclick = addOrEdit;

function App() {
    // fetchLoverList();
    getValueInput();
}

App()