import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StudentService } from '../../student.service';
import { Gender, Student } from '../../interfaces/student';
import { StudentDeleteModalComponent } from '../student-delete-modal/student-delete-modal.component';

@Component({
  selector: '[app-student-row]',
  templateUrl: './student-row.component.html',
  styleUrls: ['./student-row.component.scss']
})
export class StudentRowComponent implements OnInit {

  @Input()
  student: Student;
  @Output()
  refresh: EventEmitter<void>;
  @Output()
  refreshWithData: EventEmitter<Student[]>;
  cloneStudent: Student;
  editMode: boolean;
  genderEnum: object[];
  fieldErrors: string[];
  isSaving: boolean;

  constructor(private studentService: StudentService, private modalService: NgbModal) {
      this.student = { name, email: '', age: 0, gender: Gender.female };
      this.editMode = false;
      this.genderEnum = this.studentService.getGenderArray();
      this.refresh = new EventEmitter();
      this.refreshWithData = new EventEmitter();
      this.fieldErrors = [];
      this.isSaving = false;
  }

  ngOnInit() {
  }

  setEditMode(em: boolean) {
      this.editMode = em;
      if (em) {
          this.cloneStudent = JSON.parse(JSON.stringify( this.student ));
      }
  }

  saveStudent(): void {
      this.isSaving = true;
      this.studentService.modifyStudent(this.cloneStudent)
      .then(data => {
          this.setEditMode(false);
          this.refreshWithData.emit(data);
      })
      .catch(errorInfos => {
          if (errorInfos) {
              this.fieldErrors = errorInfos;
          } else {
              this.refresh.emit();
          }
      })
      .finally(() => {
          this.isSaving = false;
      });
  }

  deleteStudent(): void {
      const modalRef = this.modalService.open(StudentDeleteModalComponent);
      modalRef.componentInstance.name = this.student.name;
      modalRef.result.then(() => {
          this.studentService.removeStudent(this.student.id).then(data => {
              // this.refresh.emit();
              this.refreshWithData.emit((data as any).students);
          });
      }).catch(() => {});
  }

}
