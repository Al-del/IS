import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LeaderboardUser {
  initials: string;
  name: string;
  city: string;
  pts: number;
  pct: number;
  color: string;
}

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  menuOpen = false;
  heroActive = false;
  /** Ring tick marks (15 ticks × 24° = 360°) */
  ticks: number[] = Array.from({ length: 15 });

  leaderboard: LeaderboardUser[] = [
    { initials: 'MR', name: 'Mia Rosen',    city: 'Berlin',    pts: 12840, pct: 100, color: 'linear-gradient(135deg,#A0D585,#EEFABD)' },
    { initials: 'JK', name: 'Jonas Keller', city: 'Amsterdam', pts: 11200, pct: 87,  color: 'linear-gradient(135deg,#EEFABD,#6984A9)' },
    { initials: 'SL', name: 'Sofia Lima',   city: 'Lisbon',    pts: 9750,  pct: 76,  color: 'linear-gradient(135deg,#6984A9,#A0D585)' },
    { initials: 'AT', name: 'Aiko Tanaka',  city: 'Tokyo',     pts: 8930,  pct: 70,  color: 'linear-gradient(135deg,#263B6A,#6984A9)' },
    { initials: 'CN', name: 'Carlos Neves', city: 'Porto',     pts: 7680,  pct: 60,  color: 'linear-gradient(135deg,#A0D585,#263B6A)' },
  ];

  ngOnInit(): void {
    this._initScrollAnimations();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const nav = document.querySelector('.nav-links') as HTMLElement;
    if (nav) nav.classList.toggle('open', this.menuOpen);
  }

  private _initScrollAnimations(): void {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    // Observe after a tick so the DOM is ready
    setTimeout(() => {
      document.querySelectorAll(
        '.feat-card, .ai-left, .ai-right, .lb-item, .hero-left, .hero-right'
      ).forEach(el => observer.observe(el));
    }, 100);
  }
  onHeroClick(): void {
    this.heroActive = !this.heroActive;        // ✅ correct
    console.log('Hero active?', this.heroActive); // ✅ correct
  }
}
