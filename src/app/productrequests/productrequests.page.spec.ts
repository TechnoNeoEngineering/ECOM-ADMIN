import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductrequestsPage } from './productrequests.page';

describe('ProductrequestsPage', () => {
  let component: ProductrequestsPage;
  let fixture: ComponentFixture<ProductrequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductrequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductrequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
