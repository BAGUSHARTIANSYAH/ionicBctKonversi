import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BctPage } from './bct.page';

describe('BctPage', () => {
  let component: BctPage;
  let fixture: ComponentFixture<BctPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BctPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BctPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
