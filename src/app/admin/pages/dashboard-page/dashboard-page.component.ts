import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { PostsService } from '../../shared/services/posts.service';
import { Subscription } from 'rxjs';
import { Post } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  constructor(
    private us: AuthService,
    public postsS: PostsService
  ) { }

  postsSub: Subscription;
  posts: Post[] = [];
  ngOnInit(): void {
    this.postsSub = this.postsS.getAll().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }
  test() {
    this.us.logout();
  }
  remove(id: string): void { 
    
  }
}
