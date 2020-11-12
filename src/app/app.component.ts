import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  
  form!: FormGroup 
  selectedDate: string = ''

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl('')
    })
  }

  getReport() {
    console.log('Report generated!', this.form)
  }

}
