import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeBarComponent } from './fridge-bar.component';

describe('FridgeBarComponent', () => {
  let component: FridgeBarComponent;
  let fixture: ComponentFixture<FridgeBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridgeBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
