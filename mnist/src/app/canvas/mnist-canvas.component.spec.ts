import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnistCanvasComponent } from './mnist-canvas.component';

describe('MnistCanvasComponent', () => {
  let component: MnistCanvasComponent;
  let fixture: ComponentFixture<MnistCanvasComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MnistCanvasComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MnistCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
