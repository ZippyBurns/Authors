import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import { ActivatedRoute,Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  author={
    name: "",
    books: []
  }
  book ={
    title: ""
  }
  authorId: any;
  
  constructor( private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.authorId = params['id'];
    })
    this.getOneAuthor()
  }

  getOneAuthor(){
    this._httpService.getAuthor(this.authorId).subscribe( data =>{
     console.log("got One author to show", data);
     this.author= data['author']
    })
  }
  createBook(){
    this._httpService.createNewBook(this.book, this.authorId).subscribe(data =>{
      this.getOneAuthor();
    })
  }
}
