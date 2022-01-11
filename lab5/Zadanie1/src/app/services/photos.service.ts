import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Photo } from '../shared/models/photo.model';

@Injectable({
    providedIn: 'root'
})
export class PhotosService {
    photosChangedEvent = new EventEmitter<Photo[]>()
    photos: Photo[] = []
    photosMap: Map<number, Map<number, Photo>> = new Map()
    photosJsonPath: string = 'https://jsonplaceholder.typicode.com/photos/?_limit=100'

    constructor(private http: HttpClient) {
        this.http
            .get<Photo>(this.photosJsonPath)
            .subscribe(this.loadPhotos.bind(this))
    }

    getPhotos(): Photo[] {
        return this.photos
    }

    getPhoto(albumID: number, photoID: number): Photo {
        // @ts-ignore
        return this.photosMap.get(albumID)?.get(photoID)
    }

    loadPhotos(photos: any) {
        this.photos = photos
        this.photosMap = new Map()
        photos.forEach((photo: Photo) => {
            if (!this.photosMap.has(photo.albumId)) this.photosMap.set(photo.albumId, new Map())
            // @ts-ignore
            this.photosMap.get(photo.albumId).set(photo.id, photo)
        })
        this.photosChangedEvent.emit(photos)
    }
}