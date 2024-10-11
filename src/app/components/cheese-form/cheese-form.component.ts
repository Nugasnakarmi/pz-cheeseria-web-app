import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-cheese-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cheese-form.component.html',
  styleUrl: './cheese-form.component.scss',
})
export class CheeseFormComponent implements OnInit {
  cheeseForm: UntypedFormGroup = new UntypedFormGroup({});
  ngOnInit() {
    this.cheeseForm = new FormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      imageUrl: new UntypedFormControl(''),
      pricePerKilo: new UntypedFormControl('', [Validators.required]),
      color: new UntypedFormControl('', [Validators.required]),
    });
  }
}
