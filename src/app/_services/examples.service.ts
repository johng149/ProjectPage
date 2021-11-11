import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { allexamples } from 'src/assets/exampleinputs';

@Injectable({
  providedIn: 'root'
})
export class ExamplesService {
  // uses router to look at url and then matches that to
  // allexamples dictionary
  previousindex: number = 1;
  constructor(private router: Router) { }

  getExample(){
    let url = this.router.url;
    url = url.slice(1) //removes forward slash since that is not needed
    const examplelist = allexamples[url];
    if(!examplelist){ //if no valid example (url with no examples etc)
      return undefined;
    }
    let index = Math.floor(Math.random() * examplelist.length)
    if(index == this.previousindex && examplelist.length >= 2){
      if(index == 0){
        index = 1
      }else{
        index = 0
      }
    }
    this.previousindex = index;
    return examplelist[index];
  }
}
