import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public studentForm: FormGroup;
  public facultyForm: FormGroup;
  public departmentForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createStudentForm();
    this.createFacultyForm();
    this.createDepartmentForm();
  }

  createStudentForm() {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.minLength(10)]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.minLength(6)]],
      role: [{value: 'Student', disabled: true}, [Validators.required]],
      studentId: ['', [Validators.required]],
      department: ['', [Validators.required]],
      section: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      registeredDate: new Date()
    });
  }

  createFacultyForm() {
    this.facultyForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.minLength(10)]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.minLength(6)]],
      role: [{value: 'Faculty', disabled: true}, [Validators.required]],
      facultyId: ['', [Validators.required]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      registeredDate: new Date()
    });
  }

  createDepartmentForm() {
    this.departmentForm = this.fb.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
      sections: ['', [Validators.required, Validators.minLength(3)]],
      departmentHeadId: ['', [Validators.required]],
      departmentHeadName: ['', [Validators.required]],
      departmentEmail: ['', [Validators.email]],
      departmentPhone: ['', [Validators.minLength(10)]],
      startDate: ['', [Validators.required]],
      registeredDate: new Date()
    });
  }


  registerFaculty() {

  }

  registerStudent() {

  }

  registerDepartment() {

  }

}
