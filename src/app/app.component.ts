import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportService, RequestData } from './report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  
  form!: FormGroup
  report: RequestData[] = []

  constructor(private ReportService: ReportService) {}

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      device: new FormControl('', Validators.required)
    })
  }

  getReport() {

    const requestData = {
      startDate: this.form.value.date.startDate._d,
      endDate: this.form.value.date.endDate._d,
      deviceType: this.form.value.device
    }

    console.log('requestData: ', requestData);

    this.ReportService.fetchReport(requestData)
      .subscribe(report => {
          this.report = report
          console.log('Response: ', this.report)
        }, 
      )
  }
}
