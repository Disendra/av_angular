import { Component } from '@angular/core'
import { FaServiceService } from '../services/fa-service.service'
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  sender: any
  title: any
  description: any
  link: any;
  chart : any;
  showSpinner: boolean = false
  userData: any[] = []

 data = [{labels: 'red'}]
  counts: any;
  labels: any;
 
  ngOnInit(): void {
    this.faService.getRoles().subscribe((response: any) => {
      console.log('Response from server:', response)
      this.labels = response.records.map((record: { role: any; }) => record.role);
      this.counts = response.records.map((record: { role_count: any; }) => record.role_count);
      this.createChart();
    });
  }

  createChart(): void {
    const myChart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Counts',
          data:  this.counts,
          backgroundColor: [
            'red',
            'pink',
            'green',
            'yellow',
            'orange',
            'blue'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 3.5
      }
    });
  }


  constructor (private faService: FaServiceService) { }

  items = [
    { name: 'User Info', dataKey: 'userData' },
    { name: 'Login Info', dataKey: 'loginInfo' },
    { name: "Today's Login", dataKey: 'todayInfo' }
  ];


  onSubmit (sender: any, title: any, description: any, link: any) {
    this.showSpinner = true
    if (sender && title && description && link) {
      this.faService
        .insertFeedData(sender, title, description, link)
        .subscribe((response: any) => {
          console.log('Form submitted:', response)
          if (response.status) {
            alert(response.message)
            this.showSpinner = false
            this.onClear()
          } else {
            alert(response.message)
            this.showSpinner = false
          }
        })
    } else {
      alert('All Fields are Mandatory')
      this.showSpinner = false
    }
  }

  downloadData (option: any) {
    if (option === 'userData') {
      this.faService.downloadLoginDataExcel()
    } else if(option === 'loginInfo') {
      this.faService.downloadLoginInfoExcel()
    } else {
      this.faService.downloadTodayLoginInfoExcel();
    }
  }

  onClear () {
    this.sender = ''
    this.title = ''
    this.description = ''
    this.link = ''
  }
}
