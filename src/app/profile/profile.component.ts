import { Component, OnInit } from '@angular/core';
import { DhanApiService, UserProfile } from '../services/dhan-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile?: UserProfile;

  constructor(private dhanService: DhanApiService) {}

  ngOnInit(): void {
    this.dhanService.getUserProfile().subscribe(profile => this.profile = profile);
  }
}
