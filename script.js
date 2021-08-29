const tanah = document.querySelectorAll(".tanah")
const tikus = document.querySelectorAll(".tikus")
const papan = document.querySelector(".papan-skor")
const pop = document.querySelector("#pop")


let tanahsebelumnya;
let selesai;
let nilai;



function tanahrandom(tanah){
  const t = Math.floor(Math.random()*tanah.length)
  const random = tanah[t]
  
   if (random == tanahsebelumnya){
     tanahrandom(tanah);
   }
   
   tanahsebelumnya = random
   
  return random
}

function waktu(min,max){
  return Math.round(Math.random() * (max-min) + min );
}



function muncultikus(){
  const trandom = tanahrandom(tanah);
  trandom.classList.add("muncul")
  const wrandom = waktu(300,1500)
  
  
  setTimeout(function() {
    trandom.classList.remove("muncul")
    if(!selesai){
        muncultikus();
    }
  }, wrandom);
}


function waktumain(){
  nilai = 0
  papan.textContent = 0
  selesai = false
  muncultikus();
  setTimeout(function() {
   selesai = true
  }, 100000);
}

function skor() {
  nilai++;
  papan.textContent = nilai
  this.parentNode.classList.remove(".muncul")
  pop.play();
}


tikus.forEach(t => {
  t.addEventListener('click',skor)
})