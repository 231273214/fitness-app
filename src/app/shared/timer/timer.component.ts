import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnChanges {
  @Input() duration: number = 60; // duración en segundos
  @Input() autoStart: boolean = false; // Nueva propiedad
  @Output() done = new EventEmitter<void>();

  remainingTime: number = this.duration;
  timerId: any;
  isRunning = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['duration']) {
      this.remainingTime = this.duration;
    }
    
    if (changes['autoStart'] && this.autoStart && !this.isRunning) {
      this.start();
    }
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.timerId = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        this.stop();
        this.done.emit();
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