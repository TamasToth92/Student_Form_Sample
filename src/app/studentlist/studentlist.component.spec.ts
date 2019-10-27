import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

import { StudentlistComponent } from './studentlist.component';
import { StudentRowComponent } from './student-row/student-row.component';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { GenderPipe } from 'src/app/pipes/gender.pipe';

describe('StudentlistComponent', () => {
  let component: StudentlistComponent;
  let fixture: ComponentFixture<StudentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentlistComponent, StudentRowComponent, AgePipe, GenderPipe ],
      imports: [ FormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
    registerLocaleData(localeHu, 'hu');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
