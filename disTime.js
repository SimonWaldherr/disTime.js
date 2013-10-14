/* * * * * * * * * *
 *   disTime .js   *
 *  Version 0.7.5  *
 *  License:  MIT  *
 * Simon  Waldherr *
 * * * * * * * * * */

/*jslint browser: true, indent: 2 */
/*globals languages, checkForAnd */
/*exported disTime */

var disTimeRepeater, disTimeObject, disTime;
disTimeObject = {
  parseTimestamp: function (language, thisTime, systemTime, detailed) {
    "use strict";
    var insert, distime, years, month, weeks, days, hours, minute, second;

    function pInt(string) {
      return parseInt(string, 10);
    }

    if (detailed === undefined) {
      detailed = false;
    }

    distime = (systemTime > thisTime) ? systemTime - thisTime : thisTime - systemTime;
    if (systemTime > thisTime) {
      insert = ' ' + language.words.preAgo + ' ';
    } else {
      insert = ' ' + language.words.inFuture + ' ';
    }

    if (distime > 31536000) {
      //years
      years = pInt(pInt(distime) / pInt(31536000));
      insert += years + ' ' + languages.declOfNum(language.mode, years, language.year);
    }

    if (((distime < 60 * 60 * 24 * 365) && (distime > 60 * 60 * 24 * 7 * 4)) || ((distime > 60 * 60 * 24 * 365) && detailed && (pInt(distime % 31536000 / 2419200) !== 0))) {
      //months
      insert += checkForAnd(detailed, insert, language);
      month = pInt(distime % 31536000 / 2419200);
      insert += month + ' ' + languages.declOfNum(language.mode, month, language.month);

      if (((distime < 60 * 60 * 24 * 365) && detailed && (pInt(distime % 2419200 / 86400) !== 0))) {
        //days
        insert += checkForAnd(detailed, insert, language);
        days = pInt(distime % 2419200 / 86400);
        insert += days + ' ' + languages.declOfNum(language.mode, days, language.day);
      }
    }

    if (((distime < 60 * 60 * 24 * 7 * 4) && (distime > 60 * 60 * 24 * 7)) || ((distime < 10368000) && (distime > 2419199) && detailed && (pInt(distime % 2592000 / 2419200) !== 0))) {
      //weeks
      insert += checkForAnd(detailed, insert, language);

      weeks = pInt(distime % 2419200 / 604800);
      insert += weeks + ' ' + languages.declOfNum(language.mode, weeks, language.week);
    }

    if (((distime < 60 * 60 * 24 * 7) && (distime > 86399)) || ((distime < 2419200) && (distime > 604799) && detailed && (pInt(distime % 604800 / 86400) !== 0))) {
      //days
      insert += checkForAnd(detailed, insert, language);

      days = pInt(distime % 2419200 / 86400);
      insert += days + ' ' + languages.declOfNum(language.mode, days, language.day);
    }

    if (((distime < 86400) && (distime > 3599)) || ((distime < 604800) && (distime > 86399) && detailed && (pInt(distime % 86400 / 3600) !== 0))) {
      //hours
      insert += checkForAnd(detailed, insert, language);

      hours = pInt(distime % 86400 / 3600);
      insert += hours + ' ' + languages.declOfNum(language.mode, hours, language.hour);
    }

    if (((distime < 3600) && (distime > 59)) || ((distime < 86400) && (distime > 3599) && detailed && (pInt(distime % 3600 / 60) !== 0))) {
      //minutes
      insert += checkForAnd(detailed, insert, language);

      minute = pInt(distime % 3600 / 60);
      insert += minute + ' ' + languages.declOfNum(language.mode, minute, language.minute);
    }

    if ((distime < 60) || ((distime < 3600) && (distime > 59) && detailed && (distime % 60 !== 0))) {
      //seconds
      insert += checkForAnd(detailed, insert, language);

      second = distime % 60;
      insert += second + ' ' + languages.declOfNum(language.mode, second, language.second);
    }

    if (systemTime > thisTime) {
      insert += ' ' + language.words.postAgo;
    }

    return insert;
  }
};

disTime = function (timedifference, language, detailed) {
  "use strict";
  var elements,
    elementcount,
    smallest,
    i,
    distime,
    timestamp,
    elementtime;

  if (detailed === undefined) {
    detailed = false;
  }
  if (language === undefined) {
    language = navigator.language || navigator.userLanguage;
  }
  if (languages[language] === undefined) {
    if (languages[language.split('-')[0]] !== undefined) {
      language = language.split('-')[0];
    } else {
      language = 'en';
    }
  }

  timestamp = parseInt(Date.now() / 1000, 10) + timedifference;
  elements = document.getElementsByClassName('distime');
  elementcount = elements.length;
  smallest = timestamp;
  for (i = 0; i < elementcount; i += 1) {
    elementtime = parseInt(elements[i].getAttribute('data-time'), 10);
    elements[i].innerHTML = disTimeObject.parseTimestamp(languages[language], elementtime, timestamp, detailed);
    distime = (timestamp > elementtime) ? timestamp - elementtime : elementtime - timestamp;
    if (!elements[i].hasAttribute('alt')) {
      elements[i].setAttribute('title', new Date(elementtime * 1000).toString());
    }
    if (distime < smallest) {
      smallest = distime;
    }
  }
  window.clearTimeout(disTimeRepeater);
  if ((smallest < 61) || (detailed && smallest < 3601)) {
    disTimeRepeater = setTimeout(disTime, 1000, timedifference, language, detailed);
  } else if ((smallest < 3601) || (detailed && smallest < 86400)) {
    disTimeRepeater = setTimeout(disTime, 60000, timedifference, language, detailed);
  } else if ((smallest < 86400) || detailed) {
    disTimeRepeater = setTimeout(disTime, 3600001, timedifference, language, detailed);
  } else {
    disTimeRepeater = setTimeout(disTime, 86400001, timedifference, language, detailed);
  }
};
