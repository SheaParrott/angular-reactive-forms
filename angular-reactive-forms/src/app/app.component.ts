import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { userProfile } from './Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  userData: FormGroup = this.formBuilder.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    })
  })
  userProfiles$: any

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserProfiles()
  }

  loadUserProfiles(): void {
    this.userProfiles$ = this.userService.fetchUserProfiles()
  }

  submitForm(): void {
    this.userService.addOrEditUserProfile({
      id: this.userData.value.id,
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

  onEdit(user: userProfile): void {
    this.userData.setValue(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: {
          street: user.street,
          city: user.city,
          state: user.state,
          zipCode: user.zipCode
        }
      }
    )
  }

  deleteUserProfile(id: number): void {
    this.userService.deleteUserProfile(id)
    this.loadUserProfiles()
  }
}
