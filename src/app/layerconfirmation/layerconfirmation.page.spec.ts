import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LayerconfirmationPage } from './layerconfirmation.page';

describe('LayerconfirmationPage', () => {
  let component: LayerconfirmationPage;
  let fixture: ComponentFixture<LayerconfirmationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerconfirmationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LayerconfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
