import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// module that imports angular material 
import { MaterialModule } from './_modules/material.module';

import { HttpClientModule } from '@angular/common/http';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { AboutComponent } from './about/about.component';
import { SimilarityComponent } from './projects/similarity/similarity.component';
import { SimilaritydemoComponent } from './projects/similarity/similaritydemo/similaritydemo.component';
import { GanComponent } from './projects/gan/gan.component';
import { ParagraphraterComponent } from './projects/paragraphrater/paragraphrater.component';
import { ParagraphraterdemoComponent } from './projects/paragraphrater/paragraphraterdemo/paragraphraterdemo.component';
import { WritingtoolComponent } from './projects/writingtool/writingtool.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    CardComponent,
    AboutComponent,
    SimilarityComponent,
    SimilaritydemoComponent,
    GanComponent,
    ParagraphraterComponent,
    ParagraphraterdemoComponent,
    WritingtoolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
