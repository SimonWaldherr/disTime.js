/* * * * * * * * * *
 *   disTime .js   *
 *  Version 0.7.4  *
 *  License:  MIT  *
 * Simon  Waldherr *
 * * * * * * * * * */

/*jslint browser: true, indent: 2 */

function trim11 (str) {
  str = str.replace(/^\s+/, '');
  for (var i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return str;
}

function checkForAnd (detailed, insert, language) {
  if (detailed && trim11(insert) !== language.words.preAgo && trim11(insert) !== language.words.inFuture) {
    return ' ' + language.words.and + ' ';
  }
  return ''
}

languages = {
  'declOfNum': function (number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  },
  'int': {
    words: {
      'preAgo': '',
      'postAgo': 'ago',
      'and': 'and',
      'inFuture': 'in'
    },
    year: [''],
    month: [],
    week: [],
    day: [],
    hour: [],
    minute: [],
    second: []
  },
  'en': {
    words: {
      'preAgo': '',
      'postAgo': 'ago',
      'and': 'and',
      'inFuture': 'in'
    },
    year: ['year', 'years', 'years'],
    month: ['month', 'months', 'months'],
    week: ['week', 'weeks', 'weeks'],
    day: ['day', 'days', 'days'],
    hour: ['hour', 'hours', 'hours'],
    minute: ['minute', 'minutes', 'minutes'],
    second: ['second', 'seconds', 'seconds']
  },
  'de': {
    words: {
      'preAgo': 'vor',
      'postAgo': '',
      'and': 'und',
      'inFuture': 'in'
    },
    year: ['Jahr', 'Jahren', 'Jahren'],
    month: ['Monat', 'Monaten', 'Monaten'],
    week: ['Woche', 'Wochen', 'Wochen'],
    day: ['Tag', 'Tagen', 'Tagen'],
    hour: ['Stunde', 'Stunden', 'Stunden'],
    minute: ['Minute', 'Minuten', 'Minuten'],
    second: ['Sekunde', 'Sekunden', 'Sekunden']
  },
  'it': {
    words: {
      'preAgo': '',
      'postAgo': 'fa',
      'and': 'e',
      'inFuture': 'in'
    },
    year: ['anno', 'anni'],
    month: ['mese', 'mesi'],
    week: ['settimana', 'settimane'],
    day: ['giorno', 'giorni'],
    hour: ['ora', 'ore'],
    minute: ['minuto', 'minuti'],
    second: ['secondo', 'secondi']
  },
  'es': {
    words: {
      'preAgo': '',
      'postAgo': 'antes',
      'and': 'y',
      'inFuture': 'en'
    },
    year: ['a&#241;o', 'a&#241;os'],
    month: ['mes', 'meses'],
    week: ['semana', 'semanas'],
    day: ['d&#237;a ', 'd&#237;as'],
    hour: ['hora', 'horas'],
    minute: ['minuto', 'minutos'],
    second: ['segundo', 'segundos']
  },
  'fr': {
    words: {
      'preAgo': 'il ya',
      'postAgo': '',
      'and': 'et',
      'inFuture': 'en '
    },
    year: ['an', 'ans'],
    month: ['mois', 'mois'],
    week: ['semaine', 'semaines'],
    day: ['jour', 'jours'],
    hour: ['heure', 'heures'],
    minute: ['minute', 'minutes'],
    second: ['seconde', 'secondes']
  },
  'pt': {
    words: {
      'preAgo': '',
      'postAgo': 'atr&#225;s',
      'and': 'e',
      'inFuture': 'em'
    },
    year: ['ano', 'anos'],
    month: ['m&#234;s', 'meses'],
    week: ['semana', 'semanas'],
    day: ['dia', 'dias'],
    hour: ['hora', 'horas'],
    minute: ['minuto', 'minutos'],
    second: ['segundo','segundos']
  },
  'ru': {
    words: {
      'preAgo': '',
      'postAgo': 'назад',
      'and': 'и',
      'inFuture': 'через'
    },
    year: ['год','года','лет'],
    month: ['месяц','месяца','месяцев'],
    week: ['неделя','неждели','недель'],
    day: ['день','дня','дней'],
    hour: ['час','часа','часов'],
    minute: ['минута','минуты','минут'],
    second: ['секунду', 'секунды', 'секунд']
  }
};
