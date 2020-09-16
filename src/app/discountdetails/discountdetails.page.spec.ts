import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiscountdetailsPage } from './discountdetails.page';

describe('DiscountdetailsPage', () => {
  let component: DiscountdetailsPage;
  let fixture: ComponentFixture<DiscountdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
