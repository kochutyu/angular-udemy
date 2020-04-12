import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PostsService } from '../../shared/services/posts.service';
import { switchMap } from 'rxjs/operators';
import { Post } from '../../shared/interfaces/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  submitted: boolean;
  updateSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public postS: PostsService,
    private alert: AlertService

  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postS.getById(params['id']);
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      });
    });
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
  submit(): void {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    this.updateSub = this.postS.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false;
      this.alert.success('Пост оновленно!');
    });
  }

}
