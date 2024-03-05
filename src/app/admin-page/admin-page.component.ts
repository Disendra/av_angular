import { Component } from '@angular/core'
import { FaServiceService } from '../services/fa-service.service'
import Chart from 'chart.js/auto';
import { UserServicesService } from '../services/user-services.service';

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

  constructor (private faService: FaServiceService,private userService:UserServicesService) { }

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

   this.userService.getFeedBackData().subscribe((response:any) => {
    console.log('Response from server:', response)
    this.labels = response.records.map((record: { rating: any; }) => record.rating);
    this.counts = response.records.map((record: { count: any; }) => record.count);
    this.createRatingChart();
   })


  }

  createChart(): void {
    const myChart = new Chart("myChart", {
        type: 'pie',
        data: {
            labels: this.labels,
            datasets: [{
                label: 'Counts',
                data: this.counts,
                backgroundColor: [
                    'red',
                    'pink',
                    'green',
                    'yellow',
                    'orange',
                    'blue'
                ],
                hoverOffset: 3
            }]
        },
        options: {
            aspectRatio: 2,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            var label = context.label || '';
                            var value = context.parsed || 0;
                            var total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                            var percentage = parseFloat((value / total * 100).toFixed(2));
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}



createRatingChart(): void {
  let labelsWithStars = this.labels.map((label: string) => label + ' Stars');
  const myChart = new Chart("myRatingChart", {    
      type: 'pie',
      data: {
          labels: labelsWithStars,
          datasets: [{
              label: 'Counts',
              data: this.counts,
              backgroundColor: [
                  'black',
                  'blue',
                  'Red',
                  'lightgrey',
                  'green'
              ],
              hoverOffset: 3
          }]
      },
      options: {
          aspectRatio: 2,
          plugins: {
              tooltip: {
                  callbacks: {
                      label: function(context) {
                          var label = context.label || '';
                          var value = context.parsed || 0;
                          var total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                          var percentage = parseFloat((value / total * 100).toFixed(2));
                          return `${label}: ${value} (${percentage}%)`;
                      }
                  }
              }
          }
      }
  });
}

  items = [
    { name: 'User Info', dataKey: 'userData' },
    { name: 'Login Info', dataKey: 'loginInfo' },
    { name: "Today's Login", dataKey: 'todayInfo' },
    { name: "FeedBack", dataKey: 'feedBack'}
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
    } else if(option === 'todayInfo') {
      this.faService.downloadTodayLoginInfoExcel();
    } else if(option === 'feedBack') {
      this.faService.downloadFeedBackExcel();
    }
  }

  onClear () {
    this.sender = ''
    this.title = ''
    this.description = ''
    this.link = ''
  }
}
