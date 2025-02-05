class TimerModel {
    constructor() {
      this.totalSeconds = 0;
      this.remainingSeconds = 0;
      this.intervalId = null;
    }
  
    setTime(seconds) {
      this.totalSeconds = seconds;
      this.remainingSeconds = seconds;
    }


    start(onTick, onFinish) {
      this.stop();
  
      this.intervalId = setInterval(() => {
        if (this.remainingSeconds > 0) {
          this.remainingSeconds--;
          onTick(this.remainingSeconds);
        } else {
          this.stop();
          onFinish();
        }
      }, 1000);
    }
  
    stop() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  }
  

  class TimerView {
    constructor() {
      this.appContainer = document.createElement('div');
      this.appContainer.id = 'app-container';
      
      this.title = document.createElement('div');
      this.title.id = 'timer-title';
      this.title.textContent = 'Таймер для яиц';
  
      this.display = document.createElement('div');
      this.display.id = 'timer-display';
      this.display.textContent = '00:00';
  
      this.appContainer.appendChild(this.title);
      this.appContainer.appendChild(this.display);
      document.body.insertBefore(this.appContainer, document.body.firstChild);
    }
  
    renderTime(seconds) {
      const min = String(Math.floor(seconds / 60)).padStart(2, '0');
      const sec = String(seconds % 60).padStart(2, '0');
      this.display.textContent = `${min}:${sec}`;
    }
  
    showFinished() {
      this.display.textContent = 'Готово!';
    }
  }
  

  class TimerController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.softBtn = document.getElementById('soft-btn');
      this.mediumBtn = document.getElementById('medium-btn');
      this.hardBtn = document.getElementById('hard-btn');
      this.stopBtn = document.getElementById('stop-btn');
  
      this.softBtn.addEventListener('click', () => this.startTimer(3));
      this.mediumBtn.addEventListener('click', () => this.startTimer(5));
      this.hardBtn.addEventListener('click', () => this.startTimer(7));
      this.stopBtn.addEventListener('click', () => this.stopTimer());
    }
  
    startTimer(minutes) {
      const seconds = minutes * 60;
      this.model.setTime(seconds);
  
      this.model.start(
        (remaining) => {
          this.view.renderTime(remaining);
        },
        () => {
          this.view.showFinished();
        }
      );
  
      this.view.renderTime(seconds);
    }
  
    stopTimer() {
      this.model.stop();
      this.view.renderTime(0);
    }
  }



  const model = new TimerModel();
  const view = new TimerView();
  const controller = new TimerController(model, view);