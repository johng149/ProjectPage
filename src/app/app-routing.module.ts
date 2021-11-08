import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SimilarityComponent } from './projects/similarity/similarity.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "similarity", component: SimilarityComponent},
  {path: "about", component: AboutComponent},
  {path: "**", component: HomeComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
