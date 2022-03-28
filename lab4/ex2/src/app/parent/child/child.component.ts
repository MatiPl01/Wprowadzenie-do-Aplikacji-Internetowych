import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Output() incrementCounter = new EventEmitter<void>()
  @Output() resetCounter = new EventEmitter<void>()
  @Input() isDisabled!: boolean

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.incrementCounter.emit()
  }

  onReset() {
    this.resetCounter.emit()
  }
}
