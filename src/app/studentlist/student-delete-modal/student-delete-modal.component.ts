import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-delete-modal',
  templateUrl: './student-delete-modal.component.html',
  styleUrls: ['./student-delete-modal.component.scss']
})
export class StudentDeleteModalComponent implements OnInit {

  @Input()
  name: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
