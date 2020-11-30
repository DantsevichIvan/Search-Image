const form = document.getElementById('form')
const inputSearch = document.getElementById('inputSearch')
const gallery = document.querySelector('.gallery')
const loader = document.querySelector('.loader')
const photo = document.querySelector('.photo')
const galleryArr = []

window.addEventListener('load', () => {
    loader.className += ' hidden'
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (galleryArr.length > 0){
        galleryArr.length = 0
        renderPhotos()
    }
    let search = inputSearch.value
    let res = await fetch(`https://api.unsplash.com/search/photos?per_page=10&page=1&query=${search}`, {
        method: 'GET',
        headers: {
            "Authorization": "Client-ID if4sGo-sjA-t3FS-7bT-1o874k7MD4Ll5q9qeqIpAoQ",
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    let result = await res.json()
    addInArr(result.results)
    renderPhotos()
    inputSearch.value = ''
})
function addInArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        const image = new Image();
        image.id = arr[i].id
        image.src = arr[i].urls.thumb
        image.full = arr[i].urls.full
        image.className = 'child-element'
        image.onclick = function (ev) {
            openPhoto(ev)
        }
        galleryArr.push(image)
    }
}
 function renderPhotos() {
    for (let i = 0; i < galleryArr.length; i++) {
        gallery.append(galleryArr[i])
    }
}
function openPhoto(ev) {
    let full = ev.currentTarget.full
    let img = document.createElement('img');
    img.src = full
    photo.className += ' temp'
    photo.appendChild(img)
}
function closePhoto(){
    const notebook_2 = document.querySelector('.child-element');
    console.log(notebook_2)
    notebook_2.remove()
    // photo.removeChild(notebook_2)
    photo.classList.remove('temp')
}
