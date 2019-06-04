import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

getAuthors(){
  return this._http.get('/authors')
}
newAuthor(author){
  return this._http.post('/authors', author)
}
getAuthor(id){
  return this._http.get('/authors/'+ id)
}

editCake(author){
  return this._http.put('/authors/' +author._id, author)
}
createNewBook(book, id){
  return this._http.post('/authors/books/new/'+id, book)
}
}

