import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FileUploadService } from '../../../core/services/file-upload.service';
import { MediaService } from '../../../core/services/media.service'
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-editor-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-editor-dialog.component.html',
  styleUrls: ['./user-editor-dialog.component.css']
})
export class UserEditorDialogComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  @ViewChild('fileControl') fileControl: ElementRef;
  isUploading: boolean = false;
  imgUrl: Observable<SafeUrl>;
  uploadError: string;

  constructor(
    private dialogRef: MatDialogRef<UserEditorDialogComponent>,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private uploadService: FileUploadService,
    public mediaService: MediaService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.user = data;
    if (this.user.avatarUrl) {
      this.imgUrl = this.mediaService.getImageUrl(this.user.id, this.user.avatarUrl, 'profile');
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  save() {
    this.user.firstName = this.userForm.controls['firstName'].value;
    this.user.lastName = this.userForm.controls['lastName'].value;
    this.dialogRef.close(this.user);
  }

  cancel() {
    this.dialogRef.close();
  }

  selectFile(): void {
    this.fileControl.nativeElement.click();
  }

  onFileSelected(): void {
    this.isUploading = true;
    this.uploadError = null;
    const files: FileList = this.fileControl.nativeElement.files;
    if (files.length > 0) {
      const file = files[0];
      this.uploadService.upload(file, this.user.id).pipe(take(1)).subscribe(response => {
        this.user.avatarUrl = response.file;
        this.imgUrl = this.mediaService.getImageUrl(this.user.id, this.user.avatarUrl, 'profile');
        this.isUploading = false;
        this.changeDetectorRef.detectChanges();
      }, error => {
        this.isUploading = false;
        this.uploadError = this.formatError(error);
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  private buildForm(): void {
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]]
    });
  }

  private formatError(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error.error) return error.error.toString();
    if (error) return error.toString();
  }

}
