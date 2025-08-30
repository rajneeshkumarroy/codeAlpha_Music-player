const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playlistEl = document.getElementById("playlist");
let songs = [
  { title: "Meri Maa Ke Barabar", artist: "Jubin Nautiyal", src: "Meri Maa.mp3" },
  { title: "Knife Brows", artist: "Dhanda Nyoliwala", src: "Knife Brows.mp3" },
  { title: "Pal Pal Dil ke Pas", artist: "Kishore Kumar", src: "Pal Pal Dil ke Pas.mp3" },
  { title: "Yu To Akela", artist: "Kishore Kumar", src: "Yu To Akela.mp3" },
  { title: "Namami Shamishan", artist: "Kishore Kumar", src: "Namami Shamishan.mp3" },
  { title: "Kya Khoob Lagti Ho", artist: "Mukesh And Kanchan", src: "Kya Khoob Lagti Ho.mp3" },
  { title: "295", artist: "Sidhu Moosewala", src: "295 - Sidhu Moose Wala.mp3" },
  { title: "Do Gallan", artist: "Garry Sandhu", src: "Do Gallan.mp3" },
  { title: "Bebe Bapu", artist: "Harsh Likhari", src: "Bebe Bapu Harsh Likhari.mp3" },
  { title: "Andekhi Anjaani", artist: "Lata Mangeshkar", src: "Andekhi Anjaani.mp3" },
  { title: "English Medium", artist: "Masoom Sharma", src: "English Medium - Masoom Sharma.mp3" },
  { title: "Green Flag", artist: "Vikram Sarkar", src: "Green Flag Vikram Sarkar.mp3" },
  { title: "Hide Karke", artist: "Lakhi Natt", src: "Hide Karke Lakhi Natt.mp3" },
  { title: "Mai So Khau Tere Sar Ki", artist: "Raju Punjabi", src: "Mai So Khau Tere Sar Ki.mp3" },
  { title: "Mere Ghar Ram Aaye Hain", artist: "Jubin Nautiyal", src: "Mere Ghar Ram Aaye Hain Jubin Nautiyal.mp3" },
  { title: "On & On", artist: "Stephen Bishop", src: "On & On.mp3" },
  { title: "Ram Siya Ram", artist: "Sachet Tandon", src: "Ram Siya Ram - Adipurush.mp3" },
  { title: "Roots", artist: "Bintu Pabra", src: "Roots- Bintu Pabra.mp3" },
  { title: "Russian Bandana", artist: "Dhanda Nyoliwala", src: "Russian Bandana Dhanda Nyoliwala.mp3" },
  { title: "Shiv Stuti", artist: "Sonika Sharma Agarwal", src: "Shiv Stuti.mp3" },
  { title: "Teeje Week", artist: "Jordan Sandhu", src: "Teeje Week.mp3" },
  { title: "Time Table", artist: "Kulwinder Billa", src: "Time Table - Kulwinder Billa.mp3" }
];

let currentSongIndex = 0;

function loadSong(index) {
  let song = songs[index];
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  audio.src = song.src;
}
loadSong(currentSongIndex);

playBtn.addEventListener("click", () => {
  audio.play();
});

pauseBtn.addEventListener("click", () => {
  audio.pause();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;

  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  currentTimeEl.textContent = `${minutes}:${seconds}`;

  let durMinutes = Math.floor(audio.duration / 60) || 0;
  let durSeconds = Math.floor(audio.duration % 60).toString().padStart(2, "0");
  durationEl.textContent = `${durMinutes}:${durSeconds}`;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

songs.forEach((song, index) => {
  let li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audio.play();
  });
  playlistEl.appendChild(li);
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});
