import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeToolbarComponent } from './home-toolbar.component';

describe('HomeToolbarComponent', () => {
  let component: HomeToolbarComponent;
  let fixture: ComponentFixture<HomeToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
