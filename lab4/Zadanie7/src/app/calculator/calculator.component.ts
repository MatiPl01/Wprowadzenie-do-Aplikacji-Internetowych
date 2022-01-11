import { isNgContainer, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  prevOperand: string = ''
  currOperand: string = '0'
  operation: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  onRemove() {
    this.currOperand = this.currOperand.slice(0, this.currOperand.length - 1)
    if (!this.currOperand) this.currOperand = '0'
  }

  onClearInput() {
    this.currOperand = ''
  }

  onClearAll() {
    this.currOperand = this.prevOperand = this.operation = ''
  }

  onInput(value: string) {
    if (value === '.') {
      if (this.currOperand.includes('.')) return
      if (this.currOperand === '0') {
        this.currOperand = '0.'
        return
      }
    }
    if (this.currOperand === '0') this.currOperand = value.toString()
    else this.currOperand += value.toString()
  }

  onOperation(op: string) {
    if (op !== '=' && !this.currOperand) {
      this.operation = op
      return
    }
    if (this.prevOperand) this.compute()
    this.operation = op
    this.prevOperand = this.currOperand
    if (!this.currOperand) this.operation = ''
    if (op) this.currOperand = ''
  }

  compute() {
    let result: number
    const x: number = +this.prevOperand
    const y: number = +this.currOperand

    if (isNaN(x) || isNaN(y)) return;

    switch (this.operation) {
      case '+':
        result = x + y
        break
      case '-':
        result = x - y
        break
      case 'x':
        result = x * y
        break
      case '/':
        result = x / y
        break
      default:
        return
    }

    this.currOperand = result.toString()
    this.operation = this.prevOperand = ''
  }
}
