import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  // url = 'https://av-nodejs.onrender.com'

  url = 'http://localhost:3000';

  constructor (private http: HttpClient) {}

  getCartData () {
    return this.http.get(`${this.url}/getCartData`)
  }

  insertCart (data: FormData) {
    return this.http.post(`${this.url}/insertCart`, data)
  }

  insertFeedback(feedbackData:any) {
    return this.http.post(`${this.url}/insertFeedBack`,feedbackData)
  }

  getFeedBackData() {
    return this.http.get(`${this.url}/getFeedBackData`)
  }

}