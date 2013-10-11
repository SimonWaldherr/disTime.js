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
function checkForAnd(detailed, insert, language) {
    if (detailed && trim11(insert) !== language.words.preAgo && trim11(insert) !== language.words.inFuture) {
        return ' ' + language.words.and + ' ';
    }
    return ''
}



languages = {
    'declOfNum' : function(number, titles)
    {
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
            'preAgo': '',
            'postAgo': 'ago',
            'and': 'and',
            'inFuture': 'in'
        },
        year: [],
        month: [],
        week: [],
        day: ['Tag', 'Tagen'],
        hour: ['Stunde', 'Stunden', 'Stunden'],
        minute: ['Minute', 'Minuten', 'Minuten'],
        second: ['Sekunde', 'Sekunden', 'Sekunden']
    },
    'it': {
        words: [],
        year: [],
        month: [],
        week: [],
        day: [],
        hour: [],
        minute: [],
        second: []
    },
    'es': {
        words: [],
        year: [],
        month: [],
        week: [],
        day: [],
        hour: [],
        minute: [],
        second: []
    },
    'fr': {
        words: [],
        year: [],
        month: [],
        week: [],
        day: [],
        hour: [],
        minute: [],
        second: []
    },
    'pt': {
        words: [],
        year: [],
        month: [],
        week: [],
        day: [],
        hour: [],
        minute: [],
        second: []
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
}

/**
 'de': ['vor ', '', ' und ', ' Sekunde ', ' Sekunden ', ' Minute ', ' Minuten ', ' Stunde ', ' Stunden ', ' Tag ', ' Tagen ', ' Woche ', ' Wochen ', ' Monat ', ' Monaten ', ' Jahr ', ' Jahren ', 'in '],
 'it': ['', ' fa', ' e ', ' secondo ', ' secondi ', ' minuto ', ' minuti ', ' ora ', ' ore ', ' giorno ', ' giorni ', ' settimana ', ' settimane ', ' mese ', ' mesi ', ' anno ', ' anni ', 'in '],
 'es': [' ', 'antes', ' y ', ' segundo ', ' segundos ', ' minuto ', ' minutos ', ' hora ', ' horas ', ' d&#237;a ', ' d&#237;as ', ' semana ', ' semanas ', ' mes ', ' meses ', ' a&#241;o ', ' a&#241;os ', 'en '],
 'fr': ['il ya ', '', ' et ', ' seconde ', ' secondes ', ' minute ', ' minutes ', ' heure ', ' heures ', ' jour ', ' jours ', ' semaine ', ' semaines ', ' mois ', ' mois ', ' an ', ' ans ', 'en '],
 'pt': [' ', ' atr&#225;s', ' e ', ' segundo ', ' segundos ', ' minuto ', ' minutos ', ' hora ', ' horas ', ' dia ', ' dias ', ' semana ', ' semanas ', ' m&#234;s ', ' meses ', ' ano ', ' anos ', 'em ']
*/