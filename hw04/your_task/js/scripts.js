const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    let url = "https://www.apitutor.org/spotify/simple/v1/search?type=track&q=" + term
    let trackSec = document.querySelector("#track-section")
    
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(track => {
            if (track.length == 0) {
                trackSec.querySelector("#tracks").innerHTML = "Track not found"
            }
            else {
                if (track.length > 5) {
                    for (i = 0; i < 5; i++) {
                        trackSec.querySelector("#tracks").innerHTML += 
                        `<section class="track-item preview" data-preview-track="${track[i].preview_url}" onclick="playTrack(event)">
                            <img src="${track[i].album.image_url}">
                            <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                                <h3>"${track[i].name}"</h3>
                                <p>${track[i].artist.name}</p>
                            </div>
                        </section>`;
                    }
                }
                else {
                    for (i = 0; i < track.length; i++) {
                        trackSec.querySelector("#tracks").innerHTML += 
                        `<section class="track-item preview" data-preview-track="${track[i].preview_url}" onclick="playTrack(event)">
                            <img src="${track[i].album.image_url}">
                            <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                                <h3>"${track[i].name}"</h3>
                                <p>${track[i].artist.name}</p>
                            </div>
                        </section>`;

                    }
                }
          
            }
        })
};

const getAlbums = (term) => {
    let url = "https://www.apitutor.org/spotify/simple/v1/search?type=album&q=" + term
    let albumSec = document.querySelector("#album-section")
    
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(album => {
            if (artist.length == 0) {
                albumSec.querySelector("#albums").innerHTML = "Album not found"
            }
            else {
                for (i = 0; i < album.length; i++) {
                    albumSec.querySelector("#albums").innerHTML += 
                `<section class="album-card" id="${album[i].id}">
                    <div>
                        <img src="${album[i].image_url}">
                        <h3>"${album[i].name}"</h3>
                        <div class="footer">
                            <a href="${album[i].spotify_url}" target="_blank">
                                View on Spotify
                            </a>
                        </div>
                    </div>
                </section>`
                }
            
            }
        })
};

const getArtist = (term) => {
    let url = "https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=" + term + "&limit1"
    
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(artist => {
            if (artist.length == 0) {
                document.querySelector("#artist").innerHTML = "Artist not found"
            }
            else {
            document.querySelector("#artist").innerHTML = 
                `<section class="artist-card" id="${artist[0].id}">
                    <div>
                        <img src="${artist[0].image_url}">
                        <h3>"${artist[0].name}"</h3>
                        <div class="footer">
                            <a href="${artist[0].spotify_url}" target="_blank">
                                View on Spotify
                            </a>
                        </div>
                    </div>
                </section>`
            }
        })
};

const playTrack = (event) => {
    let target = event.currentTarget;
    let url = target.getAttribute("data-preview-track");
    audioPlayer.setAudioFile(url);
    audioPlayer.play();
    document.querySelector("footer .track-item").innerHTML = target.innerHTML;
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};