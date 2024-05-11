import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePostPageComponent } from './manage-post-page.component';

describe('ManagePostPageComponent', () => {
  let component: ManagePostPageComponent;
  let fixture: ComponentFixture<ManagePostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePostPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
