import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryService } from '../common/summary.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  readonly currentMultiplicand= signal<number | null>(null);
  readonly score = signal<number | null>(null);
  total = signal<number | null>(null);

  constructor(private readonly summaryService: SummaryService) {
    if (this.summaryService.exercise) {
      this.currentMultiplicand.set(this.summaryService.exercise.multiplicand);
      this.total.set(SummaryService.TOTAL_SCORE);
      this.score.set(SummaryService.calculateScore(this.summaryService.exercise));
    }
  }
}
