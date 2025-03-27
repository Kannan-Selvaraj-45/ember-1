import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MovieStoreService extends Service {
  @tracked _movies = [
    { id: 1, title: 'Interstellar (2014)', director: 'Nolan' },
    { id: 2, title: 'Avengers (2012)', director: 'Joss Whedon' },
    { id: 3, title: 'Inception (2010)', director: 'Christopher Nolan' },
  ];

  get movies() {
    return this._movies;
  }

  @action
  addMovie(title, director) {
    let newId = this._movies.length
      ? this._movies[this._movies.length - 1].id + 1
      : 1;
    
    this._movies = [
      ...this._movies,
      { id: newId, title, director },
    ];
    
    console.log('Movie added:', { id: newId, title, director });
    console.log('Current movies:', this._movies);
    
    return true;
  }

  @action
  deleteMovie(id) {
    this._movies = this._movies.filter((movie) => movie.id !== id);
  }

  @action
  updateMovie(id, title, director) {
    this._movies = this._movies.map((m) =>
      m.id === id ? { ...m, title, director } : m
    );
  }
}