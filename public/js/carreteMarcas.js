const sliderContainer = document.querySelector('.carrete');
const slides = document.querySelectorAll('.carrete-logo');

let logos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const paintLogos = () => {
    sliderContainer.innerHTML = "";
    logos.forEach(logo => {
        const template =
            `<img src="/images/home/marca${logo}.png" alt="Logo ${logo}" class="carrete-logo">`
        sliderContainer.innerHTML += template;
    });
};

const rotateLogos = () => {
    logos.push(logos.shift());
    paintLogos();
  };

  window.addEventListener("load", () => {
    paintLogos();
    setInterval(rotateLogos, 6300);
  });







