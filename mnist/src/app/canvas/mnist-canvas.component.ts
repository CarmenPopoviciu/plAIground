import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  NgZone,
  Renderer
} from '@angular/core';

import { MousePosition } from './mouse-position.interface';

@Component({
  selector: 'mnist-canvas',
  template: `
    <canvas #canvas id="{{id}}" width="28" height="28"
            (mousedown)="beginPaint($event)"
            (mouseup)="finishPaint($event)">
    </canvas>
  `,
  styleUrls: ['./mnist-canvas.component.scss']
})
export class MnistCanvasComponent implements OnInit {
  @Input() id: string;
  @ViewChild('canvas') canvasRef: ElementRef;

  ctx: CanvasRenderingContext2D;
  private _painting = false;
  private _prevMousePos: MousePosition;

  constructor(private _ngZone: NgZone, private _renderer: Renderer) { }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    /** 
     * register the mousemove listener outside ngZone so change detection is
     * not performed at every mouse move and therefore hurt perf
     */

    this._ngZone.runOutsideAngular(() => {
      this._renderer.listen(
        this.canvasRef.nativeElement,
        'mousemove',
        this.paint.bind(this) // why oh why :(
      );
    });
  }

  beginPaint(ev: MouseEvent): void {
    this._prevMousePos = this._getMousePosition(
      this.canvasRef.nativeElement,
      ev
    );
    this._painting = true;
  }

  paint(ev: MouseEvent): void {
    if (this._painting) {
      let mousePos = this._getMousePosition(this.canvasRef.nativeElement, ev);
      this._draw(this.ctx, mousePos, this._prevMousePos);
      this._prevMousePos = mousePos;
    }
  }

  finishPaint(ev: MouseEvent): void {
    this._painting = false;
  }

  clear(): void {
    this.ctx.clearRect(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );
  }

  getImageData() {
    return this.ctx.getImageData(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );
  }

  _getMousePosition(canvas: HTMLCanvasElement, evt: MouseEvent): MousePosition {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  _draw(
    ctx: CanvasRenderingContext2D,
    mousePos: MousePosition,
    prevMousePos: MousePosition
  ): void {
    ctx.beginPath();
    ctx.moveTo(prevMousePos.x, prevMousePos.y);
    ctx.lineWidth = 1;
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.closePath();
    ctx.stroke();
  }
}
