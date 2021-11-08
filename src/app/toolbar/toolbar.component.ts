import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { ProjectsDataService } from '../_services/projectsdata.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  title: string = "Welcome";
  navEvent$: any;
  constructor(private router: Router,
              private projectsService: ProjectsDataService,
              private iconreg: MatIconRegistry,
              private domsanitizer: DomSanitizer) { 
              this.navEvent$ = this.router.events.subscribe((event: Event) =>{
      if(event instanceof NavigationStart){
        const navState = this.router.getCurrentNavigation();
        this.title = this.projectsService.getTitle(event.url.slice(1)); //remove that first slash
      }
    });
    this.iconreg.addSvgIcon(
      "social_linkedin",
      this.domsanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/linkedin.svg")
    );
  }
  ngOnDestroy(): void {
    this.navEvent$.unsubscribe();
  }

  ngOnInit(): void {
  }

  routeHome(){
    this.router.navigateByUrl("");
  }

  routeAboutMe(){
    this.router.navigateByUrl("about");
  }

  routeSocial(url: string){
    if(url){
      window.open(url);
    }
  }

}
