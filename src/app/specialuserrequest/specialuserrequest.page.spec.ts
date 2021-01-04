import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecialuserrequestPage } from './specialuserrequest.page';

describe('SpecialuserrequestPage', () => {
  let component: SpecialuserrequestPage;
  let fixture: ComponentFixture<SpecialuserrequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialuserrequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialuserrequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
