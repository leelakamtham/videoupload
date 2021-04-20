import { Component ,OnInit} from '@angular/core';
import {HttpClientModule , HttpClient}     from  '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class  AppComponent implements OnInit {

  uploadedFiles: Array < File > ;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

  }



  fileChange(element) {
    this.uploadedFiles = element.target.files;
 }



upload() {
  let formData = new FormData();

  //for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("upload[]", this.uploadedFiles[0], this.uploadedFiles[0].name);
  //}
  this.http.post('/api/upload', formData)
  .subscribe((response) => {
       //console.log('response received is ', response);
  })
}

/*
getvideos(){
  let video = [];
  for(var i =0; i < this.uploadedFiles.length;i++){
     video+=
  }

  this.http.get('/api',)
  .subscribe((response)=>
  console.log('response received is',response));
}

*/







}


