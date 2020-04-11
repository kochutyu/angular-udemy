import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/user.interface';

@Pipe({
  name: 'searchPost'
})
export class SearchPostPipe implements PipeTransform {

  transform(posts: Post[], search: string = ''): Post[] {
    if (!search.trim()) {
      return posts
    }
    return posts.filter(post => { 
      const title = post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
      const name = post.author.toLocaleLowerCase().includes(search.toLocaleLowerCase());
      const res = title || name;
      return res;
    } );
  }

}
