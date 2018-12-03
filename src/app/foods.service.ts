import { Injectable } from '@angular/core';
import { Food } from './food';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`FoodService: ${message}`);
  }

  private foodsUrl = 'api/foods';  // URL to web api

  getFoods(): Observable<Food[]> {
    this.messageService.add('FoodService: fetched Foods')
    return this.http.get<Food[]>(this.foodsUrl)
      .pipe(
        tap(_ => this.log('fetched foods')),
        catchError(this.handleError('getFoods', []))
      );
  }

  getFood(id: number): Observable<Food> {
    const url = `${this.foodsUrl}/${id}`;
    return this.http.get<Food>(url).pipe(
      tap(_ => this.log(`fetched food id=${id}`)),
      catchError(this.handleError<Food>(`getFood id=${id}`))
    )
  }

  updateFood(food: Food): Observable<any> {
    return this.http.put(this.foodsUrl, food, httpOptions).pipe(
      tap(_ => this.log(`updated food id=${food.id}`)),
      catchError(this.handleError<any>('updateFood'))
    );
  }

  /** POST: add new food to the server */
  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.foodsUrl, food, httpOptions).pipe(
      tap((hero: Food) => this.log(`added food w/ id=${food.id}`)),
      catchError(this.handleError<Food>('addFood'))
    );
  }

  /** DELETE: delete the food from the server */
deleteFood (food: Food | number): Observable<Food> {
  const id = typeof food === 'number' ? food : food.id;
  const url = `${this.foodsUrl}/${id}`;

  return this.http.delete<Food>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted food id=${id}`)),
    catchError(this.handleError<Food>('deleteFood'))
  );
}

/* GET heroes whose name contains search term */
searchFoods(term: string): Observable<Food[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Food[]>(`${this.foodsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found foods matching "${term}"`)),
    catchError(this.handleError<Food[]>('searchFoods', []))
  );
}

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
