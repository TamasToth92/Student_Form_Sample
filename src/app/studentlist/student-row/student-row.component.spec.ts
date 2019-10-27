import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StudentRowComponent } from './student-row.component';
import { Gender } from 'src/app/interfaces/student';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { GenderPipe } from 'src/app/pipes/gender.pipe';

describe('StudentRowComponent', () => {
  let component: StudentRowComponent;
  let fixture: ComponentFixture<StudentRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRowComponent, AgePipe, GenderPipe],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized in not editable mode', () => {
    expect(component.editMode).toBe(false);
  });

  it('should go into edit mode', () => {
    component.setEditMode(true);
    expect(component.editMode).toBe(true);
  });

  it('should clone student', () => {
    component.student = {
      name: 'Teszt Józsi',
      age: 12,
      email: 'teszt@jozsi.hu',
      gender: Gender.male
    };
    component.setEditMode(true);
    expect(component.cloneStudent.name).toBe('Teszt Józsi');
    expect(component.cloneStudent.age).toBe(12);
    expect(component.cloneStudent.email).toBe('teszt@jozsi.hu');
    expect(component.cloneStudent.gender).toBe(Gender.male);
  });

  it('should deep clone student', () => {
    component.student = {
      name: 'Teszt Józsi',
      age: 12,
      email: 'teszt@jozsi.hu',
      gender: Gender.male
    };
    component.setEditMode(true);
    component.cloneStudent.name = 'fdsfsd';
    component.cloneStudent.email = 'asdadsa';
    component.cloneStudent.age = 123;
    component.cloneStudent.gender = Gender.female;

    expect(component.student.name).toBe('Teszt Józsi');
    expect(component.student.age).toBe(12);
    expect(component.student.email).toBe('teszt@jozsi.hu');
    expect(component.student.gender).toBe(Gender.male);
  });
});
