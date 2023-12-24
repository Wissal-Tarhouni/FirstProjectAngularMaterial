import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { username } from './pipes/username.pipe';
import { timeAgoPipe } from './pipes/time-ago-pipe';
import { HighlightDirective } from './directives/highlight.directive';



@NgModule({
  declarations: [
    CommentsComponent ,
    ShortenPipe ,
    username , 
    timeAgoPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
exports :[
CommentsComponent ,
MaterialModule,
ReactiveFormsModule,
ShortenPipe,
username , 
timeAgoPipe,
HighlightDirective
]


})
export class SharedModule { }
