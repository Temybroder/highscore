// Instantiate as empty, to tie other objects to it
let virtualization = {};

// const loadYoutube = (mediaUrl) => {

// }

// function to initiate whole process
virtualization.initiatePlatform = (platform, mediaUrl, num_of_servers) => {

    if(platform == "youtube"){
     // fetch details from YOutube Data API v3 here
    let youtubeLink = mediaUrl;
    let loopBool = 1;
    let autoplayBool = 1;
    const autoChange = () => {
            
    }
    setInterval(autoChange, 3000);

    let youtubePayload = `<iframe width="420" height="315" src="${youtubeLink}?autoplay=${autoplayBool}&mute=1&controls=0&loop=${loopBool}"></iframe>}`
    return // youtubePayload;

    }
    if(platform == "spotify"){
        return loadSpotify()
    }
    if(platform == "deezer"){
        return loadDeezer()
    }
    if(platform == "apple_music"){
        return loadAppleMusic()
    }
    if(platform == "tidal"){
        return loadTidal()
    }
    if(platform == "amazon_music"){
        return loadAmazonMusic()
    }
    if(platform == "soundcloud"){
        return loadSoundCloud()
    }
    if(platform == "pandora"){
        return loadPandora()
    }
    if(platform == "google_play_music"){
        return loadGooglePlayMusic()
    }
    if(platform == "qobuz"){
        return loadQobuz()
    }
    if(platform == "mixcloud"){
        return loadMixcloud()
    }
    if(platform == "bandcamp"){
        return loadBandCamp()
    }
    if(platform == "napster"){
        return loadNapster()
    }
}


module.exports = virtualization;