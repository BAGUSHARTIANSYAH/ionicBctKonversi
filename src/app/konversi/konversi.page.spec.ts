import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KonversiPage } from './konversi.page';

describe('KonversiPage', () => {
  let component: KonversiPage;
  let fixture: ComponentFixture<KonversiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonversiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KonversiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
