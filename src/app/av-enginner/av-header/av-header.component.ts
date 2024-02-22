import { Component, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'

@Component({
  selector: 'app-av-header',
  templateUrl: './av-header.component.html',
  styleUrls: ['./av-header.component.css']
})
export class AvHeaderComponent {
  @ViewChild('myDialog') myDialog!: TemplateRef<any>
  panelOpenState = false
  isKnowledgeBaseExpanded: boolean = false
  isSimultor: boolean = false
  isAbout: boolean = true
  isProfile: boolean = false;
  isFeed : boolean = false;
  isCommunity : boolean = false;
  isDirectory: boolean = false;
  isKnowledge: boolean = false;
  userName : string = 'Disendra';
  activeMenuItem: any;
  showChatbot : boolean = false;
  showChatbotIcon : boolean = true;

  constructor(private router: Router,private dialog: MatDialog) { }


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
  this.router.navigate(['/home-page']);
}

  toggleKnowledgeBase () {
    this.isKnowledgeBaseExpanded = !this.isKnowledgeBaseExpanded
  }

  stopKnowledge () {
    this.isKnowledgeBaseExpanded = false
  }

  // constructor (private dialog: MatDialog) {}

  openDialogWithTemplateRef (templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.dialog.open(templateRef)
    } else {
      console.error('TemplateRef is undefined')
    }
  }

  shareOnSocialMedia (links: any) {
    this.openDialogWithTemplateRef(this.myDialog)
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
