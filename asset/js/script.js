const tanah = document.querySelectorAll(".tanah")
const tikus = document.querySelectorAll(".tikus")
const papan = document.querySelector(".papan-skor")
const btnStart = document.querySelector('.start')
const pop = new Audio('/asset/audio/jancok.wav')

let tanahSebelumnya;
let selesai;
let nilai;

const tanahRandom = (tanah) => {
  const t = Math.floor(Math.random() * tanah.length)
  const random = tanah[t]
  
  if (random == tanahSebelumnya){
    return tanahRandom(tanah);
  }
   
  tanahSebelumnya = random
  return random
}

const waktu = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const playAudio = () => {
  pop.pause();
  pop.play();
}

const skor = (trandom) => {
  nilai++;
  console.log(nilai)
  papan.innerHTML = nilai
  trandom.classList.remove("muncul")
  playAudio()
}

let timer;

const munculTikus = () => {
  const trandom = tanahRandom(tanah);
  trandom.classList.add("muncul")
  const wrandom = waktu(300, 1500)
  
  trandom.addEventListener('click', (e) => {
    if (e.target.classList.contains('muncul')) skor(trandom);
  });
  
  timer = setTimeout(() => {
    trandom.classList.remove("muncul")
    if (!selesai) {
      munculTikus();
    }
  }, wrandom);
}

let run = false

btnStart.addEventListener('click', () => {
  if (run == false){
    nilai = 0
    papan.innerHTML = 0
    btnStart.innerHTML = '<i class="fas fa-stop"></i> Stop'
    btnStart.classList.replace('btn-primary', 'btn-danger')
    selesai = false
    run = true
    
    munculTikus();

    setTimeout(() => {
      selesai = true
      run = false
      btnStart.innerHTML = '<i class="fas fa-play"></i> Mulai'
      btnStart.classList.replace('btn-danger', 'btn-primary')
      clearTimeout(timer)
    }, 60000);
  } else if (run == true) {
    selesai = true
    btnStart.innerHTML = '<i class="fas fa-play"></i> Mulai'
    btnStart.classList.replace('btn-danger', 'btn-primary')
    clearTimeout(timer)
    run = false
  }
});