import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {OrderRepository} from "../model/order.repository";
import {Order} from "../model/order.model";

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.component.html',
  styleUrls : ['checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderSent: boolean = false;
  submitted: boolean = false;

  constructor(public repository: OrderRepository,
              public order: Order,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  addOrder = this.formBuilder.group({
    name: ['', [Validators.required,
      Validators.minLength(2),
      Validators.pattern(new RegExp("^[A-Za-z]+$"))]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: [0, Validators.required],
    country: ['', Validators.required],
  });

  getFormAttribute = (controlName: string) => this.addOrder.get(`${controlName}`) as FormControl;

  isNameFilledIn = (): boolean => this.getFormAttribute("name").invalid && this.submitted;
  isAddressFilledIn = (): boolean => this.getFormAttribute("address").invalid && this.submitted;
  isCityFilledIn = (): boolean => this.getFormAttribute("city").invalid && this.submitted;
  isStateFilledIn = (): boolean => this.getFormAttribute("state").invalid && this.submitted;
  isZipFilledIn = (): boolean => this.getFormAttribute("zip").invalid && this.submitted;
  isCountryFilledIn = (): boolean => this.getFormAttribute("country").invalid && this.submitted;

  submitForm() {
    this.submitted = true;
    if (this.addOrder.valid) {
      this.repository.saveOrder(this.order).subscribe(order => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      });
    }
  }
}
