/* * * * * * * * * *
 *   disTime .js   *
 *  Version 0.7.2  *
 *  License:  MIT  *
 * Simon  Waldherr *
 * * * * * * * * * */

/*jslint browser: true, indent: 2 */
/*exported disTime */

var disTimeRepeater, disTimeObject, disTime;
disTimeObject = {
  parseTimestamp: function (wordsArray, thisTime, systemTime, detailed) {
    "use strict";
    var insert, distime;

    function pInt(string) {
      return parseInt(string, 10);
    }
    if (detailed === undefined) {
      detailed = false;
    }

    distime = (systemTime > thisTime) ? systemTime - thisTime : thisTime - systemTime;
    if (systemTime > thisTime) {
      insert = wordsArray[0];
    } else {
      insert = wordsArray[17];
    }

    if (distime > 31536000) {
      //years
      insert += pInt(pInt(distime) / pInt(31536000));
      if (pInt(distime / 31536000 * 1.2) === 1) {
        insert += wordsArray[15];
      } else {
        insert += wordsArray[16];
      }
    }

    if (((distime < 60 * 60 * 24 * 365) && (distime > 60 * 60 * 24 * 7 * 4)) || ((distime > 60 * 60 * 24 * 365) && detailed && (pInt(distime % 31536000 / 2419200) !== 0))) {
      //months
      if (detailed && insert !== wordsArray[0] && insert !== wordsArray[17]) {
        insert += wordsArray[2];
      }
      insert += pInt(distime % 31536000 / 2419200);
      if (pInt(distime % 31536000 / 2419200) === 1) {
        insert += wordsArray[13];
      } else {
        insert += wordsArray[14];
      }

      if (((distime < 60 * 60 * 24 * 365) && detailed && (pInt(distime % 2419200 / 86400) !== 0))) {
        //days
        if (detailed && insert !== wordsArray[0] && insert !== wordsArray[17]) {
          insert += wordsArray[2];
        }
        insert += pInt(distime % 2419200 / 86400);
        if (pInt(distime % 2419200 / 86400) === 1) {
          insert += wordsArray[9];
        } else {
          insert += wordsArray[10];
        }
      }
    }

    if (((distime < 60 * 60 * 24 * 7 * 4) && (distime > 60 * 60 * 24 * 7)) || ((distime < 10368000) && (distime > 2419199) && detailed && (pInt(distime % 2592000 / 2419200) !== 0))) {
      //weeks
      if (detailed && insert !== wordsArray[0] && insert !== wordsArray[17]) {
        insert += wordsArray[2];
      }
      insert += pInt(distime % 2419200 / 604800);
      if (pInt(distime % 2419200 / 604800) === 1) {
        insert += wordsArray[11];
      } else {
        insert += wordsArray[12];
      }
    }

    if (((distime < 60 * 60 * 24 * 7) && (distime > 86399)) || ((distime < 2419200) && (distime > 604799) && detailed && (pInt(distime % 604800 / 86400) !== 0))) {
      //days
      if (detailed && insert !== wordsArray[0] && insert !== wordsArray[17]) {
        insert += wordsArray[2];
      }
      insert += pInt(distime % 604800 / 86400);
      if (pInt(distime % 604800 / 86400) === 1) {
        insert += wordsArray[9];
      } else {
        insert += wordsArray[10];
      }
    }

    if (((distime < 86400) && (distime > 3599)) || ((distime < 604800) && (distime > 86399) && detailed && (pInt(distime % 86400 / 3600) !== 0))) {
      //hours
      if (detailed && insert !== wordsArray[0] && insert !== wordsArray[17]) {
        insert += wordsArray[2];
      }
      insert += pInt(distime % 86400 / 3600);
      if (pInt(distime % 86400 / 3600) === 1) {
        insert += wordsArray[7];
      } else {
        insert += wordsArray[8];
      }
    }

    if (((distime < 3600) && (distime > 59)) || ((distime < 86400) && (distime > 3599) && detailed && (pInt(distime % 3600 / 60) !== 0))) {
      //minutes
      if (detailed && insert !== wordsArray[0] && insert !== wordsArray[17]) {
        insert += wordsArray[2];
      }
      insert += pInt(distime % 3600 / 60);
      if (pInt(distime % 3600 / 60) === 1) {
        insert += wordsArray[5];
      } else {
        insert += wordsArray[6];
      }
    }

    if ((distime < 60) || ((distime < 3600) && (distime > 59) && detailed && (distime % 60 !== 0))) {
      //seconds
      if (detailed && insert !== wordsArray[0] && insert !== wordsArray[17]) {
        insert += wordsArray[2];
      }
      insert += distime % 60;
      if (distime % 60 === 1) {
        insert += wordsArray[3];
      } else {
        insert += wordsArray[4];
      }
    }

    if (systemTime > thisTime) {
      insert += wordsArray[1];
    }

    return insert;
  },
  words: {
    'int': ['', ' ago', ' ', ' s ', ' s ', ' m ', ' m ', ' h ', ' h ', ' d ', ' d ', ' w ', ' w ', ' m ', ' m ', ' y ', ' y ', 'in '],
    'en': ['', ' ago', ' and ', ' second ', ' seconds ', ' minute ', ' minutes ', ' hour ', ' hours ', ' day ', ' days ', ' week ', ' weeks ', ' month ', ' months ', ' year ', ' years ', 'in '],
    'de': ['vor ', '', ' und ', ' Sekunde ', ' Sekunden ', ' Minute ', ' Minuten ', ' Stunde ', ' Stunden ', ' Tag ', ' Tagen ', ' Woche ', ' Wochen ', ' Monat ', ' Monaten ', ' Jahr ', ' Jahren ', 'in '],
    'it': ['', ' fa', ' e ', ' secondo ', ' secondi ', ' minuto ', ' minuti ', ' ora ', ' ore ', ' giorno ', ' giorni ', ' settimana ', ' settimane ', ' mese ', ' mesi ', ' anno ', ' anni ', 'in '],
    'es': [' ', 'antes', ' y ', ' segundo ', ' segundos ', ' minuto ', ' minutos ', ' hora ', ' horas ', ' d&#237;a ', ' d&#237;as ', ' semana ', ' semanas ', ' mes ', ' meses ', ' a&#241;o ', ' a&#241;os ', 'en '],
    'fr': ['il ya ', '', ' et ', ' seconde ', ' secondes ', ' minute ', ' minutes ', ' heure ', ' heures ', ' jour ', ' jours ', ' semaine ', ' semaines ', ' mois ', ' mois ', ' an ', ' ans ', 'en '],
    'pt': [' ', ' atr&#225;s', ' e ', ' segundo ', ' segundos ', ' minuto ', ' minutos ', ' hora ', ' horas ', ' dia ', ' dias ', ' semana ', ' semanas ', ' m&#234;s ', ' meses ', ' ano ', ' anos ', 'em ']
    //  0 - pre ago (de, fr) (past)
    //  1 - post ago (en, it, es, pt) (past)
    //  2 - and
    //  3 - one second
    //  4 - multiple seconds
    //  5 - one minute
    //  6 - multiple minutes
    //  7 - one hour
    //  8 - multiple hours
    //  9 - one day
    // 10 - multiple days
    // 11 - one week
    // 12 - multiple weeks
    // 13 - one month
    // 14 - multiple months
    // 15 - one year
    // 16 - multiple years
    // 17 - in (future)
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
    language =  navigator.language || navigator.userLanguage;
  }
  if (disTimeObject.words[language] === undefined) {
    if (disTimeObject.words[language.split('-')[0]] !== undefined) {
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
    elements[i].innerHTML = disTimeObject.parseTimestamp(disTimeObject.words[language], elementtime, timestamp, detailed);
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
