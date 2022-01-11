import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-writingtool',
  templateUrl: './writingtool.component.html',
  styleUrls: ['./writingtool.component.css']
})
export class WritingtoolComponent implements OnInit {

  constructor() { }

  routeToApp(){
    window.open("https://goofy-fermi-5cece4.netlify.app/")
  }

  ngOnInit(): void {
  }

}
