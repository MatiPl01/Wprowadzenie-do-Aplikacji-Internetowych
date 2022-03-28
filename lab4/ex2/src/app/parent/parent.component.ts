import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  threshold: number = 10
  counter: number = 0
  isDisabled: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  incrementCounter() {
    this.counter++
    if (this.counter === this.threshold) this.isDisabled = true
  }

  resetCounter() {
    this.isDisabled = false
    this.counter = 0
  }
}
