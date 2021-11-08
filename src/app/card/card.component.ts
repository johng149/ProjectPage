import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModel } from '../_models/projectmodel';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public project!: ProjectModel;
  @Output() tagSearch = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchAddTag(tag: string){
    this.tagSearch.emit(tag);
  }

  routeProject(){
    this.router.navigateByUrl(this.project.route);
  }

}
