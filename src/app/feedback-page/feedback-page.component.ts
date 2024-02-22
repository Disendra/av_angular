import {
  Component,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  OnInit
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  @ViewChild('firstDialog') firstDialog!: TemplateRef<any>

  constructor (private dialog: MatDialog) {}

  ngOnInit (): void {
    setTimeout(() => {
      // this.openDialogWithTemplateRef(this.firstDialog)
    }, 300)
  }

  openDialogWithTemplateRef (templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.dialog.open(templateRef)
    } else {
      console.error('TemplateRef is undefined')
    }
  }
}
