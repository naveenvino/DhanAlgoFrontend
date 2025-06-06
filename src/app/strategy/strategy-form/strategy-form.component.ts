import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-strategy-form',
  templateUrl: './strategy-form.component.html',
  styleUrls: ['./strategy-form.component.css']
})
export class StrategyFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      legs: this.fb.array([])
    });
    this.addLeg();
  }

  get legs(): FormArray {
    return this.form.get('legs') as FormArray;
  }

  addLeg(): void {
    this.legs.push(
      this.fb.group({
        type: ['Call', Validators.required],
        side: ['BUY', Validators.required],
        strike: [0, Validators.required],
        expiry: ['', Validators.required],
        qty: [1, Validators.required]
      })
    );
  }

  removeLeg(index: number): void {
    this.legs.removeAt(index);
  }

  get summary() {
    const legs = this.legs.value as any[];
    const margin = legs.reduce((sum, l) => sum + Math.abs(l.qty) * 100, 0);
    return {
      margin,
      maxProfit: 'N/A',
      maxLoss: 'N/A'
    };
  }

  submit(): void {
    if (this.form.valid) {
      const legs = this.legs.value;
      this.http
        .post(`${environment.apiUrl}/strategy/execute`, { legs })
        .subscribe();
    }
  }
}
