import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LowerstocksPage } from './lowerstocks.page';

describe('LowerstocksPage', () => {
  let component: LowerstocksPage;
  let fixture: ComponentFixture<LowerstocksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowerstocksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LowerstocksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
