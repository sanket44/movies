import {Component, OnInit} from '@angular/core';
import {FilmService} from "../services/film.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../services/login.service";
@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  errorMessage: string = '';
  filmsDetails:any;

  constructor(private filmService: FilmService,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private router:Router) {
  }
  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.filmService.getFilmDetails(id).subscribe({
      next: filmsDetails => {
        this.filmsDetails = filmsDetails;
      },
      error: err => this.errorMessage = err
    });

  }
  get getRole(): number {
    return this.loginService.role;
  }
  deleteFilm(){
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.filmService.deleteFilm(id).subscribe({
      next: filmsDetails => {
        this.filmsDetails = filmsDetails;
        this.router.navigate(['/filmList']);
      },
      error: err => this.errorMessage = err
    });
  }
  tostring(rating:string){
    return Number(rating)
  }
}
