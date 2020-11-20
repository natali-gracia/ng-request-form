import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { ReportService, TestReport } from './report.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit { 
  
  report: TestReport[] = []
  reportView: boolean = false
  loading: boolean = true
  form!: FormGroup
  error: string = ''

  constructor(
    private http: HttpClient,
    private ReportService: ReportService
  ) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      device: new FormControl('', Validators.required)
    })
    const params = new HttpParams()
      .append('_limit', '4')
      .append('custom', 'sth')
      .set('_limit', '6')
    this.http.get<TestReport[]>('https://jsonplaceholder.typicode.com/todos', {params}
    // , {
    //   params: new HttpParams().set('_limit', '5')
    // }
    )
      .pipe(
        delay(500),
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error)
        })
      )
      .subscribe(report => {
        this.report = report
        this.loading = false
        console.log('Response', this.report)
      }, error => {
        this.error = error.message
      })
  }

  getReport() {

    const requestData = {
      startDate: this.form.value.date.startDate._d,
      endDate: this.form.value.date.endDate._d,
      deviceType: this.form.value.device
    }

    this.ReportService.addRequest(requestData)

    this.reportView = !this.reportView
  }

  removeItem(id: number) {
    this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => 
        this.report.filter(item => item.id !== id)
    )
  }

  modifyItem(id: number) {
    this.ReportService.changeReport(id)
      .subscribe(item => {
        console.log(item)  
      })
  }
}
