import { Injectable } from '@angular/core';
import ProjectData from '../../assets/projectsdata.json';
import { ProjectModel } from '../_models/projectmodel';
import { SearchFilter } from '../_models/searchfilter';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {

  projects: ProjectModel[] = ProjectData["projects"];
  tagCache: Map<string,Map<string,boolean>> = new Map<string,Map<string,boolean>>();
  titleCache: Map<string,string> = new Map<string,string>(); //given url, maps to title to show (used by toolbar)
  tagList: Map<string,boolean> = new Map<string,boolean>();
  constructor() { 
    this.compile();
  }

  compile(){
    /**
     * Fills the tagsCache with tags for each project, and 
     * fills the titleCache
     */
    for(let project of this.projects){
      this.getTagDict(project,true);
      this.titleCache.set(project.route,project.title);
    }
  }

  get tagSuggestions(){
    //tagList should have all possible tags as its keys. Returning this will be enough
    return Array.from(this.tagList.keys());
  }

  getTitle(url: string){
    /**
     * Looks through titleCache for match. Returns match.
     * If url empty string or no match, returns "Welcome"
     * If url is "about", returns "About Me"
     */
    if(!url || url.trim().length == 0 ){
      return "Welcome";
    } else if(url === "about"){
      return "About Me";
    }
    let title = this.titleCache.get(url);
    if(title){
      return title;
    }
    return "Welcome";
  }

  search(filter: SearchFilter){
    /**
     * Searches through every project and examines the specified fields to see
     * if the target is a substring (or if it is a list of string, a substring of an element)
     * Additionally, such a target must have every tag specified (case insensitive)
     * If no fields selected or target is empty string (or string with only spaces), returns everything
     */
    var target = filter.target;
    var fields = filter.fields;
    var tags = filter.tags;
    if((!target || target.trim().length == 0 || fields.length == 0) && tags.length ==0){
      return this.projects;
    }
    target = target.toLowerCase();
    tags = tags.map(v => v.toLowerCase()); 
    var result = Array<ProjectModel>();
    for(let project of this.projects){
      for(let field of fields){
        let canidate = project[field];
        let isMatch: boolean = this.detectMatch(target,canidate,tags,this.getTagDict(project));
        if(isMatch){
          result.push(project);
          break;
        }
      }
    }
    return result;
  }

  getTagDict(project: ProjectModel,buildTagList: boolean = false){
    /**
     * Given projectmodel, first attempts to look
     * for respective value in cache (by project title), if cache doesn't have
     * anything, use makeTagDict() to create it, save tag dict
     * in cache and return the newly generated dict
     */
    let key = project.title;
    let tagDict = this.tagCache.get(key);
    if(!tagDict){ //tagDict is undefined
      tagDict = this.makeTagDict(project.tags, buildTagList);
      this.tagCache.set(key,tagDict);
    }
    return tagDict;
  }

  makeTagDict(tags: string[], buildTagList: boolean = false){
    /**
     * Given tags, make them lowercase then map each to a dictionary.
     * This will be used by search to aid in tag matching, specifically,
     * will be called by getTagDict if tag dict for said project doesn't exist
     * yet
     */
    let d = new Map<string,boolean>();
    for(let tag of tags){
      if(buildTagList){
        this.tagList.set(tag,true);
      }
      d.set(tag.toLowerCase(),true);
    }
    return d;
  }

  detectMatch(target: string, 
              canidate: string | string[] | undefined, 
              targetTags: string[], 
              tagDict: Map<string,boolean>){
    /**
     * Helps search() function.
     * If canidate is undefined, return false.
     * 
     * Assumes target is lower case
     * This function is not case sensitive.
     * If canidate is string, check if target is substring
     * If canidate is string[], check if target is substring of at least one element
     * although, now that tag search is its own separate function, it is unlikely
     * that this will be used
     */
    if(!canidate || !this.tagsMatch(targetTags,tagDict)){ //undefined canidate or tags don't
      return false;
    }else if(typeof(canidate) === 'string'){
      return canidate.toLowerCase().includes(target);
    }else if(Array.isArray(canidate)){ //will assume being array means it is string[] 
      for(let c of canidate){
        if(c.toLowerCase().includes(target)){
          return true;
        }
      }
    }
    return false;
  }

  tagsMatch(targetTags: string[], tagDict: Map<string,boolean>){
    /**
     * Helper used by detect match. If tagDict has every target tag,
     * return true. If even one is not in the dict, return false
     */
    for(let tag of targetTags){
      if(!tagDict.get(tag)){ //result undefined (no match), so return false
        return false;
      }
    }
    return true;
  }
}
