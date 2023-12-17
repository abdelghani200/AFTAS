import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent{

  @Input() formGroup!: FormGroup;
  @Input() operation: 'add' | 'update' = 'add';
  @Output() submitForm = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

}
