import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
  @Input() rating: number = 0;
  @Input() ShowDiv: boolean = true;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  toggle1 = true;
  toggle2 = true;
  toggle3 = true;
  toggle4 = true;
  toggle5 = true;



  starClicked(e: number) {
    this.rating = e;
    this.onClick()
    this.toggle1 = this.toggle2 = this.toggle3 = this.toggle4 = this.toggle5 = true;
    if (e >= 20) {
      this.toggle1 = !this.toggle1;
    }
    if (e >= 40) {
      this.toggle2 = !this.toggle2;
    }
    if (e >= 60) {
      this.toggle3 = !this.toggle3;
    }
    if (e >= 80) {
      this.toggle4 = !this.toggle4;
    }
    if (e >= 100) {
      this.toggle5 = !this.toggle5;
    }
  }

  onClick(): void {
    this.ratingClick.emit(this.rating);
  }

  ngOnChanges(): void {
    this.toggle1 = this.toggle2 = this.toggle3 = this.toggle4 = this.toggle5 = true;
    if (this.rating >= 20) {
      this.toggle1 = !this.toggle1;
    }
    if (this.rating >= 40) {
      this.toggle2 = !this.toggle2;
    }
    if (this.rating >= 60) {
      this.toggle3 = !this.toggle3;
    }
    if (this.rating >= 80) {
      this.toggle4 = !this.toggle4;
    }
    if (this.rating >= 100) {
      this.toggle5 = !this.toggle5;
    }
  }

}
