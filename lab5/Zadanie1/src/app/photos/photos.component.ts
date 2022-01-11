import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PhotosService } from '../services/photos.service';
import { Photo } from '../shared/models/photo.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, OnDestroy {
  photos: Photo[] = []

  subscription!: Subscription

  constructor(private photosService: PhotosService) { }

  ngOnInit(): void {
    this.photos = this.photosService.getPhotos()
    this.subscription = this.photosService.photosChangedEvent.subscribe((photos: Photo[]) => this.photos = photos)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
