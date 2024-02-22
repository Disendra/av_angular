// app-btu-calculator.component.ts

import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
@Component({
  selector: 'app-btu-calculator',
  templateUrl: './btu-calculator.component.html',
  styleUrls: ['./btu-calculator.component.css']
})
export class BtuCalculatorComponent implements OnInit {
  total: number = 0 // Initialize total with 0
  thermalTotal: number = 0
  requiredCooling: any
  showRemoveIcon: boolean = false
  isBtu: boolean = false
  isCard: boolean = false
  qrdata: any
  urlLink: string = 'https://businnessCard:4300'
  userName: string = 'Disendra Gosu'
  mobileNumber: number = +91887837454
  designation: string = 'Software Developer'
  emailId: string = 'abc@gmail.com'
  linkCopied: boolean = false
  @Input() toolType: any
  @ViewChild('myDialog') myDialog!: TemplateRef<any>

  constructor (private dialog: MatDialog) {}

  rows = [
    { company: '', equipment: '', watt: 0 },
    { company: '', equipment: '', watt: 0 }
]

  getRowClass (index: number): string {
    return index % 2 === 0 ? 'even-row' : 'odd-row'
  }

  addRow () {
    this.rows.push({ company: '', equipment: '', watt: 0 })
    this.calculateTotalWatt() 
    this.showRemoveIcon = true
  }

  removeRow () {
    if (this.rows.length > 1) {
      this.rows.pop()
    } else {
      this.showRemoveIcon = false
    }
  }

  openDialogWithTemplateRef (templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.dialog.open(templateRef)
    } else {
      console.error('TemplateRef is undefined')
    }
  }

  shareOnSocialMedia () {
    this.openDialogWithTemplateRef(this.myDialog)
  }

  copyToClipboard () {
    const tempInput = document.createElement('input')
    tempInput.value = this.urlLink
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    this.linkCopied = true

    setTimeout(() => {
      this.linkCopied = false
    }, 3000)
  }

  refreshValues () {
    this.rows.forEach(row => {
      row.company = ''
      row.equipment = ''
      row.watt = 0
    })
    this.thermalTotal = 0
    this.total = 0
    this.requiredCooling = 0
  }

  calculateTotalWatt () {
    this.total = this.rows.reduce((sum, row) => sum + Number(row.watt), 0)
    this.thermalTotal = this.total * 3.4
    this.requiredCooling = this.thermalTotal / 12000
  }

  ngOnInit (): void {
    this.handleMessageChange()
    this.qrCodeData()
    this.calculateTotalWatt() 
  }

  handleMessageChange () {
    this.isBtu = this.toolType === 'btu'
    this.isCard = this.toolType === 'isCard'
  }

  qrCodeData () {
    this.qrdata =
      this.userName + '\n' + this.mobileNumber + '\n' + this.emailId + '\n' + this.designation}

  print () {
    window.print()
  }

  downloadCard (type: any) {
    let fileName = ''
    if (type === 'btuCalculator') {
      fileName = 'btu-Calculator.pdf'
    } else {
      fileName = 'Bussinees-Card'
    }

    const element = document.getElementById('pdfContent')

    if (element) {
      const options = {
        ignoreElements: (element: { id: string }) => element.id === 'icons'
      }

      html2canvas(element, options).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const imgWidth = 150
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const xPosition = (pageWidth - imgWidth) / 2
        const yPosition = (pageHeight - imgHeight) / 2
        pdf.addImage(imgData, 'PNG', xPosition, yPosition, imgWidth, imgHeight)
        pdf.save(fileName)
      })
    } else {
      console.error("Element with id 'pdfContent' not found.")
    }
  }
}
