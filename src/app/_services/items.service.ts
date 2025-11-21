import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../_models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  apiUrl = `${environment.apiUrl}/items`;    // Maps to Items controller
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log("got list items")),
        catchError(this.handleError("getItems", []))
      );
  }

  createItem(itemName: string): Observable<Item> {
    const item = {
      name: itemName,
    };
    
    return this.http.post<Item>(this.apiUrl, item, this.httpOptions)
      .pipe(
        tap(_ => console.log("added item"))
      );
  }

  searchItems(searchTerm: string): Observable<Item[]> {
    // Check for empty terms
    if (!searchTerm.trim()) { 
      return of([]);
    }

    return this.http.get<Item[]>(`${this.apiUrl}/search/${searchTerm}`).pipe(
      tap(items => items.length ? 
          console.log(`Found items matching "${searchTerm}"`) :
          console.log(`No items matching "${searchTerm}"`)
      ),
      catchError(this.handleError<Item[]>("searchItems", []))
    );
  }

  constructor(private http: HttpClient) { }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error}`);
      return of(result as T);
    }
  }
}
