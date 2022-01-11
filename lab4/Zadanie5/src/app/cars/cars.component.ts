import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

type colorType = { name: string, value: string }
type carType = { brand: string, model: string, colors: colorType[] }
type choiceType = { brand: string, model: string, color: string}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  private carsJsonPath = 'assets/json/cars.json'
  carsData: Map<string, Map<string, Map<string, string>>> = new Map()
  choice: choiceType = { brand: '', model: '', color: '' }

  constructor(private http: HttpClient) {
    this.http
      .get(this.carsJsonPath)
      .subscribe(this.loadData.bind(this))
  }
    
  ngOnInit(): void {
  }

  getBrands() {
    return [...this.carsData.keys()]
  }

  getModels() {
    return [...(this.carsData.get(this.choice.brand)
              ?.keys() 
            || [])]
  }

  getColors() {
    return [...(this.carsData.get(this.choice.brand)
              ?.get(this.choice.model)
              ?.keys() 
            || [])]
  }

  getColor(color: string) {
    return this.carsData
        .get(this.choice.brand)
        ?.get(this.choice.model)
        ?.get(color) || 'transparent'
  }
  
  onBrandChange(event: Event) {
    this.choice.brand = (<HTMLInputElement>event.target).value;
    this.choice.model = this.choice.color = ''
  }

  onModelChange(event: Event) {
    this.choice.model = (<HTMLInputElement>event.target).value;
    this.choice.color = ''
  }

  onColorChange(color: string) {
    this.choice.color = color
  }

  loadData(data: any): void {
    data.forEach((car: carType) => this.addCar(car))
  }

  private addCar(car: carType): void {
    if (!this.carsData.has(car.brand)) this.carsData.set(car.brand, new Map())
    const colorsMap = new Map()
    car.colors.forEach((color: colorType) => colorsMap.set(color.name, color.value))
    this.carsData.get(car.brand)?.set(car.model, colorsMap)
  }
}
