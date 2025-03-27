import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class ApplicationController extends Controller {
  @tracked movies = [
    { id: 1, title: 'Interstellar (2014)', director: 'Nolan' },
    { id: 2, title: 'Avengers (2012)', director: 'Joss Whedon' },
    { id: 3, title: 'Inception (2010)', director: 'Christopher Nolan' },
  ];

  @tracked newTitle = '';
  @tracked newDirector = '';
  @tracked searched = '';
  @tracked selectedMovies = [];

  get filteredMovies() {
    if (!this.searched.trim()) {
      return this.movies;
    }
    return this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(this.searched.toLowerCase()),
    );
  }

  @action
  updateTitle(event) {
    this.newTitle = event.target.value;
  }

  @action
  updateDirector(event) {
    this.newDirector = event.target.value;
  }

  @action
  addMovie() {
    if (this.newTitle.trim() && this.newDirector.trim()) {
      let newId = this.movies.length
        ? this.movies[this.movies.length - 1].id + 1
        : 1;
      this.movies = [
        ...this.movies,
        { id: newId, title: this.newTitle, director: this.newDirector },
      ];
      this.newTitle = '';
      this.newDirector = '';
    }
  }

  @action
  deleteMovie(id) {
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  @action
  updateSearch(event) {
    this.searched = event.target.value;
  }

  @action
  toggleSelect(movieId, event) {
    if (event.target.checked) {
      this.selectedMovies = [...this.selectedMovies, movieId];
    } else {
      this.selectedMovies = this.selectedMovies.filter((id) => id !== movieId);
    }
  }

  @action
  deleteSelected() {
    if (this.selectedMovies.length === 0) {
      alert('Select at least one movie to delete!');
      return;
    }
    this.movies = this.movies.filter(
      (movie) => !this.selectedMovies.includes(movie.id),
    );
    this.selectedMovies = [];
  }

  @action
  editMovie(id) {
    let findEditMovie = this.movies.find((movie) => movie.id === id);
    if (!findEditMovie) return;

    let newTitle = prompt('Enter new title:', findEditMovie.title);
    if (newTitle === null || newTitle.trim() === '') return;

    let newDirector = prompt('Enter new director:', findEditMovie.director);
    if (newDirector === null || newDirector.trim() === '') return;

    this.movies = this.movies.map((m) =>
      m.id === id ? { ...m, title: newTitle, director: newDirector } : m,
    );
  }
}

export default ApplicationController;
