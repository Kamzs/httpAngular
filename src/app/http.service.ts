import { Injectable } from '@angular/core';
import { Post } from './app.component';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  dataContainer = new BehaviorSubject<Array<Post>>([]);
  containerObserver$: Observable<Array<Post>> = this.dataContainer.asObservable();

  constructor(private client: HttpClient) {

    this.getPostsObservableAndRethrowIfNoError();
  }


  getPosts(): Observable<Array<Post>> {
    return this.client.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts');

  }

  getPost(id: number): Observable<Post> {
    return this.client.get<Post>('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  getPostByUserId(userId: number): Observable<Array<Post>> {
    const parametry = new HttpParams().set('userId', userId.toString());
    return this.client.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts', {params: parametry});

  }

  addPost(post: Post): Observable<Post> {
    return this.client.post<Post>('https://jsonplaceholder.typicode.com/posts', post);

  }

  updatePost(post: Post) {
    return this.client.put<Post>('https://jsonplaceholder.typicode.com/posts/' + post.id, post);
  }

  deletePost(id: number) {
    return this.client.delete<Post>('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  changePost(post: Post) {
    return this.client.patch<Post>('https://jsonplaceholder.typicode.com/posts/' + post.id, post);

  }

  deletePostWrongUrl(id: number) {
    return this.client.delete<Post>('https://jsonplaceholder.typicode.com/postsa/' + id);
  }

  getPostsWhereFullObject(): Observable<HttpResponse<Response>> {
    return this.client.get<Response>('https://jsonplaceholder.typicode.com/posts', {observe: 'response'});

  }

  getPostsObservableAndRethrowIfNoError() {
    this.client.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts').subscribe(
      data => {this.dataContainer.next(data); },
      error => {console.log(error); }
    );

  }
}
