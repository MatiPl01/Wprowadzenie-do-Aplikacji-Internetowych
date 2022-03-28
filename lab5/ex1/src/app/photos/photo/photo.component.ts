import { Component, Input } from '@angular/core';
import { Photo } from 'src/app/shared/models/photo.model';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  @Input() photo!: Photo
}
