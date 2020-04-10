import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, fbCreateResponse,  } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  create(post: Post): Observable<Post> { 
    return this.http.post(`${environment.FbDbUrl}/posts.json`, post).pipe(map((res: fbCreateResponse) => { 
      return {
        ...post,
        id: res.name,
        date: new Date(post.date)
      }
    }));
    
  }
}
