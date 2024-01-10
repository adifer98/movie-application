const headerElement = document.querySelector("header");
const addMovieBtn = headerElement.querySelector('button');
const addModalElement = document.getElementById("add-modal");
const backdropEl = document.getElementById('backdrop');
const addModalCancelBtn = addModalElement.querySelector(".btn--passive");


const visualizeBackdrop = () => {
    backdropEl.classList.toggle("visible");
    };

const visualizeAddModal = () => {
    addModalElement.classList.toggle('visible');
    visualizeBackdrop();
    };

const unVisualizeAddModal = () => visualizeAddModal();

addMovieBtn.addEventListener('click', visualizeAddModal);

addModalCancelBtn.addEventListener('click', unVisualizeAddModal);


