import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-responsive',
  templateUrl: './img-responsive.component.html',
  styleUrls: ['./img-responsive.component.scss']
})
export class ImgResponsiveComponent implements OnInit {
  @Input() breakpoints!: number[]
  @Input() paths!: string[]
  @Input() sizes!: string
  @Input() alt!: string
  srcset: string = ''
  src: string = ''

  ngOnInit(): void {
    this.srcset = this.createSrcset()
    this.src = this.paths.length > 0 ? this.paths[this.paths.length - 1] : ''
  }

  createSrcset(): string {
    return this.paths
      .map((path, idx) => `${path} ${this.breakpoints[idx]}w`)
      .join(',')
  }
}
