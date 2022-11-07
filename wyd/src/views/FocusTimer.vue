<template>
  <navigation-bar></navigation-bar>
  <div>

    <div class="timer">
      <div class="button-group mode-buttons" id="js-mode-buttons" @click="handleMode()">
        <button
          data-mode="pomodoro"
          class="button active mode-button mx-2 px-4"
          id="js-pomodoro"
        >
          Focus
        </button>
        <button
          data-mode="shortBreak"
          class="button mode-button mx-2 px-4"
          id="js-short-break"
        >
          Break
        </button>
      </div>
      <div class="clock bg px-5 py-3" id="js-clock" style="border-radius:30px">
        <span id="js-minutes">25</span>
        <span class="separator">:</span>
        <span id="js-seconds">00</span>
      </div>
      <button class="main-button" data-action="start" id="js-btn" @click="mainButton()">
        Start
      </button>
    </div>
</div>

</template>

<script>
//IMPORTS
import navBar from '@/components/layouts/navbar.vue';

//EXPORTS
export default {
  name: 'FocusTimer',
  components: {
  "navigation-bar": navBar,
  },
  data() {
    
    const timer = {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      longBreakInterval: 4,
      sessions: 0,
    };

    let interval;

  },
  methods: {

    switchMode(mode) {
      timer.mode = mode;
      timer.remainingTime = {
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds: 0,
      };

      document
        .querySelectorAll('button[data-mode]')
        .forEach(e => e.classList.remove('active'));
      document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
      document.body.style.backgroundColor = `var(--${mode})`;
      document
        .getElementById('js-progress')
        .setAttribute('max', timer.remainingTime.total);

      updateClock();
      },

    startTimer() {
      let { total } = timer.remainingTime;
      const endTime = Date.parse(new Date()) + total * 1000;

      if (timer.mode === 'pomodoro') timer.sessions++;

      mainButton.dataset.action = 'stop';
      mainButton.textContent = 'stop';
      mainButton.classList.add('active');

      interval = setInterval(function() {
        timer.remainingTime = getRemainingTime(endTime);
        updateClock();

        total = timer.remainingTime.total;
        if (total <= 0) {
          clearInterval(interval);

          switch (timer.mode) {
            case 'pomodoro':
              if (timer.sessions % timer.longBreakInterval === 0) {
                switchMode('longBreak');
              } else {
                switchMode('shortBreak');
              }
              break;
            default:
              switchMode('pomodoro');
          }

          startTimer();
        }
      }, 1000);
      },

    mainButton() {
      const { action } = document.getElementById('js-btn').dataset;
      if (action === 'start') {
        startTimer();
      } else {
        stopTimer();
      }
    },

    getRemainingTime(endTime) {
      const currentTime = Date.parse(new Date());
      const difference = endTime - currentTime;

      const total = Number.parseInt(difference / 1000, 10);
      const minutes = Number.parseInt((total / 60) % 60, 10);
      const seconds = Number.parseInt(total % 60, 10);

      return {
        total,
        minutes,
        seconds,
      };
    },

  stopTimer() {
    clearInterval(interval);

    mainButton.dataset.action = 'start';
    mainButton.textContent = 'start';
    mainButton.classList.remove('active');
    },

  updateClock() {
    const { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');

    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    min.textContent = minutes;
    sec.textContent = seconds;

    const text =
      timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
    document.title = `${minutes}:${seconds} — ${text}`;

    const progress = document.getElementById('js-progress');
    progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
    },

  handleMode(event) {
    const { mode } = event.target.dataset;

    if (!mode) return;

    switchMode(mode);
    stopTimer();
    }

}}


// document.addEventListener('DOMContentLoaded', () => {
// switchMode('pomodoro');
// });
</script>

<style>

html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--pomodoro);
  transition: background-color 1s ease;
      user-select: none;
}

.timer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  text-align: center;
}

.clock {
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 15rem;
  line-height: 1;
  display: flex;
  align-items: center;
  color: #899DDF;
}

.mode-button {
  font-size: 16px;
  cursor: pointer;
  box-shadow: none;
  font-weight: bold;
  color: #F6F8FB;
  background-color:#7289DA;
  border: 1px solid transparent;
  margin: 0px;
  border-radius: 10px;
  padding: 4px 12px;
}

.mode-button.active {
  border-color: #7289DA;
  background: #EFF0FF;
  color: #7289DA
}

.main-button {
  cursor: pointer;
      /* box-shadow: rgb(235, 235, 235) 0px 6px 0px; */
      font-size: 22px;
  height: 55px;
  text-transform: uppercase;
  color: #899DDF;
  font-weight: bold;
  width: 200px;
  background-color: #EFF0FF;
  border-width: initial;
  border-style: none;
  margin: 20px 0px 0px;
  padding: 0px 12px;
  border-radius: 30px;
  transition: color 0.5s ease-in-out 0s;
  border: 1px solid #7289DA;
}

button:focus, button:active {
  outline: none;
}

.main-button.active {
  transform: translateY(6px);
  box-shadow: none;
  outline: none;
}

@media screen and (max-width: 550px) {
  .clock {
    font-size: 8rem;
  }
}

</style>
