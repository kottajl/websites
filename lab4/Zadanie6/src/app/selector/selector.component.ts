import { Component } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})

export class SelectorComponent {
  name= "";
  descript= "";

  setTopic(name: string, descript: string) {
    this.name= name;
    this.descript= descript;
  }
}
