import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelpagePage } from './cancelpage.page';

describe('CancelpagePage', () => {
  let component: CancelpagePage;
  let fixture: ComponentFixture<CancelpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
