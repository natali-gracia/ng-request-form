import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface TestReport {
  complited: boolean,
  title: string,
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  
  formData: FormControl[] = []

  report: TestReport[] = []

  reportView: boolean = true

  constructor(private http: HttpClient) {

  }
  
  form!: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      device: new FormControl('', Validators.required)
    })
    this.http.get<TestReport[]>('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .subscribe(report => {
        this.report = report
        console.log('Response', this.report)
      })
  }

  getReport() {
    this.formData = {...this.form.value}
    console.log('Form Data: ', this.formData)
    this.reportView = !this.reportView
  }
}
