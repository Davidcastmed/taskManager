import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventServiceService, EventDetails } from '../event-service/event-service.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // npm run electron-build // this command to run electron app
  otherIsHiden = true;
  isHiden = true;
  isItemHiden = false;

  // -----------------
  breaksAmount = 0;

  // vars for shift begin
  hours = 0;
  gethours: any = '00';
  minutes = 0;
  mins: any = '00';
  seconds = 0;
  secs: any = '00';
  // vars for shift end

  // vars for Breaks begin
  hoursB = 0;
  gethoursB: any = '00';
  minutesB = 0;
  minsB: any = '00';
  secondsB = 0;
  secsB: any = '00';
  // vars for Breaks end
  otherNameEvent = 'OTHER';
  otherNameEventC = 'Rest room';

  clockController: any;
  breakTimeController: any;
  otherBreaks: any;
  shiftlogs: any[];
  currentEvent = [];
  eventName: string;

  shiftLabel = 'Shift Start';
  breakLabel = 'Break';
  lunchLabel = 'Lunch';
  isDisabled = true;
  bNisHidden = true;
  lunchIsDisabled = true;
  breakIsDisabled = true;
  otherIsDisabled = true;

  shiftStartAtToSend;
  shiftEndAtToSend;
  breakStartAtToSend;
  breakEndAtToSend;

  changBtnColor = false;
  btnBreakColor = false;
  btnLunchColor = false;
  BtnOtherColor = false;

  selectedProperty;

  munuOtherSelection;
  OtherBreakName;
  ramdomWord: string;
  currentDay;


  constructor(private router: Router, private eventService: EventServiceService) {

  }
  ngOnInit() {
    this.getShiftTheCurrentValues();
    this.getBreakTheCurrentValues();
    this.getLunchTheCurrentValues();
    this.getRestRoomTheCurrentValues();
    this.OtherBreakOptions('notSelected');
    this.ramdomGreetingsWords();
  }
  logOut() {
    if (this.shiftLabel === 'Shift End') {
      this.shiftStartEnd();
    }
    this.router.navigateByUrl('/');
  }
  getShiftTheCurrentValues() { // get the data after refreshing
    this.shiftStartAtToSend = JSON.parse(localStorage.getItem('shiftStartAtToSend'));
    const btnShiftStatus = JSON.parse(localStorage.getItem('btnShiftPlayPauseStatus'));
    if (btnShiftStatus === 'onPlay') { // make the button keep the play mode
      this.changeFromPauseToplay();
      this.toEnabledColor();
    }
    const shiftStatus = JSON.parse(localStorage.getItem('shiftStatus'));
    if (shiftStatus === 'onShift') {
      clearInterval(this.clockController);
      this.isDisabled = false;
      this.lunchIsDisabled = false;
      this.breakIsDisabled = false;
      this.shiftLabel = 'Shift End';
      this.changBtnColor = !this.changBtnColor; // make the button change color
      const gethours = JSON.parse(localStorage.getItem('gethours'));
      const mins = JSON.parse(localStorage.getItem('mins'));
      const secs = JSON.parse(localStorage.getItem('secs'));
      this.gethours = gethours;
      this.hours = +gethours;
      this.mins = mins;
      this.minutes = +mins;
      this.secs = +secs;
      this.seconds = secs;
      this.clockStart();
      this.currentEvent = JSON.parse(localStorage.getItem('shiftCurrentEvent'));
    }
  }
  getBreakTheCurrentValues() {
    this.breakStartAtToSend = JSON.parse(localStorage.getItem('breakStartAtToSend'));
    const btnbreakStatus = JSON.parse(localStorage.getItem('btnBreakPlayPauseStatus'));
    if (btnbreakStatus === 'onPlay') { // make the button keep the play mode
      this.changeFromPauseToplayB();
    }
    const breakStatus = JSON.parse(localStorage.getItem('breakStatus'));
    const isBreakAmount = JSON.parse(localStorage.getItem('breaksAmount'));
    if (isBreakAmount !== null) {
      this.breaksAmount = +isBreakAmount;
      this.bNisHidden = false;
    }
    if (breakStatus === 'onBreak') {
      const breaksAmount = JSON.parse(localStorage.getItem('breaksAmount'));
      this.breaksAmount = +breaksAmount;
      clearInterval(this.breakTimeController);
      this.isDisabled = false;
      this.lunchIsDisabled = true;
      this.breakIsDisabled = false;
      this.breakLabel = 'On Break';
      this.btnBreakColor = !this.btnBreakColor; // make the button change color
      const gethoursB = JSON.parse(localStorage.getItem('gethoursB'));
      const minsB = JSON.parse(localStorage.getItem('minsB'));
      const secsB = JSON.parse(localStorage.getItem('secsB'));
      console.log(this.breaksAmount, 'from here');
      this.gethoursB = gethoursB;
      this.hoursB = +gethoursB;
      this.minsB = minsB;
      this.minutesB = +minsB;
      this.secsB = +secsB;
      this.secondsB = secsB;
      this.clockForBreaks();
      this.currentEvent = JSON.parse(localStorage.getItem('shiftCurrentEvent'));
      console.log(this.hoursB, this.minutesB, this.secondsB);
      console.log('is on Break');
    }
  }
  getLunchTheCurrentValues() {
    this.breakStartAtToSend = JSON.parse(localStorage.getItem('breakStartAtToSend'));
    const btnLunchStatus = JSON.parse(localStorage.getItem('btnLunchPlayPauseStatus'));
    if (btnLunchStatus === 'onPlay') { // make the button keep the play mode
      this.changeFromPauseToplayL();
    }
    const breakStatus = JSON.parse(localStorage.getItem('breakStatus'));
    if (breakStatus === 'onLunch') {
      clearInterval(this.breakTimeController);
      this.isDisabled = false;
      this.lunchIsDisabled = false;
      this.breakIsDisabled = true;
      this.lunchLabel = 'On Lunch';
      this.btnLunchColor = !this.btnLunchColor; // make the button change color
      const gethoursB = JSON.parse(localStorage.getItem('gethoursB'));
      const minsB = JSON.parse(localStorage.getItem('minsB'));
      const secsB = JSON.parse(localStorage.getItem('secsB'));
      const breaksAmount = JSON.parse(localStorage.getItem('breaksAmount'));
      this.breaksAmount = +breaksAmount;
      this.gethoursB = gethoursB;
      this.hoursB = +gethoursB;
      this.minsB = minsB;
      this.minutesB = +minsB;
      this.secsB = +secsB;
      this.secondsB = secsB;
      this.clockForBreaks();
      this.currentEvent = JSON.parse(localStorage.getItem('shiftCurrentEvent'));
      console.log(this.hoursB, this.minutesB, this.secondsB);
      console.log('is on Lunch');
    }
  }
  shiftStartEnd() {
    // for information only
    //   const localTime = new Date().toLocaleTimeString(); // 1:42:38 PM
    //   const localTime2 = new Date().toLocaleDateString(); // 11/26/2018
    //  const localTime3 = new Date(); // Mon Nov 26 2018 13:41:28 GMT-0600 (Central Standard Time)
    //  const localTime4 = new Date().getTime(); // Mon Nov 26 2018 13:41:28 GMT-0600 (Central Standard Time)

    // -----------------------------------------------------------------------------------------
    localStorage.clear(); // clean the local storage,  , temporarily desabled
    localStorage.setItem('btnShiftPlayPauseStatus', JSON.stringify('onPlay'));
    this.currentEvent = [];
    this.changBtnColor = !this.changBtnColor; // make the button change color
    if (this.shiftLabel === 'Shift Start') {
      localStorage.setItem('gethours', JSON.stringify('00')); // to keep the counter when refreshing
      this.toEnabledColor();
      this.isDisabled = false;
      this.lunchIsDisabled = false;
      this.breakIsDisabled = false;
      this.otherIsDisabled = false;
      this.shiftLabel = 'Shift End';
      this.eventName = 'shiftStart';
      this.clockStart();
      this.shiftStartAtToSend = new Date().getTime();
      const objectEventShift: EventDetails = {
        UserID: '1',
        StateID: '1',
        DateInit: this.shiftStartAtToSend,
      };
      this.eventService.sendUserEvent(objectEventShift);
      localStorage.setItem('shiftStartAtToSend', JSON.stringify(new Date().getTime()));
      this.currentEvent.unshift('Shift started at ' + new Date().toLocaleTimeString());
      localStorage.setItem('shiftStatus', JSON.stringify('onShift')); // to keep the counter when refreshing
      localStorage.setItem('shiftCurrentEvent', JSON.stringify(this.currentEvent)); // to keep the counter when refreshing
    } else if (this.shiftLabel === 'Shift End') {
      this.toDesabledColor();
      this.shiftLabel = 'Shift Start';
      this.bNisHidden = true;
      this.breaksAmount = 0;
      if (this.breakLabel === 'On Break') {
        this.breakStartEndEvents();
        this.changeFromPauseToplayB();
      }
      if (this.lunchLabel === 'On Lunch') {
        this.lunchStartEndEvents();
        this.changeFromPauseToplayL();
      }
      if (this.otherNameEventC === 'On Rest room') {
        this.restRoomStartEndEvents();
        this.changeFromPauseToplayL();
      }
      this.isDisabled = true;
      this.lunchIsDisabled = true;
      this.breakIsDisabled = true;
      this.shiftEndAtToSend = new Date().getTime();
      this.shiftlogs = [this.gethours + ':' + this.mins + ':' + this.secs];
      // here goes the object BE would receive
      const objectEventShift: EventDetails = {
        UserID: '1',
        StateID: '5',
        DateInit: this.shiftStartAtToSend,
        DateEnd: this.shiftEndAtToSend,
        TimeSpent: this.shiftlogs.toString()
      };
      this.eventService.sendUserEvent(objectEventShift);
      localStorage.setItem('shiftStatus', JSON.stringify('shiftEnded'));
      console.log(JSON.stringify(objectEventShift), 'objectEventShift');
      this.clockEnd();
      localStorage.clear(); // crear local storage
      this.currentEvent.unshift('Shift ended at ' + new Date().toLocaleTimeString() + ' | Working Hours: ' + this.shiftlogs);
      localStorage.setItem('shiftCurrentEvent', JSON.stringify(this.currentEvent)); // to keep the counter when refreshing
      localStorage.setItem('btnShiftPlayPauseStatus', JSON.stringify('onPause'));
    }

  }
  clockEnd() {
    clearInterval(this.clockController);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.secs = '00';
    this.mins = '00';
    this.gethours = '00';
  }
  clockStart() {
    this.clockController = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes = this.minutes + 1;
      }
      this.mins = (this.minutes < 10) ? ('0' + this.minutes) : (this.minutes);
      localStorage.setItem('mins', JSON.stringify(this.mins)); // to keep the counter when refreshing
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours = this.hours + 1;
        this.gethours = (this.hours < 10) ?
          ('0' + this.hours) :
          (this.hours);
        localStorage.setItem('gethours', JSON.stringify(this.gethours)); // to keep the counter when refreshing
      }
      this.secs = (this.seconds < 10) ?
        ('0' + this.seconds) : (this.seconds);
      localStorage.setItem('secs', JSON.stringify(this.secs)); // to keep the counter when refreshing

    }, 1000);
  }
  breakStartEndEvents() {
    localStorage.setItem('btnBreakPlayPauseStatus', JSON.stringify('onPlay'));
    this.btnBreakColor = !this.btnBreakColor; // make the button change color
    if (this.breakLabel === 'Break') {
      this.clockForBreaksOnDestroy();
      localStorage.setItem('gethoursB', JSON.stringify('00')); // to keep the counter when refreshing
      this.breaksAmount++;
      localStorage.setItem('breaksAmount', JSON.stringify(this.breaksAmount)); // to keep the counter when refreshing
      this.bNisHidden = false;
      this.breakLabel = 'On Break';
      this.lunchIsDisabled = true;
      this.otherIsDisabled = true;
      this.clockForBreaks();
      this.breakStartAtToSend = new Date().getTime();
      localStorage.setItem('breakStartAtToSend', JSON.stringify(new Date().getTime()));
      this.currentEvent.unshift('Break' + ' started at ' + new Date().toLocaleTimeString());
      localStorage.setItem('shiftCurrentEvent', JSON.stringify(this.currentEvent)); // to keep the counter when refreshing
      localStorage.setItem('breakStatus', JSON.stringify('onBreak')); // to keep the counter when refreshing
      //  this.currentEvent.push(`Break  started at  ${new Date().toLocaleTimeString()}`); // Andere Weisse
      console.log(this.currentEvent);
    } else if (this.breakLabel === 'On Break') {
      this.breakLabel = 'Break';
      this.lunchIsDisabled = false;
      this.otherIsDisabled = false;
      this.breakEndAtToSend = new Date().getTime();
      this.shiftlogs = [this.gethoursB + ':' + this.minsB + ':' + this.secsB];
      // here goes the object backEnd would get
      const objectEventBreak: EventDetails = {
        UserID: '1',
        StateID: '2',
        DateInit: this.breakStartAtToSend,
        DateEnd: this.breakEndAtToSend,
        TimeSpent: this.shiftlogs.toString()
      };
      this.eventService.sendUserEvent(objectEventBreak);
      localStorage.setItem('breakStatus', JSON.stringify('breakEnded')); // to keep the counter when refreshing
      console.log(JSON.stringify(objectEventBreak), 'objectEventShift');
      // bis hier
      this.clockForBreaksOnDestroy();
      this.currentEvent.unshift('Break ended at ' + new Date().toLocaleTimeString() + ' | Time Spent: ' + this.shiftlogs);
      localStorage.setItem('shiftCurrentEvent', JSON.stringify(this.currentEvent)); // to keep the counter when refreshing
      localStorage.setItem('btnBreakPlayPauseStatus', JSON.stringify('onPause'));
      this.clockStart();
    }
  }
  lunchStartEndEvents() {
    localStorage.setItem('btnLunchPlayPauseStatus', JSON.stringify('onPlay'));
    this.btnLunchColor = !this.btnLunchColor; // make the button change color
    if (this.lunchLabel === 'Lunch') {
      this.clockForBreaksOnDestroy();
      localStorage.setItem('gethoursB', JSON.stringify('00')); // to keep the counter when refreshing
      this.lunchLabel = 'On Lunch';
      this.eventName = 'lunch';
      this.breakIsDisabled = true;
      this.otherIsDisabled = true;
      this.clockForBreaks();
      this.breakStartAtToSend = new Date().getTime();
      localStorage.setItem('breakStartAtToSend', JSON.stringify(new Date().getTime()));
      this.currentEvent.unshift('Lunch started at ' + new Date().toLocaleTimeString());
      localStorage.setItem('shiftCurrentEvent', JSON.stringify(this.currentEvent)); // to keep the counter when refreshing
      localStorage.setItem('breakStatus', JSON.stringify('onLunch')); // to keep the counter when refreshing
      console.log(this.currentEvent);
    } else if (this.lunchLabel === 'On Lunch') {
      this.lunchLabel = 'Lunch';
      this.breakIsDisabled = false;
      this.otherIsDisabled = false;
      this.breakEndAtToSend = new Date().getTime();
      this.shiftlogs = [this.gethoursB + ':' + this.minsB + ':' + this.secsB];
      const objectEventBreak: EventDetails = {
        UserID: '1',
        StateID: '3',
        DateInit: this.breakStartAtToSend,
        DateEnd: this.breakEndAtToSend,
        TimeSpent: this.shiftlogs.toString()
      };
      this.eventService.sendUserEvent(objectEventBreak);
      localStorage.setItem('breakStatus', JSON.stringify('lunchEnded')); // to keep the counter when refreshing
      console.log(JSON.stringify(objectEventBreak), 'objectEventShift');
      // bis hier
      this.clockForBreaksOnDestroy();
      this.currentEvent.unshift('Lunch ended at ' + new Date().toLocaleTimeString() + ' | Time Spent: ' + this.shiftlogs);
      localStorage.setItem('shiftCurrentEvent', JSON.stringify(this.currentEvent)); // to keep the counter when refreshing
      localStorage.setItem('btnLunchPlayPauseStatus', JSON.stringify('onPause'));

      this.clockStart();
    }
  }
  getRestRoomTheCurrentValues() {
    this.breakStartAtToSend = JSON.parse(localStorage.getItem('breakStartAtToSend'));
    const btnRestRoomStatus = JSON.parse(localStorage.getItem('btnRestRoomPlayPauseStatus'));
    if (btnRestRoomStatus === 'onPlay') { // make the button keep the play mode
      // this.changeFromPauseToplayrestR();
    }
    const breakStatus = JSON.parse(localStorage.getItem('breakStatus'));
    if (breakStatus === 'onrestRoom') {
      this.BtnOtherColor = !this.BtnOtherColor;
      clearInterval(this.breakTimeController);
      this.eventName = 'restroom';
      this.breakIsDisabled = true;
      this.lunchIsDisabled = true;
      this.otherNameEventC = 'On Rest room';
      const gethoursB = JSON.parse(localStorage.getItem('gethoursB'));
      const minsB = JSON.parse(localStorage.getItem('minsB'));
      const secsB = JSON.parse(localStorage.getItem('secsB'));
      this.gethoursB = gethoursB;
      this.hoursB = +gethoursB;
      this.minsB = minsB;
      this.minutesB = +minsB;
      this.secsB = +secsB;
      this.secondsB = secsB;
      this.clockForBreaks();
      this.currentEvent = JSON.parse(localStorage.getItem('shiftCurrentEvent'));
    }
  }
  restRoomStartEndEvents() {
    localStorage.setItem('btnRestRoomPlayPauseStatus', JSON.stringify('onPlay'));
    this.BtnOtherColor = !this.BtnOtherColor; // make the button change color
    if (this.otherNameEventC === 'Rest room') {
      this.changeFromPauseToplayrestR();
      this.clockForBreaksOnDestroy();
      localStorage.setItem('gethoursB', JSON.stringify('00')); // to keep the counter when refreshing
      this.otherNameEventC = 'On Rest room';
      this.eventName = 'restroom';
      this.breakIsDisabled = true;
      this.lunchIsDisabled = true;
      this.clockForBreaks();
      this.breakStartAtToSend = new Date().getTime();
      localStorage.setItem('breakStartAtToSend', JSON.stringify(new Date().getTime()));
      this.currentEvent.unshift('Rest room started at ' + new Date().toLocaleTimeString());
      localStorage.setItem('shiftCurrentEvent', JSON.stringify(this.currentEvent)); // to keep the counter when refreshing
      localStorage.setItem('breakStatus', JSON.stringify('onrestRoom')); // to keep the counter when refreshing
      console.log(this.currentEvent);
    } else if (this.otherNameEventC === 'On Rest room') {
      this.changeFromPauseToplayrestR();
      this.otherNameEventC = 'Rest room';
      this.OtherBreakName = 'notSelected';
      this.breakIsDisabled = false;
      this.lunchIsDisabled = false;
      this.breakEndAtToSend = new Date().getTime();
      this.shiftlogs = [this.gethoursB + ':' + this.minsB + ':' + this.secsB];
      const objectEventBreak: EventDetails = {
        UserID: '1',
        StateID: '4',
        DateInit: this.breakStartAtToSend,
        DateEnd: this.breakEndAtToSend,
        TimeSpent: this.shiftlogs.toString()
      };
      this.eventService.sendUserEvent(objectEventBreak);
      localStorage.setItem('breakStatus', JSON.stringify('restREnded')); // to keep the counter when refreshing
      console.log(JSON.stringify(objectEventBreak), 'objectEventShift');
      // bis hier
      this.clockForBreaksOnDestroy();
      this.currentEvent.unshift('Rest room ended at ' + new Date().toLocaleTimeString() + ' | Time Spent: ' + this.shiftlogs);
      localStorage.setItem('shiftCurrentEvent', JSON.stringify(this.currentEvent)); // to keep the counter when refreshing
      localStorage.setItem('btnRestRoomPlayPauseStatus', JSON.stringify('onPause'));
      this.clockStart();
    }
  }
  clockForBreaks() {
    clearInterval(this.clockController);
    this.breakTimeController = setInterval(() => {
      this.secondsB++;
      if (this.secondsB === 60) {
        this.secondsB = 0;
        this.minutesB = this.minutesB + 1;
      }
      this.minsB = (this.minutesB < 10) ? ('0' + this.minutesB) : (this.minutesB);
      localStorage.setItem('minsB', JSON.stringify(this.minsB)); // to keep the counter when refreshing
      if (this.minutesB === 60) {
        this.minutesB = 0;
        this.gethoursB = 0;
        this.hoursB = this.hoursB + 1;
        this.gethoursB = (this.hoursB < 10) ?
          ('0' + this.hoursB) :
          (this.hoursB);
        localStorage.setItem('gethoursB', JSON.stringify(this.gethoursB)); // to keep the counter when refreshing

      }
      this.secsB = (this.secondsB < 10) ?
        ('0' + this.secondsB) : (this.secondsB);
      localStorage.setItem('secsB', JSON.stringify(this.secsB)); // to keep the counter when refreshing
    }, 1000);
  }
  clockForBreaksOnDestroy() {
    clearInterval(this.breakTimeController);
    this.secondsB = 0;
    this.minutesB = 0;
    this.hoursB = 0;
    this.secsB = '00';
    this.minsB = '00';
    this.gethoursB = '00';
  }
  OtherBreakOptions(OtherBreakName) {
    this.OtherBreakName = OtherBreakName;
    this.munuOtherSelection = [
      {
        name: '-options-', value: 'options'
      },
      { name: 'Rest room', value: 'restroom' },
      { name: '---', value: '---' }];

    if (OtherBreakName === 'notSelected') {
      console.log('nothing selected');
    } else if (OtherBreakName === 'Rest room') {
      this.restRoomStartEndEvents();
      console.log(OtherBreakName, 'this');
    }
  }
  endOtherBreaksEvent() {
    if (this.OtherBreakName === 'notSelected') {
    } else if (this.OtherBreakName === 'Rest room') {
      this.otherNameEventC = 'On Rest room';
      this.restRoomStartEndEvents();
    }
  }
  endfromBtnOpt() {
    console.log('from enfromBtnOpt()');
    if (this.otherNameEventC === 'On Rest room') {
      this.restRoomStartEndEvents();
    }
  }
  ramdomGreetingsWords() {
    const day = (new Date()).getDay();
    const greetingsWords = [
      'Happy',
      'Have a Nice',
      'Enjoy your',
      'Thank god, it is',
      'You made it, is',
      'Awesome, it is',
      'Have a great'];

    const daysName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    this.ramdomWord = greetingsWords[Math.floor(Math.random() * greetingsWords.length)];
    this.currentDay = daysName[day - 1];
  }
  menuHideandShow() {
    this.isHiden = false;
  }
  hideTheMenu() {
    this.isHiden = true;
  }
  onLostFocus() {
    this.isHiden = true;
  }
  hideTheMenuOther(value) {
    this.otherNameEvent = value;
    this.otherIsHiden = true;
  }
  toEnabledColor() {
    const elem = document.getElementById('circle-dis-B');
    elem.classList.toggle('circle');
    const elem2 = document.getElementById('circle-dis-L');
    elem2.classList.toggle('circle');
    const elem3 = document.getElementById('circle-dis-O');
    elem3.classList.toggle('circle');
  }
  toDesabledColor() {
    const elem = document.getElementById('circle-dis-B');
    elem.classList.toggle('circle');
    const elem2 = document.getElementById('circle-dis-L');
    elem2.classList.toggle('circle');
    const elem3 = document.getElementById('circle-dis-O');
    elem3.classList.toggle('circle');
  }
  changeFromPauseToplay() {
    const elem = document.getElementById('triangle-right-smll');
    elem.classList.toggle('square-smll');
  }
  changeFromPauseToplayB() {
    const elem = document.getElementById('square');
    elem.classList.toggle('square');
  }
  changeFromPauseToplayL() {
    const elem = document.getElementById('square-L');
    elem.classList.toggle('square');
  }
  changeFromPauseToplayrestR() {
    if (this.otherIsDisabled === true || this.OtherBreakName === 'notSelected') {
    } else {
      const elem = document.getElementById('square-O');
      elem.classList.toggle('square');
    }
  }

}
