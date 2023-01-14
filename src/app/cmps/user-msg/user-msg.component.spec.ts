import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMsgComponent } from './user-msg.component';

describe('UserMsgComponent', () => {
  let component: UserMsgComponent;
  let fixture: ComponentFixture<UserMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
