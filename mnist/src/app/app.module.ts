import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MnistComponent } from './app.component';
import { MnistCanvasComponent } from './canvas/mnist-canvas.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [MnistComponent, MnistCanvasComponent],
  providers: [],
  bootstrap: [MnistComponent]
})
export class AppModule {}
