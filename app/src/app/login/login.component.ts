import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string;
  password: string;
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {
  }
  submit(){
    this.authService.validateUser(this.userName, this.password).subscribe((result: any) => {
      if(result.error) {
        alert(result.message);
      } else {
        debugger;
        this.cookieService.set('bearer', 'cookieValue');
        this.router.navigate(['/landing']);
      }
    })
  }
}
