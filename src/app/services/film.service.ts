import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IFilms} from "../filmlist/Films";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  // private filmUrl = 'http://localhost:3000/films/';
  private filmUrl = 'https://moviesdb1.herokuapp.com/films/';

  constructor(private http: HttpClient) {
  }

  getFilms(): Observable<IFilms[]> {
    return this.http.get<IFilms[]>(this.filmUrl).pipe(
      catchError(this.handleError)
    );
  }

  editfilm(film: IFilms, id: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = film;
    return this.http.put(this.filmUrl+id, body, {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  getFilmDetails(id: string): Observable<IFilms> {
    return this.http.get<IFilms>(this.filmUrl+id).pipe(
      catchError(this.handleError)
    );
  }
  deleteFilm(id: string): Observable<IFilms> {
    return this.http.delete<IFilms>(this.filmUrl+id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  addFilm(film: IFilms): Observable<IFilms> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<IFilms>(this.filmUrl, film, {headers})
      .pipe(
        tap(data => console.log('Movie: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
}
