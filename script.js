const btn = document.querySelector('button');
const KEY = '80f504ef0b8c81509970c71f21e8813c';
// console.log(btn);

const size = document.querySelectorAll('option');
// console.log((size[3].value));




btn.addEventListener('click', function (event) {
    const searchField = document.querySelector('input');

    console.log(searchField.value);

    removeImg();

    const url = `https://www.flickr.com/services/rest/
    ?method=flickr.photos.search&api_key=${KEY}&text=${searchField.value}&format=json&nojsoncallback=1
    &per_page=1&page=1&auth_token=72157720831079831-771da81ee99d89b2&api_sig=a3f8527ce140198abe441f87b6718a73`;

    console.log(url);
    // fetch(url).then( fetchCallback ).then( handleSize ).then(function(data){ imageURL(data.photos.photo[0]);}).catch( handleError );
    
    fetch(url).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {

            throw 'HTTPS status Error!'
        }
    }).then(function (photoObject) {
        let sizeValue = handleSize();
        let photo = photoObject;
        
        let imgURL = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sizeValue}.jpg`;

        displayImage(imgURL);
    })

});



function handleSize(){
    let sizeValue = '';
    for(const opt of size){
        if(opt.value === 'q'){
            sizeValue = 'q';
            return sizeValue;

        }else if (opt.value === 'n'){
            sizeValue = 'n';
            return sizeValue;

        }else if (opt.value === 'z'){
            sizeValue = 'z';
            return sizeValue;

        }else if(opt.value === 'h'){
            sizeValue = 'h';
            return sizeValue;

        }else{
            throw 'Please choose a size!'
        }

    }
    // return sizeValue;
    
}


// function numberOfPics(response){

// }

// function imageURL(photoObject){
//     let photo = photoObject;

//     let imgURL = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sizeValue}.jpg`;

//     displayImage(imgURL);
// }

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