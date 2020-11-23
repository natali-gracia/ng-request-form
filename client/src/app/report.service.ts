import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

export interface RequestData {
  startDate: number
  endDate: number
  deviceType: string
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  fetchReport(requestData: RequestData): Observable<RequestData[]> {
    const params = new HttpParams()
      .append('startDate', requestData.startDate.toString())
      .append('endDate', requestData.endDate.toString())
      .append('deviceType', requestData.deviceType)

    return this.http
      .get<RequestData[]>('/api/generate-report', {
        params,
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((error) => {
          console.log('Error: ', error.message)
          return throwError(error)
        })
      )
  }
}
