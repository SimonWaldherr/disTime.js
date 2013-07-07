# * * * * * * * * * *
# *   disTime .js   *
# *  Version 0.7.1  *
# *  License:  MIT  *
# * Simon  Waldherr *
# * * * * * * * * * *

disTimeRepeater = undefined
disTime = undefined
disTime = (timedifference, language, detailed) ->
  "use strict"
  elements = undefined
  elementcount = undefined
  smallest = undefined
  i = undefined
  timestamp = undefined
  elementtime = undefined
  distime = undefined
  insert = undefined
  words =
    int: ["", " ago", " ", " s ", " s ", " m ", " m ", " h ", " h ", " d ", " d ", " w ", " w ", " m ", " m ", " y ", " y ", "in "]
    en: ["", " ago", " and ", " second ", " seconds ", " minute ", " minutes ", " hour ", " hours ", " day ", " days ", " week ", " weeks ", " month ", " months ", " year ", " years ", "in "]
    de: ["vor ", "", " und ", " Sekunde ", " Sekunden ", " Minute ", " Minuten ", " Stunde ", " Stunden ", " Tag ", " Tagen ", " Woche ", " Wochen ", " Monat ", " Monaten ", " Jahr ", " Jahren ", "in "]
    it: ["", " fa", " e ", " secondo ", " secondi ", " minuto ", " minuti ", " ora ", " ore ", " giorno ", " giorni ", " settimana ", " settimane ", " mese ", " mesi ", " anno ", " anni ", "in "]
    es: [" ", "antes", " y ", " segundo ", " segundos ", " minuto ", " minutos ", " hora ", " horas ", " d&#237;a ", " d&#237;as ", " semana ", " semanas ", " mes ", " meses ", " a&#241;o ", " a&#241;os ", "en "]
    fr: ["il ya ", "", " et ", " seconde ", " secondes ", " minute ", " minutes ", " heure ", " heures ", " jour ", " jours ", " semaine ", " semaines ", " mois ", " mois ", " an ", " ans ", "en "]
    pt: [" ", " atr&#225;s", " e ", " segundo ", " segundos ", " minuto ", " minutos ", " hora ", " horas ", " dia ", " dias ", " semana ", " semanas ", " m&#234;s ", " meses ", " ano ", " anos ", "em "]

  #  0 - pre ago (de, fr) (past)
  #  1 - post ago (en, it, es, pt) (past)
  #  2 - and
  #  3 - one second
  #  4 - multiple seconds
  #  5 - one minute
  #  6 - multiple minutes
  #  7 - one hour
  #  8 - multiple hours
  #  9 - one day
  # 10 - multiple days
  # 11 - one week
  # 12 - multiple weeks
  # 13 - one month
  # 14 - multiple months
  # 15 - one year
  # 16 - multiple years
  # 17 - in (future)

  detailed = false  if detailed is `undefined`
  language = navigator.language or navigator.userLanguage  if language is `undefined`
  if words[language] is `undefined`
    if words[language.split("-")[0]] isnt `undefined`
      language = language.split("-")[0]
    else
      language = "en"
  timestamp = parseInt(Date.now() / 1000, 10) + timedifference
  elements = document.getElementsByClassName("distime")
  elementcount = elements.length
  smallest = timestamp
  i = 0
  while i < elementcount
    elementtime = elements[i].getAttribute("data-time")
    distime = (if (timestamp > elementtime) then timestamp - elementtime else elementtime - timestamp)
    if (typeof distime is "number") and (parseInt(distime, 10) is distime)
      if timestamp > elementtime
        insert = words[language][0]
      else
        insert = words[language][17]
      if distime > 31536000

        #years
        insert += parseInt(parseInt(distime, 10) / parseInt(31536000, 10), 10)
        if parseInt(distime / 31536000 * 1.2, 10) is 1
          insert += words[language][15]
        else
          insert += words[language][16]
      if ((distime < 60 * 60 * 24 * 365) and (distime > 60 * 60 * 24 * 7 * 4)) or ((distime > 60 * 60 * 24 * 365) and detailed and (parseInt(distime % 31536000 / 2419200, 10) isnt 0))

        #months
        insert += words[language][2]  if detailed and insert isnt words[language][0] and insert isnt words[language][17]
        insert += parseInt(distime % 31536000 / 2419200, 10)
        if parseInt(distime % 31536000 / 2419200, 10) is 1
          insert += words[language][13]
        else
          insert += words[language][14]
        if (distime < 60 * 60 * 24 * 365) and detailed and (parseInt(distime % 2419200 / 86400, 10) isnt 0)

          #days
          insert += words[language][2]  if detailed and insert isnt words[language][0] and insert isnt words[language][17]
          insert += parseInt(distime % 2419200 / 86400, 10)
          if parseInt(distime % 2419200 / 86400, 10) is 1
            insert += words[language][9]
          else
            insert += words[language][10]
      if ((distime < 60 * 60 * 24 * 7 * 4) and (distime > 60 * 60 * 24 * 7)) or ((distime < 10368000) and (distime > 2419199) and detailed and (parseInt(distime % 2592000 / 2419200, 10) isnt 0))

        #weeks
        insert += words[language][2]  if detailed and insert isnt words[language][0] and insert isnt words[language][17]
        insert += parseInt(distime % 2419200 / 604800, 10)
        if parseInt(distime % 2419200 / 604800, 10) is 1
          insert += words[language][11]
        else
          insert += words[language][12]
      if ((distime < 60 * 60 * 24 * 7) and (distime > 86399)) or ((distime < 2419200) and (distime > 604799) and detailed and (parseInt(distime % 604800 / 86400, 10) isnt 0))

        #days
        insert += words[language][2]  if detailed and insert isnt words[language][0] and insert isnt words[language][17]
        insert += parseInt(distime % 604800 / 86400, 10)
        if parseInt(distime % 604800 / 86400, 10) is 1
          insert += words[language][9]
        else
          insert += words[language][10]
      if ((distime < 86400) and (distime > 3599)) or ((distime < 604800) and (distime > 86399) and detailed and (parseInt(distime % 86400 / 3600, 10) isnt 0))

        #hours
        insert += words[language][2]  if detailed and insert isnt words[language][0] and insert isnt words[language][17]
        insert += parseInt(distime % 86400 / 3600, 10)
        if parseInt(distime % 86400 / 3600, 10) is 1
          insert += words[language][7]
        else
          insert += words[language][8]
      if ((distime < 3600) and (distime > 59)) or ((distime < 86400) and (distime > 3599) and detailed and (parseInt(distime % 3600 / 60, 10) isnt 0))

        #minutes
        insert += words[language][2]  if detailed and insert isnt words[language][0] and insert isnt words[language][17]
        insert += parseInt(distime % 3600 / 60, 10)
        if parseInt(distime % 3600 / 60, 10) is 1
          insert += words[language][5]
        else
          insert += words[language][6]
      if (distime < 60) or ((distime < 3600) and (distime > 59) and detailed and (distime % 60 isnt 0))

        #seconds
        insert += words[language][2]  if detailed and insert isnt words[language][0] and insert isnt words[language][17]
        insert += distime % 60
        if distime % 60 is 1
          insert += words[language][3]
        else
          insert += words[language][4]
      insert += words[language][1]  if timestamp > elementtime
      elements[i].innerHTML = insert
      smallest = distime  if distime < smallest
    i += 1
  window.clearTimeout disTimeRepeater
  if (smallest < 61) or (detailed and smallest < 3601)
    disTimeRepeater = setTimeout(disTime, 1000, timedifference, language, detailed)
  else if (smallest < 3601) or (detailed and smallest < 86400)
    disTimeRepeater = setTimeout(disTime, 60000, timedifference, language, detailed)
  else if (smallest < 86400) or detailed
    disTimeRepeater = setTimeout(disTime, 3600001, timedifference, language, detailed)
  else
    disTimeRepeater = setTimeout(disTime, 86400001, timedifference, language, detailed)
