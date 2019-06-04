import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {

  allAuthors: any;
  
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllAuthors()
  }

  getAllAuthors(){
    this._httpService.getAuthors().subscribe( data =>{
      console.log(data, "Got all authors");
      this.allAuthors = data['allAuthors']
    })
  }
}
