export default class Dates {

  static milisInADay = 86400000;

  static daylightSavingTimeMilisDiference = (earliestDate, latestDate) => ((latestDate.getTimezoneOffset() - earliestDate.getTimezoneOffset()) * 60 * 1000);

  static today = () => {
    let today = new Date();
    today.setHours(0,0,0,0);
    return today;
  };

  static yesterday = () => {
    let yesterday = this.getDayBefore(this.today());
    return yesterday;
  };

  static tomorrow = () => {
    let tomorrow = this.getDayAfter(this.today());
    return tomorrow;
  };

  static getDayBefore = (date, days = 1) => {
    let dayBefore = new Date(date.getTime());
    dayBefore.setHours(-24 * days);
    return dayBefore;
  };

  static getDayAfter = (date, days = 1) => {
    let dayAfter = new Date(date.getTime());
    dayAfter.setHours(24 * days);
    return dayAfter;
  };

  static isToday = (date) => {
    let referenceDate = new Date(date.getTime());
    referenceDate.setHours(0,0,0,0);
    return this.today().getTime() === referenceDate.getTime();
  };

  static isTomorrow = (date) => {
    let referenceDate = new Date(date.getTime());
    referenceDate.setHours(0,0,0,0);
    return this.tomorrow().getTime() === referenceDate.getTime();
  };

  static isYesterday = (date) => {
    let referenceDate = new Date(date.getTime());
    referenceDate.setHours(0,0,0,0);
    return this.yesterday().getTime() === referenceDate.getTime();
  };

  static getDateString = (date) => {
    if(!date)
      return 'Sem data definida';

    let dateString;

    if(this.isToday(date))
      dateString = 'Hoje';
    else if(this.isTomorrow(date))
      dateString = 'Amanhã';
    else if(this.isYesterday(date))
      dateString = 'Ontem';
    else if(this.isBetweenPeriod(date, this.getDayBefore(this.today(), 7), this.today()))
      dateString = date.toLocaleString('pt-BR', {weekday: 'long'});
    else
      dateString = date.toLocaleString('pt-BR', {day: 'numeric', month: 'long'});

    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
  };

  static getPlainDateString = (date, weekday = false) => {
    if(!date)
      return 'Sem data definida';
    let options = weekday ? {weekday: 'long'} : {};
    options = {...options, day: 'numeric', month: 'long', year: 'numeric'}

    let dateString = date.toLocaleString('pt-BR', options);
    return dateString;
  };

  static getFormattedString = (date, format = 'datetime') => {
    if(!date)
      return;

    const dateOptions = {day: '2-digit', month: '2-digit', year: 'numeric'};
    const timeOptions = {hour: '2-digit', minute: '2-digit'};

    if(format === 'date')
      return date.toLocaleString('pt-BR', dateOptions);
    if(format === 'time')
      return date.toLocaleString('pt-BR', timeOptions);
    if(format === 'datetime')
      return date.toLocaleString('pt-BR', {...dateOptions, ...timeOptions});
  };

  static getPeriodString = (startDate, endDate) => {
    if(!startDate || !endDate)
      return 'Sem período definido';

    const periodString = 'Semana de ' + startDate.toLocaleString('pt-BR', {day: 'numeric'}) + ' até ' + endDate.toLocaleString('pt-BR', {day: 'numeric', month: 'long'});
    return periodString;
  };

  static getTimeString = (date) => {
    if(!date)
      return 'Sem horário definido';

    const timeString = date.toLocaleString('pt-BR', {hour: '2-digit', minute: '2-digit'});
    return timeString;
  };

  static getDayOfTheYear = (date) => {
    let day = new Date(date.getTime());
    day.setHours(0, 0, 0, 0);
    const januaryFirst = new Date(date.getUTCFullYear(), 0, 1);
    const daylightSavingTimeDiference = this.daylightSavingTimeMilisDiference(januaryFirst, day);
    let daysSinceJanuaryFirst = Math.trunc((day.getTime() - daylightSavingTimeDiference - januaryFirst.getTime()) / this.milisInADay);
    return daysSinceJanuaryFirst + 1;
  };

  static getWeekOfTheYear = (date) => {
    let dayOfTheYear = this.getDayOfTheYear(date);
    const januaryFirst = new Date(date.getUTCFullYear(), 0, 1);
    const lackingDaysOnFirstWeek = januaryFirst.getUTCDay();
    let weeksSinceJanuaryFirst = Math.ceil((dayOfTheYear + lackingDaysOnFirstWeek) / 7);
    return weeksSinceJanuaryFirst;
  };

  static isSameWeek = (date1, date2) => {
    return date1.getUTCFullYear() === date2.getUTCFullYear() && this.getWeekOfTheYear(date1) === this.getWeekOfTheYear(date2);
  };

  static isThisWeek = (date) => {
    return this.isSameWeek(new Date(), date);
  };

  static isLastWeek = (date) => {
    const aWeekBehind = getDayBefore(date, 7);
    return this.isSameWeek(aWeekBehind, date);
  };

  static isNextWeek = (date) => {
    const aWeekAhead = this.getDayAfter(date, 7);
    return this.isSameWeek(aWeekAhead, date);
  };

  static getDaysOnWeek = (date) => {
    let days = [new Date(date.getTime())];

    let previousDay = getDayBefore(date);
    while(previousDay.getUTCDay() < date.getUTCDay()) {
      days.push(previousDay);
      previousDay = getDayBefore(previousDay)
    }

    let nextDay = this.getDayAfter(date);
    while(nextDay.getUTCDay() > date.getUTCDay()) {
      days.push(nextDay);
      nextDay = this.getDayAfter(nextDay);
    }

    return days.sort((a, b) => a.getTime() - b.getTime());
  };

  static getFirstDayOnWeek = (date) => {
    let daysOnWeek = this.getDaysOnWeek(date);
    return daysOnWeek[0];
  };

  static getLastDayOnWeek = (date) => {
    let daysOnWeek = this.getDaysOnWeek(date);
    return daysOnWeek[daysOnWeek.length - 1];
  };

  static isBetweenPeriod = (date, startDate, endDate) => {
    if(!date || !startDate || !endDate)
      return false;

    return startDate.getTime() <= date.getTime() && endDate.getTime() >= date.getTime();
  }; 
};