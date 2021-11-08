import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectModel } from '../_models/projectmodel';
import { SearchFilter } from '../_models/searchfilter';
import { ProjectsDataService } from '../_services/projectsdata.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: ProjectModel[] = [];
  searchFilter: SearchFilter = new SearchFilter();
  searchForm: FormGroup;

  //Chip data and parameters stored here
  tagsDict: Map<string,boolean> = new Map<string,boolean>();
  //tagsDict instead of list to make it easier to remove tags given string
  separators: number[] = [COMMA,ENTER];
  selectable: boolean = true;
  removable: boolean = true;
  filteredOptions$: Observable<string[]>;
  tagsearch = new FormControl(null)
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  //end chips data

  constructor(private projectsService: ProjectsDataService,
              private fb: FormBuilder) {
    this.searchForm = this.fb.group({textsearch: new FormControl(""),
                                     tagsearch: this.tagsearch
                                    });
    this.filteredOptions$ = this.tagsearch.valueChanges.pipe(
      startWith(''),
      map(value => this.filterTags(value))
    );
  }

  ngOnInit(): void {
    this.projects = this.projectsService.search(this.searchFilter);
    //console.log(this.projects);
  }

  search(){
    /** clears existing projects and searches using current params from 
     * variables such as get tags() and this.searchForm.get("textsearch")?.value;
    */
   this.searchFilter.target = this.searchForm.get("textsearch")?.value;
   this.searchFilter.tags = this.tags;
   this.projects = this.projectsService.search(this.searchFilter);
  }

  get tags(){ //used by html to display list of tags
    return Array.from(this.tagsDict.keys());
  }

  tagAutoCompleteSelect(event: MatAutocompleteSelectedEvent){
    this.tagsDictAction(event.option.value,true);
    this.tagInput.nativeElement.value = "";
    this.tagsearch.setValue("");
  }

  filterTags(value: string){
    value = value.toLowerCase();
    let canidateTags = this.projectsService.tagSuggestions;
    return canidateTags.filter(tag => tag.toLowerCase().includes(value));
  }

  removeTag(tag:string){
    this.tagsDictAction(tag);
  }

  addTag(event: MatChipInputEvent | string){
    let tagName = "";
    if(typeof(event) == 'string'){
      tagName = event;
    }
    else{
      tagName = event.value.trim();
      event.chipInput!.clear();
    }
    if(tagName){
      this.tagsDictAction(tagName,true);
    }
    this.tagsearch.setValue("");
  }

  tagsDictAction(key: string, value: boolean = false){
    //wrapper. Each tagsDict set/delete should call search()
    //value being false means want to call delete. if value
    //is true, want to call set
    if(value){
      this.tagsDict.set(key,value);
    }else{
      this.tagsDict.delete(key);
    }
    this.search();
  }

}
