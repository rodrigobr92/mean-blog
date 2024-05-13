import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.inputStyle = 'filled';
    this.authService.autoAuthUser();
  }
}
