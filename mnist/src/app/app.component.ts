import { Component, ViewChild, OnInit } from '@angular/core';

import { MnistCanvasComponent } from './canvas/mnist-canvas.component';
import { NeuralNetService } from './net/neural-net.service';

import { graphics } from './utils/graphics.util'
import { imageData as data } from './utils/image-data.util';
import { mnistSnapshot } from './snapshots/mnist-snapshot';
import { NeuralNet } from './net/neural-net.interface';

@Component({
  selector: 'mnist-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class MnistComponent implements OnInit {
  predictedDigit: number;
  @ViewChild(MnistCanvasComponent) private _canvas: MnistCanvasComponent;

  constructor(private _nn: NeuralNetService) { }

  ngOnInit() {
    console.log(mnistSnapshot)
    this._nn.initialise({ snapshot: mnistSnapshot });
  }

  clearCanvas() {
    this._canvas.clear();
    this.predictedDigit = null
  }

  recognizeDigit() {
    let grayscaleImg = graphics.grayscale(this._canvas.getImageData());
    let digit = data.toMNIST(grayscaleImg);
    this._nn.predict(digit);

    let output = this._hack(this._nn.net);
    output.reduce((acc, value, index) => {
      if (acc < value) {
        this.predictedDigit = index;
        return value;
      } else return acc;
    }, 0);
  }

  _hack(net: NeuralNet): Array<number> {
    // apply softmax
    let layer3 = net.layers[2];
    let sum = layer3.nodes.reduce((acc, neuron) => {
      return acc + Math.pow(Math.E, neuron.weightedInput);
    }, 0);
    return layer3.nodes.map(neuron => neuron.output = Math.pow(Math.E, neuron.weightedInput) / sum);
  }
}
