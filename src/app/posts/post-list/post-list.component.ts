import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post.model';
import { PostService } from "../posts.service";
import { Observable, Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})


export class PostListComponent implements OnInit, OnDestroy {

  constructor(public postsService: PostService) { }

  posts: Post[] = [];
  private postsSub:Subscription = new Subscription;
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizeOptions = [1,2,5,10];

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
    this.posts = posts;
    });
  }

  onChangedPage(pageData: PageEvent){
    console.log(pageData);
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  };
}
