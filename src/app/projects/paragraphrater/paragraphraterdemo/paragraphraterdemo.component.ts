import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScoreResponse } from 'src/app/_models/similarityresponse';
import { ExamplesService } from 'src/app/_services/examples.service';

@Component({
  selector: 'app-paragraphraterdemo',
  templateUrl: './paragraphraterdemo.component.html',
  styleUrls: ['./paragraphraterdemo.component.css']
})
export class ParagraphraterdemoComponent implements OnInit {

  private backendurl: string = "https://us-east1-even-boulder-331216.cloudfunctions.net/paragraphrater";
  dataForm: FormGroup;
  paragraph = new FormControl("",[Validators.required]);
  snackoptions = {duration: 3000};
  response: number = -1;
  loading: boolean = false;
  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private snack: MatSnackBar,
              private examples: ExamplesService) {
    this.dataForm = this.fb.group({paragraph: this.paragraph})
   }

  ngOnInit(): void {
  }

  process(){
    const invalid = this.invalidInputs();
    if(!invalid && !this.loading){
      this.loading = true;
      this.http.post<ScoreResponse>(this.backendurl,
        {"paragraph": this.paragraph.value}).subscribe((result: ScoreResponse) => {
          this.response = result.score,
          this.loading = false
        }, error => {
          console.log(error);
        });
    }else if(invalid){
      this.showInvalidInputMessage();
    }
  }

  roundedResult(){
    return Math.ceil(this.response*100)
  }

  errorMessage(){
    if (this.invalidInputs()){
      return "Cannot be empty";
    }
    return undefined;
  }

  invalidInputs(){
    return (this.paragraph.hasError("required"));
  }

  showInvalidInputMessage(){
    let message = null;
    let action = "Okay";
    if(this.paragraph.hasError("required")){
      message = "Cannot proceed, sentences are empty";
    }
    if(message){ //message not null nor undefined
      this.snack.open(message,action,this.snackoptions);
    }
  }

  showExample(){
    let e = this.examples.getExample();
    this.paragraph.setValue(e.paragraph);
    this.process();
  }

}
