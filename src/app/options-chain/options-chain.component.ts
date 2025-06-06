import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { StrategyBuilderService, OptionsChainRow } from '../services/strategy-builder.service';

@Component({
  selector: 'app-options-chain',
  templateUrl: './options-chain.component.html',
  styleUrls: ['./options-chain.component.css']
})
export class OptionsChainComponent {
  chain$!: Observable<OptionsChainRow[]>;
  form: FormGroup;
  displayedColumns = ['strike', 'callLtp', 'putLtp', 'oi', 'iv', 'greeks'];
  expiries = ['2024-01-01'];

  constructor(private fb: FormBuilder, private service: StrategyBuilderService) {
    this.form = this.fb.group({
      symbol: [''],
      expiry: [''],
      minStrike: [],
      maxStrike: []
    });
  }

  load(): void {
    const { symbol, expiry } = this.form.value;
    if (symbol && expiry) {
      this.chain$ = this.service.getOptionsChain(symbol, expiry);
    }
  }

  filtered(data: OptionsChainRow[]): OptionsChainRow[] {
    const min = this.form.get('minStrike')?.value;
    const max = this.form.get('maxStrike')?.value;
    return data.filter(d => (min ? d.strike >= min : true) && (max ? d.strike <= max : true));
  }
}
