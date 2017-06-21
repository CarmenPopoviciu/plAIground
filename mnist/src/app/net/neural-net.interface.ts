export interface NeuralNet {
  layers: Array<any>;
  initialise: Function;
  train: Function;
  predict: Function;
}