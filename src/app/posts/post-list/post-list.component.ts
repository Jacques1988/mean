import { Component, Input } from "@angular/core";
import { Post } from "../post.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})


export class PostListComponent {
/*  posts = [
  {title: 'first Post', content: 'This ist first post content'},
  {title: 'second Post', content: 'This ist second post content'},
  {title: 'third Post', content: 'This ist third post content'},
 ];
 */

@Input() posts:Post[] = [] ;

}
