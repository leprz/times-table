import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-start',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent {
  multiplicands = Array.from({ length: 9 }, (_, i) => i + 1);
}
