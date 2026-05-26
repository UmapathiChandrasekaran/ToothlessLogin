import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  isLoading: boolean = false;
  isSuccessBlinking: boolean = false; // Triggers the stable 3-pulse sequence
  isSuccess: boolean = false;         // Triggers the final full screen blast wave
  isError: boolean = false;

  // Add these two properties under your existing boolean flags
  currentUsername: string = '';
  isRedEyed: boolean = false;

  isPasswordFocused = false;
  isUsernameFocused = false;

  eyeX = 0;
  eyeY = 0;
  private readonly EYE_LIMIT = 9;
  private readonly SENSITIVITY = 4.5;
  stars: any[] = [];
  clouds: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.generateStars(200);
    this.generateClouds(40);
  }

  onCardBlur(event: FocusEvent): void {
    const card = document.querySelector('.login-card');
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (card && !card.contains(relatedTarget)) {
      if (this.loginForm.valid && !this.isLoading) {
        this.onSubmit();
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isPasswordFocused) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (event.clientX - cx) / cx;
    const dy = (event.clientY - cy) / cy;

    this.eyeX = Math.max(-this.EYE_LIMIT, Math.min(this.EYE_LIMIT, dx * this.EYE_LIMIT * this.SENSITIVITY));
    this.eyeY = Math.max(-this.EYE_LIMIT, Math.min(this.EYE_LIMIT, dy * this.EYE_LIMIT * this.SENSITIVITY));
  }

onSubmit(): void {
    this.isPasswordFocused = false;
    this.isUsernameFocused = false;

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter both username and password.';
      this.triggerErrorShake();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.isRedEyed = false;
    this.isError = false;
    this.cdr.detectChanges(); 

    // Fake authentication timeline with cinematic sequence
    setTimeout(() => {
      const { username, password } = this.loginForm.value;

      // Simulated credentials (Change as desired)
      if (username === 'admin' && password === 'admin123') {
        this.isSuccessBlinking = true;
        this.isLoading = false;
        this.cdr.detectChanges();

        // Trigger fullscreen plasma explosion wave
        setTimeout(() => {
          this.isSuccessBlinking = false;
          this.isSuccess = true;
          this.cdr.detectChanges();

          // Route to dashboard/home after explosion completes
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 600);
        }, 1000);

      } else {
        // Failed Auth Flow
        this.isLoading = false;
        this.errorMessage = 'Invalid system authentication credentials.';
        this.triggerErrorShake();
      }
    }, 1500);
  }

  triggerErrorShake(): void {
    this.isError = true;
    this.isRedEyed = true; // Activates the custom red eye sequence
    this.cdr.detectChanges();
    
    setTimeout(() => {
      this.isError = false; // Ends card vibration shake
      this.cdr.detectChanges();
    }, 400);
  }

  generateClouds(count: number): void {
    this.clouds = [];
    const baseCount = Math.floor(count * 0.4);
    for (let i = 0; i <= baseCount; i++) {
      const left = (i / baseCount) * 120 - 10;
      this.clouds.push({
        left: left + '%',
        bottom: (Math.random() * 8 - 22) + 'vh',
        width: (Math.random() * 20 + 45) + 'vw',
        height: (Math.random() * 15 + 35) + 'vh',
        delay: '-' + (Math.random() * 25) + 's'
      });
    }
  }

  generateStars(count: number): void {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        top: (Math.random() * 100) + 'vh',
        left: (Math.random() * 100) + 'vw',
        size: (Math.random() * 2 + 1) + 'px',
        delay: (Math.random() * 4) + 's',
        duration: (Math.random() * 4 + 2) + 's'
      });
    }
  }

  onUsernameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.currentUsername = input.value; // Keeps speech bubble updated
    this.isRedEyed = false;             // Clears red eyes on type
    
    const len = input.value.length;
    this.eyeX = Math.max(-this.EYE_LIMIT, Math.min(this.EYE_LIMIT, (len * 0.8) - (this.EYE_LIMIT - 2)));
    this.eyeY = 5;
  }

  onUsernameFocus(): void {
    this.isUsernameFocused = true;
    this.isRedEyed = false; // Clears red eyes on focus
  }

  onUsernameBlur(): void {
    this.isUsernameFocused = false;
  }

  onPasswordFocus(): void {
    this.isPasswordFocused = true;
    this.isRedEyed = false; // Clears red eyes on focus
  }

  onPasswordBlur(): void {
    this.isPasswordFocused = false;
  }

}