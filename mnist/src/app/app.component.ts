import { Component, ViewChild, OnInit } from '@angular/core';

import { MnistCanvasComponent } from './canvas/mnist-canvas.component';
import { NeuralNetService } from './net/neural-net.service';

import { graphics } from './utils/graphics.util'
import { imageData as data } from './utils/image-data.util';
import { mnistSnapshot } from './snapshots/mnist-snapshot';

@Component({
  selector: 'mnist-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class MnistComponent implements OnInit {
  @ViewChild(MnistCanvasComponent) private _canvas: MnistCanvasComponent;

  constructor(private _nn: NeuralNetService) { }

  ngOnInit() {
    this._nn.initialise({ snapshot: mnistSnapshot });
  }

  clearCanvas() {
    this._canvas.clear();
  }

  recognizeDigit() {
    let grayscaleImg = graphics.grayscale(this._canvas.getImageData());
    let digit = data.toMNIST(grayscaleImg);
    let predicted = this._nn.predict(digit);
    console.log(predicted)
  }
}
