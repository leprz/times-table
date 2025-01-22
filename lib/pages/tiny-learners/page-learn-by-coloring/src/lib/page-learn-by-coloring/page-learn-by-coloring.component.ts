import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-page-learn-by-coloring',
  imports: [CommonModule],
  templateUrl: './page-learn-by-coloring.component.html',
  styleUrl: './page-learn-by-coloring.component.css',
})
export class PageLearnByColoringComponent implements AfterViewInit {
  private readonly canvasElement =
    viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly canvas = computed(() => this.canvasElement()?.nativeElement);
  private readonly ctx = computed(() => this.canvas()?.getContext('2d'));

  private readonly isPainting = signal(false);
  private readonly brushColor = signal('#f00');

  onColorChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.brushColor.set(target.value);
    }
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  draw() {
    const ctx = this.ctx();
    const canvas = this.canvas();
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '300px LXGW WenKai TC';
    ctx.fillStyle = '#ccc';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('12', canvas.width / 2, canvas.height / 2);
  }

  startPainting(event: MouseEvent) {
    this.isPainting.set(true);
    this.paint(event);
  }

  stopPainting() {
    this.isPainting.set(false);
    this.ctx()?.beginPath(); // Prevents brush trails
  }

  paint(event: MouseEvent) {
    if (!this.isPainting()) return;

    const ctx = this.ctx();
    const canvas = this.canvas();
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.fillStyle = this.brushColor();
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  resetCanvas() {
    this.draw();
  }

  protected readonly alert = alert;
}
