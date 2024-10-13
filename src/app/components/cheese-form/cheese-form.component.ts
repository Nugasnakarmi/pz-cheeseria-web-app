import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CheeseService } from '../../services/cheese.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, of, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Cheese } from '../../interfaces/cheese.interface';

@Component({
  selector: 'cheese-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cheese-form.component.html',
  styleUrl: './cheese-form.component.scss',
})
export class CheeseFormComponent implements OnInit {
  cheeseService = inject(CheeseService);
  router = inject(Router);
  @Input() cheese: Cheese = {
    id: 0,
    name: '',
    imageUrl: '',
    pricePerKilo: 0,
    color: '',
  };
  @Input() mode: 'add' | 'update' = 'add';

  @Output() cheeseValue = new EventEmitter<Cheese>();
  cheeseForm: UntypedFormGroup = new UntypedFormGroup({});
  buttonLabel = 'Add Cheese';
  ngOnInit() {
    if (this.cheese) {
      this.cheeseForm = new FormGroup({
        name: new UntypedFormControl(this.cheese.name, [Validators.required]),
        imageUrl: new UntypedFormControl(this.cheese.imageUrl),
        pricePerKilo: new UntypedFormControl(this.cheese.pricePerKilo, [
          Validators.required,
        ]),
        color: new UntypedFormControl(this.cheese.color),
      });
    } else {
      this.cheeseForm = new FormGroup({
        name: new UntypedFormControl('', [Validators.required]),
        imageUrl: new UntypedFormControl(''),
        pricePerKilo: new UntypedFormControl(''),
        color: new UntypedFormControl(''),
      });
    }

    if (this.mode === 'update') {
      this.buttonLabel = 'Update Cheese';
    }
  }

  onAddClick(): void {
    this.cheeseValue.emit(this.cheeseForm.value);
  }
}
