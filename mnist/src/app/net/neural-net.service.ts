import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { NeuralNet as NeuralNetInterface } from './neural-net.interface'

const NeuralNet = require('neural-net/neuralNet');

@Injectable()
export class NeuralNetService {
  net: NeuralNetInterface;

  initialise(config) {
    this.net = new NeuralNet();
    this.net.initialise(config);
  }

  predict(data: Array<any>) {
    return this.net.predict(data);
  }
}