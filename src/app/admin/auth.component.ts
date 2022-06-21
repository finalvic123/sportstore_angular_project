import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../model/auth.service";

@Component({
  templateUrl: 'auth.component.html'
})
export class AuthComponent {
  public username: string;
  public password: string;
  public errorMessage: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
  }


  authenticateUser = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  })

  getFormAttribute = (controlName: string) => this.authenticateUser.get(`${controlName}`);

  authenticate() {
    if (this.authenticateUser.valid) {
      this.username = this.getFormAttribute('name').value;
      this.password = this.getFormAttribute('password').value;
      this.authService.authenticate(this.username, this.password)
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl("/admin/main/products");
          }
          this.errorMessage = "Authentication Failed";
        })
    } else {
      this.errorMessage = "Form Data Invalid";
    }
  }
}
