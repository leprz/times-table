import {
  Component,
  computed,
  ElementRef,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Canvas, FabricText, PencilBrush } from 'fabric';

@Component({
  selector: 'ui-text-painting',
  imports: [CommonModule],
  templateUrl: './ui-text-painting.component.html',
  styleUrl: './ui-text-painting.component.css',
})
export class UiTextPaintingComponent {
  readonly text = signal('');
  private readonly canvasElement =
    viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly ctx = computed(() =>
    this.canvasElement()?.nativeElement?.getContext('2d'),
  );
  private readonly fc = computed(
    () =>
      new Canvas(this.canvasElement()?.nativeElement, {
        isDrawingMode: true,
      }),
  );
  readonly drawingFinished = output<void>();

  print(text: string) {
    this.text.set(text);
    const fc = this.fc();
    if (!fc) return;

    fc.clear();

    const fabricText = new FabricText(this.text(), {
      left: 50,
      top: 100,
      fill: 'blue',
      fontFamily: 'Patrick Hand', // Specify your font family
      fontSize: 500,
    });
    fc.add(fabricText);
    fc.centerObject(fabricText);

    fc.clipPath = fabricText;

    fc.freeDrawingBrush = new PencilBrush(fc);
    fc.freeDrawingBrush.color = 'red';
    fc.freeDrawingBrush.width = 40;
    const handler = () => {
      const percentage = this.calculateRedPixelsPercentage();
      if (percentage < 5) {
        this.drawingFinished.emit();
        fc.off('after:render', handler);
      }
    };
    fc.on('after:render', handler);
  }

  resetCanvas() {
    this.print(this.text());
  }

  private calculateRedPixelsPercentage(): number {
    const canvas = this.fc();
    const ctx = this.ctx();
    if (!canvas || !ctx) return 0;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let blueCount = 0; // Total blue pixels
    let validPixels = 0; // Total pixels that are not white or transparent

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]; // Red value
      const g = data[i + 1]; // Green value
      const b = data[i + 2]; // Blue value
      const a = data[i + 3]; // Alpha value

      // Skip white pixels (R: 255, G: 255, B: 255) and transparent pixels (A: 0)
      if (r === 255 && g === 255 && b === 255) {
        continue; // Skip white pixels
      }
      if (a === 0) {
        continue; // Skip transparent pixels
      }

      validPixels++;

      // Check if the pixel is predominantly blue (with some tolerance for color variation)
      if (b > r && b > g) {
        blueCount++;
      }
    }

    return (blueCount / validPixels) * 100;
  }
}
