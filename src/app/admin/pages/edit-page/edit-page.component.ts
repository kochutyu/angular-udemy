import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PostsService } from '../../shared/services/posts.service';
import { switchMap } from 'rxjs/operators';
import { Post } from '../../shared/interfaces/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public postS: PostsService

  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => { 
        return this.postS.getById(params['id']);
      })
    ).subscribe((post: Post) => { 
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      });
    });
  }

  submit(): void { 

  }

}
