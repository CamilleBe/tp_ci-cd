import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StudentInformation } from './student-information';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getStudentInformation(): Observable<StudentInformation> {
    return this.http.get<StudentInformation>('assets/config.json');
  }
}
