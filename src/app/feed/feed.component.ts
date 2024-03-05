import { Component, OnInit } from '@angular/core';
import { FaServiceService } from '../services/fa-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  selectedEmail: boolean = false;
  showMails: boolean = true;
  emails: any[] = [];
  clickedemails: any[] = [];
  showSpinner: boolean = false;
  searchTitle: string = '';

  constructor(private faService: FaServiceService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.showSpinner = true;
    this.faService.getFeedData().subscribe((response: any) => {
      console.log('Response from server:', response);
      this.emails = response.records;
      this.showSpinner = false;
    });
  }
    
  onBack() {
    this.showMails = true;
    this.selectedEmail = false;
  }

  selectEmail(email: any) {
    this.showMails = false;
    this.selectedEmail = true;
    console.log(email);
    this.clickedemails = [email];
  }

  get filteredEmails(): any[] {
    return this.emails.filter(email =>
      email.title.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
  }
}
