import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFilms} from "./Films";
import {FilmService} from "../services/film.service";
import {Subscription} from "rxjs";
import {LoginService} from "../services/login.service";
import {FormArray, FormControl} from "@angular/forms";

@Component({
  selector: 'app-filmlist',
  templateUrl: './filmlist.component.html',
  styleUrls: ['./filmlist.component.css']
})
export class FilmlistComponent implements OnInit {
  films: IFilms[] = [];
  errorMessage: string = '';
  isAllChecked: boolean = false;


  constructor(private filmService: FilmService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.fetchlist();
  }

  fetchlist() {
    this.filmService.getFilms().subscribe({
      next: films => {
        this.films = films;
      },
      error: err => this.errorMessage = err
    });
  }

  get getRole(): number {
    return this.loginService.role;
  }

  tostring(rating: string) {
    return Number(rating)
  }

  filmarr: IFilms[] = [];

  deleteMovie() {
    this.films.forEach((film: IFilms) => {
      if (film.checked) {
        this.filmService.deleteFilm(film.id).subscribe(
          {
            next: f => {
              this.fetchlist();
            }
          }
        )
      }
    })
  }

  isAllCheck() {
    this.filmarr = this.films.filter(film => film.checked == true)
    if (this.filmarr.length < this.films.length) {
      this.isAllChecked = false;
    } else this.isAllChecked = true;
  }

  onCheckChange(event: any) {
    if (event.target.checked) {
      let index = this.films.map(function (e) {
        return e.id;
      }).indexOf(event.target.value)
      this.films[index].checked = true;
    } else {

      let index = this.films.map(function (e) {
        return e.id;
      }).indexOf(event.target.value)
      this.films[index].checked = false
      this.isAllChecked = false;

    }
    this.isAllCheck();
  }

  bulk(event: any) {
    if (event.target.checked) {
      for (let i = 0; i < this.films.length; i++) {
        this.films[i].checked = true;
      }
      this.isAllChecked = true;
    } else {
      for (let i = 0; i < this.films.length; i++) {
        this.films[i].checked = false;
      }
      this.isAllChecked = false;
    }

  }
}
