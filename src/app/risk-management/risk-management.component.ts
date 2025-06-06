import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * RiskManagementComponent allows configuration of margin and risk settings.
 */
@Component({
  selector: 'app-risk-management',
  templateUrl: './risk-management.component.html'
})
export class RiskManagementComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      maxRisk: [5, [Validators.required, Validators.min(0)]],
      margin: [100000, [Validators.required, Validators.min(0)]]
    });
  }

  save(): void {
    if (this.form.valid) {
      console.log('Risk settings saved', this.form.value);
    }
  }
}
