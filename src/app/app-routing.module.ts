import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SimilarityComponent } from './projects/similarity/similarity.component';
import { GanComponent } from './projects/gan/gan.component';
import { ParagraphraterComponent } from './projects/paragraphrater/paragraphrater.component';
import { WritingtoolComponent } from './projects/writingtool/writingtool.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "similarity", component: SimilarityComponent},
  {path: "gan", component: GanComponent},
  {path: "paragraphrater", component: ParagraphraterComponent},
  {path: "about", component: AboutComponent},
  {path: "writingtool", component: WritingtoolComponent},
  {path: "**", component: HomeComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
