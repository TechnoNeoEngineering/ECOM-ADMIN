import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecialuserPage } from './specialuser.page';

describe('SpecialuserPage', () => {
  let component: SpecialuserPage;
  let fixture: ComponentFixture<SpecialuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
