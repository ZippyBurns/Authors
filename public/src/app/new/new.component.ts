import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor={
    name: ""
  };
  allAuthors: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getAllAuthors()
  }

  getAllAuthors(){
    this._httpService.getAuthors().subscribe( data =>{
      console.log(data, "Got all authors");
      this.allAuthors = data['allAuthors']
    })
  }

createNewAuthor(){
  this._httpService.newAuthor(this.newAuthor).subscribe( data =>{
    this.newAuthor = {
      name:""
    };
    this._router.navigate(['/']);
  });
}
}