import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  constructor (private service: DataService) {}
  postsArray: any[]= [];

  ngOnInit(): void {
    this.service.getPosts().subscribe(result => this.postsArray= result);
  }

  makeNewPost() {
    let title= (document.getElementById("newTitle") as HTMLInputElement).value;
    let content= (document.getElementById("newContent") as HTMLInputElement).value;

    if (title === "" || content === "") {
      alert("Wypełnij wszystkie pola");
      return;
    }

    let newPost= {
      "userId": this.postsArray.reduce((post1, post2) => Math.max(post1.userId, post2.userId), -Infinity) + 1,
      "id": this.postsArray.reduce((post1, post2) => Math.max(post1.id, post2.id), -Infinity) + 1,
      "title": title,
      "body": content
    }

    this.service.sendNewPost(JSON.stringify(newPost)).subscribe(result => this.postsArray.unshift(result));
  }

}
