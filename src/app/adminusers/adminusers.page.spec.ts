import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminusersPage } from './adminusers.page';

describe('AdminusersPage', () => {
  let component: AdminusersPage;
  let fixture: ComponentFixture<AdminusersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminusersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminusersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
