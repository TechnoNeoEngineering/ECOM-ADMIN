import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewproductPage } from './viewproduct.page';

describe('ViewproductPage', () => {
  let component: ViewproductPage;
  let fixture: ComponentFixture<ViewproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewproductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
