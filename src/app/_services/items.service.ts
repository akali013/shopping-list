import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { ShoppingListItem } from '../_models/shopping-list-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  apiUrl = `${environment.apiUrl}/items`;    // Maps to Items controller
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getItems(): Observable<ShoppingListItem[]> {
    return this.http.get<ShoppingListItem[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log("got list items")),
        catchError(this.handleError("getItems", []))
      );
  }

  addItem(itemName: string): Observable<ShoppingListItem> {
    const item = {
      name: itemName,
      quantity: 1,
      isChecked: false
    };
    
    return this.http.post<ShoppingListItem>(this.apiUrl, item, this.httpOptions)
      .pipe(
        tap(_ => console.log("added item"))
      );
  }

  searchItems(searchTerm: string): Observable<ShoppingListItem[]> {
    // Check for empty terms
    if (!searchTerm.trim()) { 
      return of([]);
    }

    return this.http.get<ShoppingListItem[]>(`${this.apiUrl}/search/${searchTerm}`).pipe(
      tap(items => items.length ? 
          console.log(`Found items matching "${searchTerm}"`) :
          console.log(`No items matching "${searchTerm}"`)
      ),
      catchError(this.handleError<ShoppingListItem[]>("searchItems", []))
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
