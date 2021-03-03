import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReturnpagePage } from './returnpage.page';

describe('ReturnpagePage', () => {
  let component: ReturnpagePage;
  let fixture: ComponentFixture<ReturnpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
