import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/admin/shared/services/posts.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/admin/shared/interfaces/user.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  post$: Observable<Post[]>

  constructor(
    public postS: PostsService
  ) { }

  ngOnInit(): void {
    this.post$ = this.postS.getAll();
  }

}
