import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StrategyBuilderService, StrategyLeg, OptionChainEntry } from '../services/strategy-builder.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-strategy-builder',
  templateUrl: './strategy-builder.component.html',
  styleUrls: ['./strategy-builder.component.css']
})
export class StrategyBuilderComponent {
  optionChain$!: Observable<OptionChainEntry[]>;
  form: FormGroup;

  get legs(): FormArray {
    return this.form.get('legs') as FormArray;
  }

  constructor(private fb: FormBuilder, private service: StrategyBuilderService) {
    this.form = this.fb.group({
      symbol: ['', Validators.required],
      legs: this.fb.array([])
    });
  }

  loadChain(): void {
    const symbol = this.form.get('symbol')?.value;
    if (symbol) {
      this.optionChain$ = this.service.getOptionChain(symbol);
    }
  }

  addLeg(): void {
    this.legs.push(
      this.fb.group({
        action: ['BUY', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        strike: [0, Validators.required],
        optionType: ['CE', Validators.required]
      })
    );
  }

  submit(): void {
    if (this.form.valid) {
      const legs = this.legs.value as StrategyLeg[];
      this.service.placeStrategy(legs).subscribe();
    }
  }
}
