const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//variable to storing images from Unsplash
let photosArray = [];

//variables for tracking images loaded
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
 

// Unsplash API
const count = 10;
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'LQosfm8zmEkl9cWcF3KxNFqiNrU6lIkyuKvBH7V8mvQ';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {

    //Calculating total images to determine readiness to load more photos
    totalImages = photosArray.length;

    
    //resetting imagesLoaded; we are tracking it in conjunction with totalimages; 
    // totalImages resets each time photosArray loads
    imagesLoaded = 0;

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to full photo
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
    
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Calls 'imageLoaded' function when images are loaded
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Calculate end of page and begin loading more photos
window.addEventListener('scroll', ()=> {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos()
        //offsetHeight is the total length; 
        //scrollY is the legnth traveled; 
        //innerheight is the window view
        // ready is booleon from line 30
        
        ready = false;
        // resetting ready to false to prevent inadvertant API call
    }
})

// On Load
getPhotos();


