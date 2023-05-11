const endPoint = 'https://api.artic.edu/api/v1/artworks';
const artworkContainer = document.querySelector('.artwork-container');
const img = document.querySelector('.artwork');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const medium = document.querySelector('.medium');
const collection = document.querySelector('.collection');
const nextArworkButton = document.querySelector('.next-artwork');
const loader = document.querySelector('.loader');

//119697 is the number of artworks in the museum
function randomNumber(){
    return Math.floor(Math.random() * 119697 + 1);
}

async function fetchArt() {
    const response = await fetch(`${endPoint}/${randomNumber()}`);
    const data = await response.json();
    return data;
}

async function displayArt() {
    try {
        //turn loader on
        loader.classList.remove('hidden');
        //hide content till its loaded, and fade it in
        artworkContainer.classList.add('hidden');
        //clear the last image so it doesnt show up before the new one finishes loading
        img.src = '';
        
        //load the data for the new artwork
        await updateArtworkData();
        
        //turn loader off
        loader.classList.add('hidden');
        //show content
        artworkContainer.classList.remove('hidden');

    } catch {
        // if no artwork, load another one
        if(art.status === 404) {
            displayArt();
        }
    }
}

async function updateArtworkData() {
    art = await fetchArt();

    //update the image tag with new artwork
    img.src = `${art.config.iiif_url}/${art.data.image_id}/full/600,/0/default.jpg`;
    img.alt = art.data.thumbnail.alt_text;
    
    //update artwork info
    title.innerText = art.data.title;
    artist.innerText = art.data.artist_display;
    medium.innerText = art.data.medium_display;
    collection.innerText = art.data.credit_line;
}


//start the page
displayArt();


//load new artwork when button is pressed
nextArworkButton.addEventListener('click', displayArt);
