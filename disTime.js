/* * * * * * * * * *
 *   disTime .js   *
 *  Version 0.7.0  *
 *  License:  MIT  *
 * Simon  Waldherr *
 * * * * * * * * * */

/*jslint browser: true, indent: 2 */
/*exported disTime */

var disTimeRepeater, disTime;
disTime = function (timedifference, language, detailed) {
  "use strict";
  var elements,
    elementcount,
    smallest,
    i,
    timestamp,
    elementtime,
    distime,
    insert,
    words = {
      'int': ['', ' ago', ' ', ' s ', ' s ', ' m ', ' m ', ' h ', ' h ', ' d ', ' d ', ' w ', ' w ', ' m ', ' m ', ' y ', ' y ', 'in '],
      'en': ['', ' ago', ' and ', ' second ', ' seconds ', ' minute ', ' minutes ', ' hour ', ' hours ', ' day ', ' days ', ' week ', ' weeks ', ' month ', ' months ', ' year ', ' years ', 'in '],
      'de': ['vor ', '', ' und ', ' Sekunde ', ' Sekunden ', ' Minute ', ' Minuten ', ' Stunde ', ' Stunden ', ' Tag ', ' Tagen ', ' Woche ', ' Wochen ', ' Monat ', ' Monaten ', ' Jahr ', ' Jahren ', 'in '],
      'it': ['', ' fa', ' e ', ' secondo ', ' secondi ', ' minuto ', ' minuti ', ' ora ', ' ore ', ' giorno ', ' giorni ', ' settimana ', ' settimane ', ' mese ', ' mesi ', ' anno ', ' anni ', 'in '],
      'es': [' ', 'antes', ' y ', ' segundo ', ' segundos ', ' minuto ', ' minutos ', ' hora ', ' horas ', ' d&#237;a ', ' d&#237;as ', ' semana ', ' semanas ', ' mes ', ' meses ', ' a&#241;o ', ' a&#241;os ', 'en '],
      'fr': ['il ya ', '', ' et ', ' seconde ', ' secondes ', ' minute ', ' minutes ', ' heure ', ' heures ', ' jour ', ' jours ', ' semaine ', ' semaines ', ' mois ', ' mois ', ' an ', ' ans ', 'en '],
      'pt': [' ', ' atr&#225;s', ' e ', ' segundo ', ' segundos ', ' minuto ', ' minutos ', ' hora ', ' horas ', ' dia ', ' dias ', ' semana ', ' semanas ', ' m&#234;s ', ' meses ', ' ano ', ' anos ', 'em ']
    };
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

  if (detailed === undefined) {
    detailed = false;
  }
  if (language === undefined) {
    language =  navigator.language || navigator.userLanguage;
  }
  if (words[language] === undefined) {
    if (words[language.split('-')[0]] !== undefined) {
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
    elementtime = elements[i].getAttribute("data-time");
    distime = (timestamp > elementtime) ? timestamp - elementtime : elementtime - timestamp;

    if ((typeof distime === 'number') && (parseInt(distime, 10) === distime)) {
      if (timestamp > elementtime) {
        insert = words[language][0];
      } else {
        insert = words[language][17];
      }

      if (distime > 31536000) {
        //years
        insert += parseInt(parseInt(distime, 10) / parseInt(31536000, 10), 10);
        if (parseInt(distime / 31536000 * 1.2, 10) === 1) {
          insert += words[language][15];
        } else {
          insert += words[language][16];
        }
      }

      if (((distime < 60 * 60 * 24 * 365) && (distime > 60 * 60 * 24 * 7 * 4)) || ((distime > 60 * 60 * 24 * 365) && detailed && (parseInt(distime % 31536000 / 2419200, 10) !== 0))) {
        //months
        insert += parseInt(distime % 31536000 / 2419200, 10);
        if (parseInt(distime % 31536000 / 2419200, 10) === 1) {
          insert += words[language][13];
        } else {
          insert += words[language][14];
        }

        if (((distime < 60 * 60 * 24 * 365) && detailed && (parseInt(distime % 2419200 / 86400, 10) !== 0))) {
          //days
          insert += parseInt(distime % 2419200 / 86400, 10);
          if (parseInt(distime % 2419200 / 86400, 10) === 1) {
            insert += words[language][9];
          } else {
            insert += words[language][10];
          }
        }
      }

      if (((distime < 60 * 60 * 24 * 7 * 4) && (distime > 60 * 60 * 24 * 7)) || ((distime < 10368000) && (distime > 2419199) && detailed && (parseInt(distime % 2592000 / 2419200, 10) !== 0))) {
        //weeks
        insert += parseInt(distime % 2419200 / 604800, 10);
        if (parseInt(distime % 2419200 / 604800, 10) === 1) {
          insert += words[language][11];
        } else {
          insert += words[language][12];
        }
      }

      if (((distime < 60 * 60 * 24 * 7) && (distime > 86399)) || ((distime < 2419200) && (distime > 604799) && detailed && (parseInt(distime % 604800 / 86400, 10) !== 0))) {
        //days
        insert += parseInt(distime % 604800 / 86400, 10);
        if (parseInt(distime % 604800 / 86400, 10) === 1) {
          insert += words[language][9];
        } else {
          insert += words[language][10];
        }
      }

      if (((distime < 86400) && (distime > 3599)) || ((distime < 604800) && (distime > 86399) && detailed && (parseInt(distime % 86400 / 3600, 10) !== 0))) {
        //hours
        insert += parseInt(distime % 86400 / 3600, 10);
        if (parseInt(distime % 86400 / 3600, 10) === 1) {
          insert += words[language][7];
        } else {
          insert += words[language][8];
        }
      }

      if (((distime < 3600) && (distime > 59)) || ((distime < 86400) && (distime > 3599) && detailed && (parseInt(distime % 3600 / 60, 10) !== 0))) {
        //minutes
        insert += parseInt(distime % 3600 / 60, 10);
        if (parseInt(distime % 3600 / 60, 10) === 1) {
          insert += words[language][5];
        } else {
          insert += words[language][6];
        }
      }

      if ((distime < 60) || ((distime < 3600) && (distime > 59) && detailed && (distime % 60 !== 0))) {
        //seconds
        insert += distime % 60;
        if (distime % 60 === 1) {
          insert += words[language][3];
        } else {
          insert += words[language][4];
        }
      }

      if (timestamp > elementtime) {
        insert += words[language][1];
      }
      elements[i].innerHTML = insert;

      if (distime < smallest) {
        smallest = distime;
      }
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
