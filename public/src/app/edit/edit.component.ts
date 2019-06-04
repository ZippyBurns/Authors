import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  authorId: any;
  editAuth= {name:""};
  
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit() {
    //Gets the ID from the URL Params
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.authorId = params['id'];
      this.getOneAuthor()
    });
  }

  goHome() {
    this._router.navigate(['/']);
  }

  editAuthor() {
    this._httpService.editCake(this.editAuth).subscribe(data => {
      console.log("edit cake component in server", data);
      this.goHome();
  
    })

  }
  getOneAuthor(){
    this._httpService.getAuthor(this.authorId).subscribe( data => {
      console.log("got one author", data)
      this.editAuth = data['author']
    })
  }
}
