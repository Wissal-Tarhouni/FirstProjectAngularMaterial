import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/Models/comment.model';
import { FormControl } from '@angular/forms';
import { FormBuilder , Validators } from '@angular/forms';
import { animate, group, query, sequence, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],

 animations : [

trigger('listItem', [
  state('default', style({
    transform: 'scale(1)',
    'background-color': 'white',
    'z-index': 1
  })),
  state('active', style({
    transform: 'scale(1.05)',
    'background-color': 'rgb(201, 157, 242)',
    'z-index': 2
  })),
  transition('default => active', [
    animate('100ms ease-in-out')
  ]),
  transition('active => default', [
    animate('500ms ease-in-out')
  ]),

  transition('void => *', [
    style({
        transform: 'translateX(-100%)',
        opacity: 0,
        'background-color': 'rgb(201, 157, 242)',
    }),
    animate('250ms ease-out', style({
        transform: 'translateX(0)',
        opacity: 1,
        'background-color': 'white',
    })),


    group([
      sequence([
          animate('250ms', style({
              'background-color': 'rgb(255,7,147)'
          })),
          animate('250ms', style({
              'background-color': 'white'
          })),
      ]),
      query('.comment-text', [
          animate('250ms', style({
              opacity: 1
          }))
      ]),
      query('.comment-date', [
          animate('500ms', style({
              opacity: 1
          }))
      ]),
  ]),
  ])
])
]
})
export class CommentsComponent implements OnInit{

  @Input() comments !: Comment[] ;
  @Output() newComment = new EventEmitter<string>();

  animationStates: { [key: number]: 'default' | 'active' } = {};

  
  // tempDate = new Date() ;
  
  commentCtrl!: FormControl;
  
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);

    for (let index in this.comments) {
      this.animationStates[index] = 'default';
  }
  }
  
  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
  }
  const maxId = Math.max(...this.comments.map(comment => comment.id));
  this.comments.unshift({
      id: maxId + 1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
  });
  this.newComment.emit(this.commentCtrl.value);
  this.commentCtrl.reset();
  }
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
}

onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
}




}
