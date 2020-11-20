import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TestReport {
  complited: boolean,
  title: string,
  id?: number
}

export interface RequestData {
  startDate: string,
  endDate: string,
  deviceType: string
}

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient) { }

  addRequest(requestData: RequestData) {
    const headers = new HttpHeaders({
      'MyCustomHeader': Math.random().toString()
    })
    this.http.post<RequestData>('https://jsonplaceholder.typicode.com/todos', requestData, {
      headers
    })
      .subscribe(request => {
        console.log('requestData:', request); 
    })
  }

  changeReport(id: number): Observable<TestReport> {
    return this.http.put<TestReport>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      complited: true
    })
  }

  
}
