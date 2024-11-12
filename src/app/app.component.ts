import { Component } from '@angular/core';
import { Star } from '../coordinate';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  stars: Star[] = [];
  faStars = [
    'fa-solid fa-star-of-life',
    'fa-regular fa-star',
    'fa-solid fa-star',
    'fa-regular fa-sun',
    'fa-solid fa-certificate',
  ];
  counter = 0;
  won: boolean = false;

  constructor() {
    this.makeTwoRandomStars();
  }

  makeTwoRandomStars() {
    while (this.faStars.length != 2) {
      this.faStars.splice(this.getRandomInt(0, this.faStars.length), 1);
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  win(event: Event) {
    document.getElementById('task2')!.hidden = true;
    document.getElementById('result')!.hidden = false;
    console.log(String(event.currentTarget));
    if (String(event.currentTarget).includes('HTMLSpanElement')) {
      this.won = true;
      return;
    }
    this.won = false;
  }
  startTaskOne() {
    this.counter = 0;
    document.getElementById('landing')!.hidden = true;
    document.getElementById('task1')!.hidden = false;
    this.stars = this.getStarCoordinates(1);
  }
  startTaskTwo() {
    document.getElementById('task1')!.hidden = true;
    document.getElementById('task2')!.hidden = false;
  }
  getStarCoordinates(count: number) {
    const starSize = 160;
    const starPos: Star[] = [];

    for (let i = 0; i < count; i++) {
      let isValidPosition = false;
      let coord: Star | null = null;

      while (!isValidPosition) {
        coord = {
          id: i,
          x: this.getRandomX(starSize),
          y: this.getRandomY(starSize),
        };

        isValidPosition = starPos.every(
          (existingStar) =>
            !this.areCoordinatesTooClose(existingStar, coord!, starSize)
        );
      }

      starPos.push(coord!);
    }

    return starPos;
  }

  getRandomX(starSize: number) {
    const margin = starSize;
    const possibleWidth = window.innerWidth - 2 * margin;

    return margin + Math.random() * possibleWidth;
  }

  getRandomY(starSize: number) {
    const margin = starSize;
    const possibleHeight = window.innerHeight - 2 * margin;

    return margin + Math.random() * possibleHeight;
  }

  areCoordinatesTooClose(
    star1: Star,
    star2: Star,
    minDistance: number
  ): boolean {
    const dx = star1.x - star2.x;
    const dy = star1.y - star2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < minDistance;
  }

  removeStar(id: number) {
    this.stars = this.stars.filter((s) => s.id != id);
    this.counter++;
    if (this.counter == 1) {
      this.startTaskTwo();
    }
  }
}


