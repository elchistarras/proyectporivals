const slider = document.getElementById('slider');
const options = document.querySelectorAll('.option');
const continueBtn = document.getElementById('continueBtn');

const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');

let paso = 1;
let categoriaSeleccionada = false;

options.forEach(opt=>{
  opt.addEventListener('click',()=>{

    options.forEach(o=>o.classList.remove('selected'));
    opt.classList.add('selected');

    categoriaSeleccionada = true;
    continueBtn.disabled = false;
    continueBtn.classList.add('enabled');
  });
});

continueBtn.addEventListener('click',()=>{

  if(paso === 1 && categoriaSeleccionada){
    slider.style.transform = "translateX(-33%)";
    paso = 2;

    s1.classList.remove('active');
    s2.classList.add('active');

    continueBtn.disabled = false;
  }

  else if(paso === 2){
    slider.style.transform = "translateX(-70%)";
    paso = 3;

    s2.classList.remove('active');
    s3.classList.add('active');

    continueBtn.style.display = "none";
  }
});
