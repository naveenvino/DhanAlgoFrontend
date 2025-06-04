import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DhanApiService, UserProfile } from '../services/dhan-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile?: UserProfile;
  errorMessage = '';

  constructor(private dhanService: DhanApiService) {}

  ngOnInit(): void {
    this.dhanService.getUserProfile().subscribe({
      next: profile => this.profile = profile,
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    });
  }
}
