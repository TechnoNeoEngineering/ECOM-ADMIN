import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockdetailsPage } from './stockdetails.page';

describe('StockdetailsPage', () => {
  let component: StockdetailsPage;
  let fixture: ComponentFixture<StockdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
