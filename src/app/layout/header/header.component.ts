import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userEmail: string = '';
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userEmail = payload.name || payload.email || payload.sub || 'User';
      } catch (err) {
        console.error('Invalid token format');
        this.userEmail = 'User';
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

  onToggle() {
    this.toggleSidenav.emit();
  }
}


