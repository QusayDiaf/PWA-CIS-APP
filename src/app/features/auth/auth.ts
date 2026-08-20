import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/services';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
  });

  get usernameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.errorMessage.set('');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response: any) => {
        this.isLoading.set(false);
        console.log('تم تسجيل الدخول بنجاح:', response);
        this.router.navigate(['/dashboard']);

        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        // this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(this.getErrorMessage(err));
      }
    });
  }

  private getErrorMessage(err: any): string {
    if (!err) return 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى';
    if (err.status === 0) return 'تعذر الاتصال بالخادم، تحقق من اتصالك بالإنترنت';
    if (err.status === 401) return 'اسم المستخدم أو كلمة المرور غير صحيحة';
    if (err.status === 403) return 'ليس لديك صلاحية للدخول';
    if (err.status >= 500) return 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً';
    return err.error?.detail ?? err.error?.message ?? 'حدث خطأ غير متوقع';
  }
}