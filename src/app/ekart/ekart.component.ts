import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { UserServicesService } from '../services/user-services.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-ekart',
  templateUrl: './ekart.component.html',
  styleUrls: ['./ekart.component.css']
})
export class EkartComponent implements OnInit {
  userName = 'Disendra';
  title! : string;
  description! : string;
  location! : string;
  selectedFile: any;
  mobileNumber! : number;
  price! : number;
  products : any[] = [];
  showUpload : boolean = false;
  showContact : boolean = false;
  showSpinner : boolean = false;
  selectedItem : any;
  searchText: string = '';
  emailId : string = 'Disendra889@gmail.com';
  @ViewChild('seller') sellerForm!: TemplateRef<any>
  @ViewChild('contact') onContact!: TemplateRef<any>
  
constructor(private dialog: MatDialog, private userService : UserServicesService,private authService : AuthServiceService) {}
  ngOnInit(): void { 
    // this.emailId = this.authService.getLoggedInEmail();

    this.getCartData();
 }
  

  // products = [
  //   {
  //     name: 'Camera',
  //     price: 30000,
  //     description: 'Product',
  //     imageUrl: 'assets/img/ekart/p1.png',
  //     location : 'Mumbai',
  //     MobileNumber : 8919484183,
  //     sellerName : 'Disendra Gosu'
  //   },
  //   {
  //     name: 'Video Game',
  //     price: 45000,
  //     description: 'Product',
  //     imageUrl: 'assets/img/ekart/p2.png',
  //     location : 'Bengaluru',
  //     MobileNumber : 8919484183,
  //     sellerName : 'Disendra Gosu'
  //   },
  //   {
  //     name: 'Drone',
  //     price: 84000,
  //     description: 'Product',
  //     imageUrl: 'assets/img/ekart/p3.png',
  //     location : 'Hyderabad',
  //     MobileNumber : 8919484183,
  //     sellerName : 'Disendra Gosu'
  //   },
  //   {
  //     name: 'Speaker',
  //     price: 578000,
  //     description: 'Product',
  //     imageUrl: 'assets/img/ekart/p4.png',
  //     location : 'Bengaluru',
  //     MobileNumber : 8919484183,
  //     sellerName : 'Disendra Gosu'
  //   },
  //   {
  //     name: 'Speaker',
  //     price: 33400,
  //     description: 'Product',
  //     imageUrl: 'assets/img/ekart/p5.png',
  //     location : 'Hyderabad',
  //     MobileNumber : 8919484183,
  //     sellerName : 'Disendra Gosu'
  //   },
  //   {
  //     name: 'Video Game',
  //     price: 45000,
  //     description: 'Product',
  //     imageUrl: 'assets/img/ekart/p6.png',
  //     location : 'Bengaluru',
  //     MobileNumber : 8919484183,
  //     sellerName : 'Disendra Gosu'
  //   },
  //   {
  //     name: 'Drone',
  //     price: 3000,
  //     description: 'Product',
  //     imageUrl: 'assets/img/ekart/p7.png',
  //     location : 'Chennai',
  //     MobileNumber : 8919484183,
  //     sellerName : 'Disendra Gosu'
  //   },
  //   {
  //     name: 'Camera',
  //     price: 67000,
  //     description: 'Product',
  //     imageUrl: 'assets/img/ekart/p8.png',
  //     location : 'Bengaluru',
  //     MobileNumber : 8919484183,
  //     sellerName : 'Disendra Gosu'
  //   }
  //   // Add more products as needed
  // ]

getCartData() {
  this.userService.getCartData().subscribe(
    (response:any) => {
     this.products = response.records;
    }
  )
}


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

onUpload() {
  this.showSpinner = true; // Show spinner before making HTTP request
  if (!this.emailId || !this.title || !this.description || !this.location || !this.mobileNumber || !this.price || !this.selectedFile) {
      alert('Please fill in all required fields.');
      this.showSpinner = false; // Hide spinner if validation fails
      return;
  }
  const formData = new FormData();
  formData.append('emailId', this.emailId);
  formData.append('title', this.title);
  formData.append('description', this.description);
  formData.append('location', this.location);
  formData.append('mobileNumber', this.mobileNumber.toString()); // Convert number to string
  formData.append('price', this.price.toString()); // Convert number to string
  formData.append('image', this.selectedFile);

  this.userService.insertCart(formData).subscribe(
      (response:any) => {
          console.log('Response from server:', response);
          this.showSpinner = false; // Hide spinner after receiving response
          if (response && response.status) {
              alert(response.message);
              window.location.reload();
          } else {
              alert('An error occurred. Please try again later.');
          }
      },
      (error) => {
          console.error('Error:', error);
          this.showSpinner = false; // Hide spinner if error occurs
          alert('An error occurred. Please try again later.');
      }
  );
}

   get filteredProducts() {
    return this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
  formatUsername (emailId: string): string {
    const username = emailId.split('@')[0] // Extract username
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() // Convert to title case
  }

  selectedProduct(index: any) {
    this.openDialogWithTemplateRef(this.onContact);
    console.log(index);
    this.selectedItem = [index];
  }

  onCart() {
    this.openDialogWithTemplateRef(this.sellerForm);
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.dialog.open(templateRef);
    } else {
      console.error('TemplateRef is undefined');
    }
  }
}
