const form = document.getElementById('form')
const inputSearch = document.getElementById('inputSearch')
const gallery = document.querySelector('.gallery')
const photo = document.querySelector('#photo')
const modal = document.querySelector('.modal')
const searchSubmit = document.getElementById('searchSubmit')
const closeBtn = document.querySelector('.btn')

window.addEventListener('load', () => {
    let preloader = document.querySelector('#preloader')
    preloader.style.display = 'none'
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    app.getListImage([])
    gallery.innerHTML = ''
    let search = inputSearch.value
    let preloader = document.querySelector('#preloader')
    preloader.style.display = 'flex'
    searchSubmit.disabled = true
    try {
        let res = await fetch(`https://api.unsplash.com/search/photos?per_page=10&page=1&query=${search}`, {
            method: 'GET',
            headers: {
                "Authorization": "Client-ID if4sGo-sjA-t3FS-7bT-1o874k7MD4Ll5q9qeqIpAoQ",
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        let result = await res.json()
        app.getListImage(result.results)
        app.render()
        inputSearch.value = ''
        searchSubmit.disabled = false
        preloader.style.display = 'none'
    } catch (e) {
        console.log(e)
        searchSubmit.disabled = false
    }

})
closeBtn.addEventListener('click', ()=>{
    app.closePhoto()
})

class App {
    constructor() {
        this.galleryArr = []
    }
    getListImage(galleryArr) {
        this.galleryArr = galleryArr
    }
    openPhoto(ev) {
        let full = ev.currentTarget.full
        let img = document.createElement('img');
        img.addEventListener('load', ()=>{
            let preloader = document.querySelector('#preloader')
            preloader.style.display = 'block'
            preloader.style.display = 'none'
        })
        img.src = full
        modal.className += ' temp'
        photo.appendChild(img)
    }
    closePhoto() {
        photo.removeChild(photo.children[0])
        modal.classList.remove('temp')
    }
    render() {
        this.galleryArr.map((item) => {
            let image = new Image();
            image.id = item.id
            image.src = item.urls.thumb
            image.full = item.urls.full
            image.addEventListener('click', this.openPhoto.bind(this))
            return (
                gallery.prepend(image)
            )
        })
    }
}

const app = new App()




// const form = document.getElementById('form')
// const inputSearch = document.getElementById('inputSearch')
// const searchSubmit = document.getElementById('searchSubmit')
// const gallery = document.querySelector('.gallery')
// const loader = document.querySelector('.loader')
// const photo = document.querySelector('#photo')
// const modal = document.querySelector('.modal')
//
// const galleryArr = []
//
// window.addEventListener('load', () => {
//     let preloader = document.querySelector('#preloader')
//     preloader.style.display = 'none'
// })
// form.addEventListener('submit', async (e) => {
//     e.preventDefault()
//     clearStack()
//     let search = inputSearch.value
//     let preloader = document.querySelector('#preloader')
//     preloader.style.display = 'flex'
//     searchSubmit.disabled = true
//     try {
//         let res = await fetch(`https://api.unsplash.com/search/photos?per_page=10&page=1&query=${search}`, {
//             method: 'GET',
//             headers: {
//                 "Authorization": "Client-ID if4sGo-sjA-t3FS-7bT-1o874k7MD4Ll5q9qeqIpAoQ",
//                 'Content-Type': 'application/json;charset=utf-8'
//             }
//         })
//         let result = await res.json()
//         addInArr(result.results)
//         renderPhotos()
//         inputSearch.value = ''
//         searchSubmit.disabled = false
//         preloader.style.display = 'none'
//     } catch (e) {
//         console.log(e)
//         searchSubmit.disabled = false
//     }
//
// })
//
//
// function clearStack(){
//     gallery.textContent = ''
//     if (gallery.children.length > 0){
//         for (let i=0; i<gallery.children.length;i++){
//             gallery.removeChild(gallery.children[i])
//         }
//     }
// }
// function addInArr(arr) {
//     debugger
//     for (let i = 0; i < arr.length; i++) {
//         const image = new Image();
//         image.id = arr[i].id
//         image.src = arr[i].urls.thumb
//         image.full = arr[i].urls.full
//         image.className = 'child-element'
//         image.onclick = function (ev) {
//             openPhoto(ev)
//         }
//         galleryArr.push(image)
//     }
// }
// function renderPhotos() {
//     for (let i = 0; i < galleryArr.length; i++) {
//         gallery.appendChild(galleryArr[i])
//     }
// }
// function openPhoto(ev) {
//     let full = ev.currentTarget.full
//     let img = document.createElement('img');
//     img.src = full
//     img.onload = function () {
//         loader.classList.remove('hidden')
//     };
//     modal.className += ' temp'
//     photo.appendChild(img)
// }
// function closePhoto() {
//     photo.removeChild(photo.children[0])
//     modal.classList.remove('temp')
// }

