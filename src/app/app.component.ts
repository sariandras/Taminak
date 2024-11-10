import { Component, OnInit } from '@angular/core';
import { Star } from '../coordinate';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  win() {
    document.getElementById('task2')!.hidden = true;
    document.getElementById('result')!.hidden=false;

  }
  startTaskOne() {
    document.getElementById('landing')!.hidden = true;
    document.getElementById('task1')!.hidden = false;
    this.stars = this.getStarCoordinates(2);


  }
  stars: Star[] = [];
  counter = 0;
  constructor() {}
  ngOnInit() {
  }
  getRandomX() {
    let starWidth = 160;
    //jo a starokhoz
    let main = document.getElementById('main')
    let possibleWidth = window.innerWidth - 2 * starWidth;
    return possibleWidth * Math.random()*2;
  }
  getRandomY() {
    let starHeight = 160;
    let main = document.getElementById('main');
    let possibleHeight = window.innerHeight - 2 * starHeight;
    return possibleHeight * Math.random();
  }
  // getStars() {
  //   let stars = [];
  //   const divClass = 'star-container';
  //   for (let i = 0; i < 5; i++) {
  //     let stringSpan = `<div class="${divClass}" style="top: ${this.getRandomY()}px; left: ${this.getRandomX()}px;">
  //         <span> &#x2605;</span>
  //       </div>`;
  //     // let container = new HTMLDivElement();
  //     // container.classList.add('star-container');
  //     // container.style.top = this.getRandomY().toString() + 'px';
  //     // container.style.left = this.getRandomX().toString() + 'px';
  //     // let span = new HTMLSpanElement();
  //     // span.innerText = '&#x2605;';
  //     // container.appendChild(span);
  //     stars.push(stringSpan);
  //   }
  //   return stars;
  // }
  getStarCoordinates(count:number){
    let starPos:Star[] = []
    for (let i = 0; i < count; i++) {
      let coord: Star = {id:i ,x: this.getRandomX(), y: this.getRandomY() };
      starPos.push(coord)
    }
    return starPos;
  }
  removeStar(id:number){
    this.stars = this.stars.filter(s=>s.id!=id)
    this.counter++;
    if (this.counter==1) {
      startTaskTwo();
    }
  }
}

function startTaskTwo() {
    document.getElementById('task1')!.hidden = true;
    document.getElementById('task2')!.hidden = false;

}

