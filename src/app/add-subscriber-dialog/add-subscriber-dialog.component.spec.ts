import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriberDialogComponent } from './add-subscriber-dialog.component';

describe('AddSubscriberDialogComponent', () => {
  let component: AddSubscriberDialogComponent;
  let fixture: ComponentFixture<AddSubscriberDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubscriberDialogComponent]
    });
    fixture = TestBed.createComponent(AddSubscriberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
