import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-subscriber-dialog',
  templateUrl: './add-subscriber-dialog.component.html',
  styleUrls: ['./add-subscriber-dialog.component.scss'],
})
export class AddSubscriberDialogComponent implements OnInit {
  subscriberFg!: FormGroup;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  referralSources: any[] = [];
  otherSouce: any;
  constructor(
    public dialogRef: MatDialogRef<AddSubscriberDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.referralSources = this.data.referralSources;
    this.otherSouce = this.referralSources.find(
      (a) => a.name.toLowerCase() === 'other'
    );
    this.initilizeForm();
  }

  initilizeForm(): void {
    this.subscriberFg = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.emailPattern),
          Validators.maxLength(100),
        ],
      ],
      reason: ['', Validators.maxLength(400)],
      other: ['', Validators.maxLength(250)],
      referralSourceId: ['', Validators.required],
    });
  }

  save(): void {
    if (this.subscriberFg.valid) {
      this.close('save', this.subscriberFg.value);
    } else {
      this.subscriberFg.markAllAsTouched();
    }
  }

  get otherEnabled(): boolean {
    const value = this.subscriberFg.get('referralSourceId')?.value;
    if (value && this.otherSouce && value === this.otherSouce.id) {
      return true;
    }
    return false;
  }

  get fg() {
    return this.subscriberFg.controls;
  }

  close(action: string, data?: any): void {
    const obj = {
      action: action,
      data: data,
    };
    this.dialogRef.close(obj);
  }
}
