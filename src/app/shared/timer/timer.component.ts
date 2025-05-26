import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  @Input() duration: number = 60; // duración en segundos (por defecto 1 min)
  @Output() done = new EventEmitter<void>();

  remainingTime: number = this.duration;
  timerId: any;
  isRunning = false;

  ngOnInit() {
    this.remainingTime = this.duration;
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.timerId = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        this.stop();
        this.done.emit(); // Emitir evento cuando termina
      }
    }, 1000);
  }

  pause() {
    clearInterval(this.timerId);
    this.isRunning = false;
  }

  reset() {
    this.pause();
    this.remainingTime = this.duration;
  }

  stop() {
    clearInterval(this.timerId);
    this.remainingTime = 0;
    this.isRunning = false;
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
}
