import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MnistMaterialModule } from './material.module';

import { MnistComponent } from './app.component';
import { MnistCanvasComponent } from './canvas/mnist-canvas.component';
import { NeuralNetService } from './net/neural-net.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MnistMaterialModule
  ],
  declarations: [MnistComponent, MnistCanvasComponent],
  providers: [NeuralNetService],
  bootstrap: [MnistComponent]
})
export class AppModule { }
