import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FilmService} from "../services/film.service";
import {IFilms} from "../filmlist/Films";


function range(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {'range': true};
    }
    return null;
  };
}

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css']
})
export class FilmEditComponent implements OnInit {

  editform: FormGroup;
  errorMessage: string = '';
  film!: IFilms;
  datepattern = "^(19|20)\\d\\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$";
  isdirty = true;
  conf: boolean = false;

  constructor(private route: ActivatedRoute,
              private filmService: FilmService,
              private router: Router,
              public formBuilder: FormBuilder) {
    this.editform = this.formBuilder.group({
      "title": [],
      "originalTitle": [],
      "original_title_romanised": [],
      "description": [],
      "director": [],
      "producer": [],
      "release_date": [],
      "running_time": [null, range(30, 200)],
      "rt_score": []
    })
  }


  ngOnInit(): void {

    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id !== '0') {
      this.filmService.getFilmDetails(id).subscribe({
        next: filmsDetails => {
          this.editfilm(filmsDetails);
        },
        error: err => this.errorMessage = err
      });
    }

  }

  private editfilm(filmsDetails: IFilms) {
    if (this.editform) {
      this.editform.reset();
    }
    this.editform.patchValue({
      "title": filmsDetails.title,
      "originalTitle": filmsDetails.original_title,
      "original_title_romanised": filmsDetails.original_title_romanised,
      "description": filmsDetails.description,
      "director": filmsDetails.director,
      "producer": filmsDetails.producer,
      "release_date": filmsDetails.release_date,
      "running_time": filmsDetails.running_time,
      "rt_score": filmsDetails.rt_score
    })
  }

  ratingClicked(rating: string) {
    this.editform.patchValue({
      "rt_score": String(rating)
    })
  }

  save() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id === '0') {
      this.filmService.addFilm(this.editform.value).subscribe({
        next: res => {
          this.film = res;
          this.router.navigate(['/filmList']);
        },
        error: err => this.errorMessage = err
      })
    } else {
      this.filmService.editfilm(this.editform.value, id).subscribe({
        next: res => {
          this.film = res;
          this.router.navigate(['/filmList']);
        },
        error: err => this.errorMessage = err
      })
    }
    this.isdirty = false
  }

  Back() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id == '0') {
      this.router.navigate(['/filmList']);
    } else this.router.navigate(['/filmDetails', id]);
  }
}
