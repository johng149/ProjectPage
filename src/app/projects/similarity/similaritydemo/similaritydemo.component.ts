import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProjectsDataService } from 'src/app/_services/projectsdata.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScoreResponse } from 'src/app/_models/similarityresponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamplesService } from 'src/app/_services/examples.service';

@Component({
  selector: 'app-similaritydemo',
  templateUrl: './similaritydemo.component.html',
  styleUrls: ['./similaritydemo.component.css']
})
export class SimilaritydemoComponent implements OnInit {

  private backendurl: string = "https://us-east1-even-boulder-331216.cloudfunctions.net/similaritymodel";
  dataForm: FormGroup;
  response: number = -1;
  responsesuccess: boolean = false;
  sent1 = new FormControl("",[Validators.required]);
  sent2 = new FormControl("",[Validators.required]);
  loading: boolean = false;
  snackoptions = {duration: 3000};

  constructor(private http: HttpClient,
    private projectsService: ProjectsDataService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private examples: ExamplesService) {
    this.dataForm = this.fb.group({sent1: this.sent1,
                                   sent2: this.sent2}) 
  }

  ngOnInit(): void {
  }

  showExample(){
    let e = this.examples.getExample();
    let s1 = e.sentence1;
    let s2 = e.sentence2;
    this.sent1.setValue(s1);
    this.sent2.setValue(s2);
    this.process();
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

  showInvalidInputMessage(){
    let message = null;
    let action = "Okay";
    if(this.sent1.hasError("required") && this.sent2.hasError("required")){
      message = "Cannot proceed, sentences are empty";
    } else if(this.sent1.hasError("required")){
      message = "Cannot proceed, sentence 1 is emtpy";
    } else if(this.sent2.hasError("required")){
      message = "Cannot proceed, sentence 2 is empty";
    }
    if(message){ //message not null nor undefined
      this.snack.open(message,action,this.snackoptions);
    }
  }

  roundedResult(){
    return Math.ceil(this.response*100)
  }

  process(){
    const invalid = this.invalidInputs();
    if(!invalid && !this.loading){
      this.loading = true;
      this.http.post<ScoreResponse>(this.backendurl,
                    {"sentence1":this.sent1.value,
                    "sentence2":this.sent2.value}).subscribe((result: ScoreResponse) =>{
                      this.response = result.score,
                      this.responsesuccess = result.success,
                      this.loading = false
                    }, error =>{
                      console.log(error);
                    });
    } else if(invalid){
      this.showInvalidInputMessage();
    }
  }

}
