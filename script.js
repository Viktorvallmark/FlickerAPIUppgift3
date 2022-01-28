const btn = document.querySelector('button');
const KEY = '80f504ef0b8c81509970c71f21e8813c';
console.log(btn);




btn.addEventListener('click', function (event) {
    const searchField = document.querySelector('input');
    console.log(searchField.value);
    const size = document.getElementById('size');
    const checkSize = size.options[size.selectedIndex].value;
    console.log(checkSize);
    
    removeImg();

    const url = `https://www.flickr.com/services/rest/
    ?method=flickr.photos.search&api_key=${KEY}&text=${searchField.value}&format=json&nojsoncallback=1
    &per_page=1&page=1`;
    
    fetch(url).then(function (response) {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {

            throw 'HTTPS status Error!'
        }
        }).then(data => {console.log(data); imageURL(data.photos.photo[0])}).catch( handleError );
    
});

function imageURL(photoObject){
    let sizeValue = checkSize;
    let photo = photoObject;
    
    let imgURL = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sizeValue}.jpg`;
    displayImage(imgURL);
}

function displayImage(url){
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

function handleError(error){
    if(error === 'HTTPS status Error!'){
        const p = document.createElement('p');
        p.innerText = `${response.status} a HTTPS status Error occured!`;
        document.body.append(p);
    }else{
        const p1 = document.createElement('p');
        p1.innerText = `'You didn't choose a size on your picture!`;
        document.body.append(p1);
    }
   
}

function removeImg() {
    const images = document.querySelectorAll('img');
    for (const img of images) {
        img.remove();
    }
}