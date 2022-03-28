import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PhotosService } from 'src/app/services/photos.service';
import { Photo } from 'src/app/shared/models/photo.model';

type PhotoData = {
  albumID: number,
  photoID: number
}

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss']
})
export class PhotoPreviewComponent implements OnInit, OnDestroy {
  photoData!: PhotoData
  photo!: Photo
  subscription!: Subscription

  constructor(private activatedRoute: ActivatedRoute,
              private photosService: PhotosService) {}

  ngOnInit(): void {
    this.photoData = {
      albumID: +this.activatedRoute.snapshot.params['albumID'],
      photoID: +this.activatedRoute.snapshot.params['photoID']
    }
    this.loadPhoto()
    this.subscription = this.photosService.photosChangedEvent.subscribe(this.loadPhoto.bind(this))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private loadPhoto() {
    this.photo = this.photosService.getPhoto(this.photoData.albumID, this.photoData.photoID)
  }
}
