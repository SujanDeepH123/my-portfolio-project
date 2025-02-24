async function getsongs() {

    let response = await fetch('http://127.0.0.1:5500/songs/');

    let data = await response.text();
    console.log(data);
    let div = document.createElement("div")
    div.innerHTML = data;
    let as = div.getElementsByTagName('a');
    console.log(as);
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const ele = as[index];
        if (ele.href.endsWith(".mp3")) {
            songs.push(ele.href.split('/songs/')[1]);
        }


    }
    return songs
}
let currentsong = new Audio();

async function main() {
    let songs = await getsongs();
    //   var audio = new Audio(songs[1]);
    // audio.play(); 
    playmusic(songs[0], true);
    let songul = document.querySelector('.songlist').getElementsByTagName('ul')[0];
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + ` <li>
                    <img src="music.svg" alt="music">
                    <div class="info">
                        <div class="songname">
                            ${song.replaceAll("%20", ' ')}
                        </div>
                        <div class="artist">
                            artist
                        </div>
                    </div>
                    <div class="playnow">
                        <span>play now</span>
                        <img src="play.svg" alt="play">
                    </div>
                   </li>`;
    }

    Array.from(document.querySelector('.songlist').getElementsByTagName('li')).forEach(e => {
        e.addEventListener('click', element => {
            playmusic(e.querySelector('.info').firstElementChild.innerHTML.trim());

        })

    })
    // atach an event listner to play,next,prev
    play.addEventListener('click', playfunc = () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "pause.svg"
        } else {
            currentsong.pause()
            play.src = "play.svg"
        }
    })
    currentsong.addEventListener('timeupdate', function () {
        // console.log(currentsong.currentTime,currentsong.duration)
        document.querySelector('.songtime').innerHTML = formatSongDuration(currentsong.currentTime) + '/' + formatSongDuration(currentsong.duration)
        document.querySelector('.circle').style.left = ((currentsong.currentTime / currentsong.duration) * 100) + "%";
    })
    // seeekng
    document.querySelector('.seekbar').addEventListener('click', function (e) {
        let percent=(e.offsetX / e.target.getBoundingClientRect().width) * 100;
        console.log((e.offsetX / e.target.getBoundingClientRect().width) * 100)
        document.querySelector('.circle').style.left = percent +"%"
        currentsong.currentTime=currentsong.duration*percent/100
}

)


}
const playmusic = (track, pause = false) => {
                                                                 
    // var audio = new Audio("/songs/" + track)
    currentsong.src = "/songs/" + track;
    if (!pause) {
        currentsong.play();
        play.src = "pause.svg"
    }

    document.querySelector('.songinfo').innerHTML = decodeURI(track)
    document.querySelector('.songtime').innerHTML = '00:00/00:00'

}

main();


function formatSongDuration(seconds) {
    seconds = Math.floor(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}







