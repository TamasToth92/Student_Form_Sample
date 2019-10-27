import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Gender, Student } from '../interfaces/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  student: Student;
  isNameInvalid: boolean;
  errors: any;
  genderEnum: any[];

  constructor(private studentService: StudentService, private router: Router) {
      this.student = {
          name: '',
          email: '',
          age: null,
          gender: Gender.female
      };
      this.isNameInvalid = false;
      this.errors = {};
      this.genderEnum = this.studentService.getGenderArray();
  }

  ngOnInit() {
  }

  add(): void {
      this.checkName();
      this.checkEmail();
      if ( ! this.isNameInvalid && ! this.errors.email && ! this.isAgeInvalid() ) {
          this.studentService.addStudent(this.student).then(() => {
              this.router.navigate(['/students']);
          });
      }
  }

  isAgeInvalid(): boolean {
      return this.student.age !== null && ! /^\d*$/.test(this.student.age.toString());
  }

  checkName(): void {
      this.isNameInvalid = (this.student.name === '');
  }

  checkEmail(): void {
      this.errors.emailEmpty = (this.student.email === '');
      const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      this.errors.emailInvalid = ! this.errors.emailEmpty && ! re.test(this.student.email);
      this.errors.email = this.errors.emailEmpty || this.errors.emailInvalid;
  }

}
