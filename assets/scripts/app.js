const headerElement = document.querySelector("header");
const addMovieBtn = headerElement.querySelector('button');
const addModalElement = document.getElementById("add-modal");
const backdropEl = document.getElementById('backdrop');
const addModalCancelBtn = addModalElement.querySelector(".btn--passive");
const addModalAddBtn = addModalCancelBtn.nextElementSibling;
const userInputs = addModalElement.querySelectorAll('input');
const movieListEl = document.getElementById('movie-list');
const entryTextEl = document.getElementById('entry-text');
const movies = [];
const deleteModalEl = document.getElementById('delete-modal');

const clearUserInputs = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const updateUI = () => {
    if (movies.length > 0) {
        entryTextEl.style.display = 'none';
    } else {
        entryTextEl.style.display = 'block';
    }
};




const removeCancellationBlock = () => {
    deleteModalEl.classList.remove('visible');
    removeBackdrop();
}

const makeDeletion = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    if (movieIndex === movies.length) {
        return;
    }
    movies.splice(movieIndex, 1);
    movieListEl.children[movieIndex].remove();
    updateUI();
    console.log(movies);
    removeCancellationBlock();
}


const deleteMovieElement = movieId => {
    deleteModalEl.classList.add('visible');
    showBackdrop();
    const noBtn = deleteModalEl.querySelector(".btn--passive");
    let yesBtn = deleteModalEl.querySelector(".btn--danger");

    yesBtn.replaceWith(yesBtn.cloneNode(true));
    yesBtn = deleteModalEl.querySelector(".btn--danger");

    noBtn.removeEventListener('click', removeCancellationBlock);
    noBtn.addEventListener('click', removeCancellationBlock);

    yesBtn.addEventListener('click', makeDeletion.bind(null, movieId));
};


const addMovieToList = (id, title, image, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class='movie-element__image'>
            <img src="${image}" alt="${title}">
        </div>
        <div class='movie-element__info'>
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>   
        </div>
    `;

    newMovieElement.addEventListener('click', deleteMovieElement.bind(null, id));
    movieListEl.append(newMovieElement);
};

const showBackdrop = () => {
    backdropEl.classList.add("visible");
};

const removeBackdrop = () => {
    backdropEl.classList.remove("visible");
};
const showAddModal = () => {
    addModalElement.classList.add('visible');
    showBackdrop();
};

const removeAddModal = () => {
    addModalElement.classList.remove('visible');
    removeBackdrop();
};

const cancelBtnHandler = () => {
    removeAddModal();
    clearUserInputs();
};
const backdropClickHandler = ()  => {
    if (deleteModalEl.classList.contains("visible")) {
        removeCancellationBlock();
    } else {
        removeAddModal();
    }
}

const isRatingValid = movieRating => {
    return !(movieRating === '' || +movieRating < 1 || +movieRating > 5)
};

const addBtnHandler = () => {
    const movieTitle = userInputs[0].value.trim();
    const movieImageUrl = userInputs[1].value.trim();
    const movieRating = userInputs[2].value.trim();

    if (movieTitle === '' ||
        movieImageUrl === '' ||
        !isRatingValid(movieRating)) {
        alert('You entered some invalid inputs, please try again');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: movieTitle,
        image: movieImageUrl,
        rating: movieRating };

    movies.push(newMovie);
    console.log(movies);
    updateUI();
    cancelBtnHandler();
    addMovieToList(newMovie.id, movieTitle, movieImageUrl, movieRating);
};

addMovieBtn.addEventListener('click', showAddModal);

backdropEl.addEventListener('click', backdropClickHandler);

addModalCancelBtn.addEventListener('click', cancelBtnHandler);

addModalAddBtn.addEventListener('click', addBtnHandler);