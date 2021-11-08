import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProjectsDataService } from 'src/app/_services/projectsdata.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SimilarityResponse } from 'src/app/_models/similarityresponse';

@Component({
  selector: 'app-similaritydemo',
  templateUrl: './similaritydemo.component.html',
  styleUrls: ['./similaritydemo.component.css']
})
export class SimilaritydemoComponent implements OnInit {

  private backendurl: string = "https://projectpagebackend.hopto.org/similarity";
  dataForm: FormGroup;
  response: number = -1;
  responsesuccess: boolean = false;
  sent1 = new FormControl("",[Validators.required]);
  sent2 = new FormControl("",[Validators.required]);
  constructor(private http: HttpClient,
    private projectsService: ProjectsDataService,
    private fb: FormBuilder) {
    this.dataForm = this.fb.group({sent1: this.sent1,
                                   sent2: this.sent2}) 
  }

  ngOnInit(): void {
  }

  errorMessage(){
    if (this.invalidInputs()){
      return "Cannot be empty";
    }
    return undefined;
  }

  invalidInputs(){
    return (this.sent1.hasError("required") || this.sent2.hasError("required"));
  }

  roundedResult(){
    return Math.ceil(this.response*100)
  }

  process(){
    const invalid = this.invalidInputs();
    if(!invalid){
      this.http.post<SimilarityResponse>(this.backendurl,
                    {"sentence1":this.sent1.value,
                    "sentence2":this.sent2.value}).subscribe((result: SimilarityResponse) =>{
                      this.response = result.score,
                      this.responsesuccess = result.success
                    }, error =>{
                      console.log(error);
                    });
    }
  }

}
