import { Component, OnInit } from '@angular/core'
import { FaServiceService } from '../services/fa-service.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  selectedEmail: boolean = false
  showMails: boolean = true
  emails: any[] = []
  clickedemails: any[] = []

  constructor (private faService: FaServiceService) {}
  ngOnInit (): void {
    this.getData()
  }

  getData() {
    this.faService.getFeedData().subscribe((response: any) => {
      console.log('Response from server:', response);
      this.emails = response.records;
    });
  }
    
  onBack () {
    this.showMails = true
    this.selectedEmail = false
  }

  selectEmail (email: any) {
    this.showMails = false
    this.selectedEmail = true
    console.log(email)
    this.clickedemails = [email]
  }
}
