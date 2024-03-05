import { Component, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { AuthServiceService } from 'src/app/services/auth-service.service'
import { PopupService } from 'src/app/services/popup.service'

@Component({
  selector: 'app-av-header',
  templateUrl: './av-header.component.html',
  styleUrls: ['./av-header.component.css']
})
export class AvHeaderComponent {
  panelOpenState = false
  isKnowledgeBaseExpanded: boolean = false
  isSimultor: boolean = false
  isAbout: boolean = true;
  isProfile: boolean = false;
  isFeed : boolean = false;
  dialogRef: any;
  isDialogOpen: boolean = false;
  isCommunity : boolean = false;
  isDirectory: boolean = false;
  isKnowledge: boolean = false;
  userName : string = 'Disendra';
  activeMenuItem: any;
  CickedsocialMedia : any;
  showChatbot : boolean = false;
  showChatbotIcon : boolean = true;
  profileWeight: number = 85;
  @ViewChild('myDialog') myDialog!: TemplateRef<any>

  constructor(private router: Router,private dialog: MatDialog,private authService : AuthServiceService, private popup:PopupService) { 
    console.log(authService.getLoggedInEmail());
  }

  onClick (type: any) {
    this.activeMenuItem = type
    this.isSimultor = type === 'simulator'
    this.isAbout = type === 'about'
    this.isProfile = type === 'profile'
    this.isKnowledge = type === 'knowledge'
    this.isDirectory = type === 'directory'
    this.isFeed = type === 'feed';
    this.isCommunity = type === 'community'
  }

logOut() {
  this.authService.clearLoggedInEmail();
  this.router.navigate(['/home-page']);
}

  toggleKnowledgeBase () {
    this.isKnowledgeBaseExpanded = !this.isKnowledgeBaseExpanded
  }

  stopKnowledge () {
    this.isKnowledgeBaseExpanded = false
  }

  shareOnSocialMedia(media: string) {
    // this.CickedsocialMedia = media;
    if (!this.isDialogOpen) {
      this.CickedsocialMedia = media;
      this.popup.openDialogWithTemplateRef(this.myDialog);
    }
  }


// ChatBot
toggleChatbot () {
  this.showChatbot = true
}

onClose () {
  alert()
  this.showChatbotIcon =  true;
  this.showChatbot = false;
}

onClear () {}

showBot () {
  this.showChatbot = true;
  this.showChatbotIcon = false;
}


}
