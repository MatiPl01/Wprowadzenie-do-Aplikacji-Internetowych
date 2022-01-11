import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  @Input() brand: string = '-'
  @Input() model: string = '-'
  @Input() colorName: string = '-'
  @Input() colorValue: string = 'transparent'

  constructor() {}

  ngOnInit(): void {
  }
}
