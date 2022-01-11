import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Dish } from '../shared/models/dish.model'

const headers = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
    })
}

@Injectable({
    providedIn: 'root'
})
export class WebRequestService {
    private readonly API_URL: string = 'http://localhost:3000/v1'

    constructor(private http: HttpClient) {}

    get(url: string): Observable<any> {
        return this.http.get(`${this.API_URL}/${url}`)
    }

    post(url: string, obj: Dish): Observable<any> {
        return this.http.post(`${this.API_URL}/${url}`, obj, headers)
    }

    patch(url: string, obj: Dish): Observable<any> {
        return this.http.patch(`${this.API_URL}/${url}`, obj, headers)
    }

    delete(url: string): Observable<any> {
        return this.http.delete(`${this.API_URL}/${url}`)
    }
}
