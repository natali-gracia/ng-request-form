import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerRequestService } from './services/server-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  
  form!: FormGroup

  constructor(private requestService: ServerRequestService) {}

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      device: new FormControl('', Validators.required)
    })
  }

  getReport() {
    const formData = {...this.form.value}
    console.log('Form Data: ', formData);
    this.requestService
      .downloadReport('http://localhost:3000/download-report')
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'download-report';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
}
