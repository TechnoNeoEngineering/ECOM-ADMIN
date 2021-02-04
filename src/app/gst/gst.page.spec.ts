import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GstPage } from './gst.page';

describe('GstPage', () => {
  let component: GstPage;
  let fixture: ComponentFixture<GstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
