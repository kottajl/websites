import { Component } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent {
  lastClicked: number= 1;

  ngOnInit(): void {
    this.clicked(1);
  }

  clicked(n: number): void {
    document.getElementById("link" + this.lastClicked)?.setAttribute("class", "notChosen");
    document.getElementById("link" + n)?.setAttribute("class", "chosen");
    this.lastClicked= n;
  }
}
