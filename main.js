const loveList = document.querySelector('.lover-list')

const fetchLoverList = async () => {
    const response = await fetch('https://reqres.in/api/users').then(req => req.json()).then(result => result.data)
    console.log(response);
    render(response);
}

function render(list){
    const html = list.map(item => (`
        <div class="lover-item">
            <div class="lover-item_img">
                <img src=${item.avatar} alt="">
            </div>
            <div class="lover-item_info">
                <h1 class="lover-item_name">${item.first_name} ${item.last_name}</h1>
                <p class="lover-item_email">${item.email}</p>
            </div>
            <div class="lover-item_icon>
            <i class="fa-solid fa-file-pen"></i>
                <i class="fa-solid fa-xmark remove"></i>
            </div>
        </div>`
    )).join('')
    loveList.innerHTML = html;
}






function App(){
    fetchLoverList();
}

App()