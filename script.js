const btn = document.querySelector('button');
const KEY = '80f504ef0b8c81509970c71f21e8813c';
console.log(btn);

const size = document.getElementById('size');
const checkSize = size.options[size.selectedIndex].value;
console.log(checkSize);

btn.addEventListener('click', function(event) {
    event.preventDefault();
    const searchField = document.querySelector('input');
    console.log(searchField.value);
   
    removeImg();

    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchField.value}&format=json&nojsoncallback=1&per_page=1&page=1`;
    
    let k = fetch(url).then(handleResponse).then(buildURL).then(displayImage).catch(handleError);
    console.log(k);
    
});

function handleResponse(response){
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        throw 'Error!'
    }
}

function buildURL(data){
    let size = checkSize;
    let imgURL = `https://live.staticflickr.com/${data.photos.photo[0].server}/${data.photos.photo[0].id}_${data.photos.photo[0].secret}_${size}.jpg`;
    return imgURL;
}

function displayImage(url){
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

function handleError(error){
    if(error){
        const h2 = document.createElement('h2');
        h2.innerText = `Something went wrong, try a different search query!`;
        document.body.append(h2);
    }
}

function removeImg() {
    const images = document.querySelectorAll('img');
    for (const img of images) {
        img.remove();
    }
}