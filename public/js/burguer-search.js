const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const buscador = document.querySelector('#buscador')

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  menu.classList.toggle('active');
});

buscador.addEventListener('click', () => {
    buscador.classList.toggle('active');
    buscador.classList.toggle('active');
  });