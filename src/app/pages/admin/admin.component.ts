import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {AlertType} from '../../enums/alert-type.enum';
import { Alert } from '../../classes/alert';
import {AdminService} from '../../services/admin.service';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public studentForm: FormGroup;
  public facultyForm: FormGroup;
  public departmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private adminService: AdminService,
    private loadingService: LoadingService
  ) { }

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
      registeredDate: new Date(),
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/college-chat-36c01.appspot.com/o/default_profile_pic.png?alt=media&token=8f4f7703-e69c-44d8-9bc5-54a9d6806e97'
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
      registeredDate: new Date(),
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/college-chat-36c01.appspot.com/o/default_profile_pic.png?alt=media&token=8f4f7703-e69c-44d8-9bc5-54a9d6806e97'
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
    if (this.facultyForm.valid) {
      this.loadingService.isLoading.next(true);
      this.adminService.registerUser(this.facultyForm.value).subscribe(isSuccess => {
        if (isSuccess) {
          this.facultyForm.reset();
          this.facultyForm.controls['role'].setValue('Faculty');
          this.alertService.alerts.next(new Alert('Faculty is registered Successfully', AlertType.Success));
        } else {
          this.alertService.alerts.next(new Alert('Failed to register a Faculty', AlertType.Danger));
        }
        this.loadingService.isLoading.next(false);
      });
    } else {
      this.alertService.alerts.next(new Alert('Please fill all the fields to register a Faculty', AlertType.Danger));
    }
  }

  registerStudent() {
    if (this.studentForm.valid) {
      this.loadingService.isLoading.next(true);
      this.adminService.registerUser(this.studentForm.value).subscribe(isSuccess => {
        if (isSuccess) {
          this.studentForm.reset();
          this.studentForm.controls['role'].setValue('Student');
          this.alertService.alerts.next(new Alert('Student is registered Successfully', AlertType.Success));
        } else {
          this.alertService.alerts.next(new Alert('Failed to register a student', AlertType.Danger));
        }
        this.loadingService.isLoading.next(false);
      });
    } else {
      this.alertService.alerts.next(new Alert('Please fill all the fields to register a student', AlertType.Danger));
    }
  }

  registerDepartment() {

  }

}
