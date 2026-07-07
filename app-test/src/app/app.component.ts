import { Component, OnInit } from '@angular/core';
import { StudentInformation } from './student-information';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'app-test';

  studentInformation: StudentInformation | null = null;
  showSecret = false;

  constructor(private readonly http: HttpService) {}

  ngOnInit(): void {
    this.http.getStudentInformation().subscribe({
      next: (res: StudentInformation) => (this.studentInformation = res),
      error: (e) => (this.studentInformation = null),
      complete: () => console.info('complete'),
    });
  }
}
