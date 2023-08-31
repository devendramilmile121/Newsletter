import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  baseUrl: string = 'http://localhost:4201';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Subscriber`)
  }

  post(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Subscriber`, payload);
  }
}
