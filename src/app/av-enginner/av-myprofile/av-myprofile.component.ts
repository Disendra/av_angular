import { Component, ElementRef, ViewChild } from '@angular/core'
import { Country, State, City } from 'country-state-city'

@Component({
  selector: 'app-av-myprofile',
  templateUrl: './av-myprofile.component.html',
  styleUrls: ['./av-myprofile.component.css']
})
export class AvMyprofileComponent {
  countries = Country.getAllCountries()
  states: any
  cities: any
  selectedCountry: any
  selectedState: any
  selectedCity: any
  @ViewChild('country') country!: ElementRef
  @ViewChild('city') city!: ElementRef
  @ViewChild('state') state!: ElementRef

  empType = [
    { value: 'default', label: 'Select Employment Type', disabled: true },
    { value: 'fTime', label: 'Full time' },
    { value: 'pTime', label: 'Part time' },
    { value: 'selfEmp', label: 'Self Employed' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'trainee', label: 'Internship & Traineee' }
  ]

  numbers: number[] = Array.from({ length: 40 }, (_, index) => index + 1)

  // Country, State, City change events
  onCountryChange ($event: any): void {
    this.states = State.getStatesOfCountry(
      JSON.parse(this.country.nativeElement.value).isoCode
    )
    this.selectedCountry = JSON.parse(this.country.nativeElement.value)
    this.cities = this.selectedState = this.selectedCity = null
  }

  onStateChange ($event: any): void {
    this.cities = City.getCitiesOfState(
      JSON.parse(this.country.nativeElement.value).isoCode,
      JSON.parse(this.state.nativeElement.value).isoCode
    )
    this.selectedState = JSON.parse(this.state.nativeElement.value)
    this.selectedCity = null
  }

  onCityChange ($event: any): void {
    this.selectedCity = JSON.parse(this.city.nativeElement.value)
  }

  // Clear function
  clear (type: string): void {
    switch (type) {
      case 'country':
        this.selectedCountry =
          this.country.nativeElement.value =
          this.states =
          this.cities =
          this.selectedState =
          this.selectedCity =
            null
        break
      case 'state':
        this.selectedState =
          this.state.nativeElement.value =
          this.cities =
          this.selectedCity =
            null
        break
      case 'city':
        this.selectedCity = this.city.nativeElement.value = null
        break
    }
  }
}
