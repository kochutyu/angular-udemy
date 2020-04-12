import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, fbCreateResponse, } from '../interfaces/user.interface';
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
    this.getAll()
    return this.http.post(`${environment.FbDbUrl}/posts.json`, post).pipe(map((res: fbCreateResponse) => {
      return {
        ...post,
        id: res.name,
        date: new Date(post.date)
      }
    }));
  }

  getAll(): Observable<Post[]> {
    console.log(this.http.get(`${environment.FbDbUrl}/posts.json`));
    
    return this.http.get(`${environment.FbDbUrl}/posts.json`)
      .pipe(
        map((res: { [key: string]: any }) => {
          console.log(res);
          
          return Object
            .keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              data: new Date(res[key].data)
            }));
        })
      )
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.FbDbUrl}/posts/${id}.json`).pipe(
      map((post: Post) => { 
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      })
    );
  }

  remove(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.FbDbUrl}/posts/${id}.json`);
  }

  update(post: Post): Observable<Post>{
    return this.http.patch<Post>(`${environment.FbDbUrl}/posts/${post.id}.json`, post);
  }
}
