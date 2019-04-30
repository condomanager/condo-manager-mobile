export default class Colors {

  static milisInADay = 86400000;

  _daylightSavingTimeMilisDiference = (earliestDate, latestDate) => ((latestDate.getTimezoneOffset() - earliestDate.getTimezoneOffset()) * 60 * 1000);

  static today = () => {
    let today = new Date();
    today.setHours(0,0,0,0);
    return today;
  };

  static yesterday = () => {
    let yesterday = getDayBefore(today());
    return yesterday;
  };

  static tomorrow = () => {
    let tomorrow = getDayAfter(today());
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
    return today().getTime() === referenceDate.getTime();
  };

  static isTomorrow = (date) => {
    let referenceDate = new Date(date.getTime());
    referenceDate.setHours(0,0,0,0);
    return tomorrow().getTime() === referenceDate.getTime();
  };

  static getDateString = (date) => {
    if(!date)
      return 'Sem data definida';

    let dateString;

    if(isToday(date))
      dateString = 'Hoje';
    else if(isTomorrow(date))
      dateString = 'Amanhã';
    else
      dateString = date.toLocaleString('pt-br', {weekday: 'long'});

    dateString += ', ' + date.toLocaleString('pt-br', {day: 'numeric', month: 'long'});
    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
  };

  static getPlainDateString = (date, weekday = false) => {
    if(!date)
      return 'Sem data definida';
    let options = weekday ? {weekday: 'long'} : {};
    options = {...options, day: 'numeric', month: 'long', year: 'numeric'}

    let dateString = date.toLocaleString('pt-br', options);
    return dateString;
  };

  static getFormattedString = (date, format = 'date') => {
    if(!date)
      return;

    const dateOptions = {day: '2-digit', month: '2-digit', year: 'numeric'};
    const timeOptions = {hour: '2-digit', minute: '2-digit'};

    if(format === 'date')
      return date.toLocaleString('pt-br', dateOptions);
    if(format === 'time')
      return date.toLocaleString('pt-br', timeOptions);
    if(format === 'datetime')
      return date.toLocaleString('pt-br', {...dateOptions, ...timeOptions});
  };

  static getPeriodString = (startDate, endDate) => {
    if(!startDate || !endDate)
      return 'Sem período definido';

    let dateString = 'Semana de ' + startDate.toLocaleString('pt-br', {day: 'numeric'}) + ' até ' + endDate.toLocaleString('pt-br', {day: 'numeric', month: 'long'});

    return dateString;
  };

  static getTimeString = (date) => {
    if(!date)
      return 'Sem horário definido';

    return date.toLocaleString('pt-br', {hour: '2-digit', minute: '2-digit'});
  };

  static getDayOfTheYear = (date) => {
    let day = new Date(date.getTime());
    day.setHours(0, 0, 0, 0);
    const januaryFirst = new Date(date.getUTCFullYear(), 0, 1);
    const daylightSavingTimeDiference = _daylightSavingTimeMilisDiference(januaryFirst, day);  
    let daysSinceJanuaryFirst = Math.trunc((day.getTime() - daylightSavingTimeDiference - januaryFirst.getTime()) / milisInADay);
    return daysSinceJanuaryFirst + 1;
  };

  static getWeekOfTheYear = (date) => {
    let dayOfTheYear = getDayOfTheYear(date);
    const januaryFirst = new Date(date.getUTCFullYear(), 0, 1);
    const lackingDaysOnFirstWeek = januaryFirst.getUTCDay();
    let weeksSinceJanuaryFirst = Math.ceil((dayOfTheYear + lackingDaysOnFirstWeek) / 7);
    return weeksSinceJanuaryFirst;
  };

  static isSameWeek = (date1, date2) => {
    return date1.getUTCFullYear() === date2.getUTCFullYear() && getWeekOfTheYear(date1) === getWeekOfTheYear(date2);
  };

  static isThisWeek = (date) => {
    return isSameWeek(new Date(), date);
  };

  static isLastWeek = (date) => {
    const aWeekBehind = getDayBefore(date, 7);
    return isSameWeek(aWeekBehind, date);
  };

  static isNextWeek = (date) => {
    const aWeekAhead = getDayAfter(date, 7);
    return isSameWeek(aWeekAhead, date);
  };

  static getDaysOnWeek = (date) => {
    let days = [new Date(date.getTime())];

    let previousDay = getDayBefore(date);
    while(previousDay.getUTCDay() < date.getUTCDay()) {
      days.push(previousDay);
      previousDay = getDayBefore(previousDay)
    }

    let nextDay = getDayAfter(date);
    while(nextDay.getUTCDay() > date.getUTCDay()) {
      days.push(nextDay);
      nextDay = getDayAfter(nextDay);
    }

    return days.sort((a, b) => a.getTime() - b.getTime());
  };

  static getFirstDayOnWeek = (date) => {  
    let daysOnWeek = getDaysOnWeek(date);
    return daysOnWeek[0];
  };

  static getLastDayOnWeek = (date) => {
    let daysOnWeek = getDaysOnWeek(date);
    return daysOnWeek[daysOnWeek.length - 1];
  };
};