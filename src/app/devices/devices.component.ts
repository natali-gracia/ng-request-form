import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface Device {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  @Input() formParent!: FormGroup

  selectedValue: string = ''

  constructor() { }

  devices: Device[] = [
    {value: 'temperature', viewValue: 'Temperature Device'},
    {value: 'humidity', viewValue: 'Humidity Device'}
  ]

  ngOnInit(): void {
  }

}
