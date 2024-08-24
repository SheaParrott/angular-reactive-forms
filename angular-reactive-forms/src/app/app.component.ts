import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userProfile } from './Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  userData: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    })
  })
  createdUserProfiles: userProfile[] = []

  constructor(
    private formBuilder: FormBuilder
  ) {}

  submitForm(): void {
    console.log('userData: ', this.userData.value)
    this.createdUserProfiles.push({
      firstName: this.userData.value.firstName,
      lastName: this.userData.value.lastName,
      street: this.userData.value.address.street,
      city: this.userData.value.address.city,
      state: this.userData.value.address.state,
      zipCode: this.userData.value.address.zipCode,
    })

    this.userData.reset()
  }

  isInvalid(formControlName: string): boolean {
    return !!this.userData.get(formControlName)?.invalid &&
      !!(this.userData.get(formControlName)?.dirty ||
        this.userData.get(formControlName)?.touched)
  }
}
