import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductrecoveryPage } from './productrecovery.page';

describe('ProductrecoveryPage', () => {
  let component: ProductrecoveryPage;
  let fixture: ComponentFixture<ProductrecoveryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductrecoveryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductrecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
