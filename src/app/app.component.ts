import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'http-project';

  constructor(private httpService: HttpService) {}

  postsToShow: Array<Post>;
  postsToShowUsingAsyncPipe$: Observable<Array<Post>>;
  postsToShowUsingAsyncPipe2$: Observable<Array<Post>>;

  getPosts() {
    this.httpService.getPosts().subscribe(posts => {
      console.log(posts);
      }
    );
  }

  getPost() {
    this.httpService.getPost(1).subscribe(post => {
      console.log(post);
      }
    );
  }


  getPostByUserId() {
    this.httpService.getPostByUserId(1).subscribe(posts => {
      console.log(posts);
    });
  }

  addPost() {
    const post: Post = ({
      userId: 1,
      id: null,
      title: 'jakis post',
      body: 'zawartosc posta'
    });

    this.httpService.addPost(post).subscribe(response => {console.log(response); } );

  }

  updatePost() {
    const post: Post = ({
      userId: 1,
      id: 1,
      title: 'jakis post updated whole object',
      body: 'zawartosc posta updated whole object'
    });

    this.httpService.updatePost(post).subscribe(response => { console.log(response); } );
  }

  deletePost() {
    this.httpService.deletePost(1).subscribe(response => { console.log(response); } );

  }

  changePost() {
    const post: Post = ({
      id: 1,
      body: 'zawartosc body w poscie zmieniona'
    });
    this.httpService.changePost(post).subscribe(response => { console.log(response); } );

  }

  deletePostProducingError() {
    //retry pozwala sprobowac kilka razy
    this.httpService.deletePostWrongUrl(1).subscribe(
      response => { console.log(response); },
      (error: Error) => {console.log(error.message) ; } );
  }

  getPostsWhereShowedFullObject() {
    this.httpService.getPostsWhereFullObject().subscribe(response => {
      console.log(response);

      }
    );
  }

  getPostsDoWyswietleniaBezAsyncPipe() {
    this.httpService.getPosts().subscribe(
      tableOfPosts => {this.postsToShow = tableOfPosts; } );
  }

  getPostsZUzycieAsyncPipe() {
    this.postsToShowUsingAsyncPipe$ =  this.httpService.getPosts();

  }

  getPostsZUzycieAsyncPipeIObslugaBledu() {
    this.postsToShowUsingAsyncPipe2$ =  this.httpService.containerObserver$;
  }
}

export interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
