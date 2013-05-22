# * * * * * * * * * *
# *   disTime .js   *
# *  Version   0.4  *
# *  License:  MIT  *
# * Simon  Waldherr *
# * * * * * * * * * *

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
    en: ["", " ago", " and ", " second ", " seconds ", " minute ", " minutes ", " hour ", " hours ", " day ", " days ", " week ", " weeks ", " month ", " months ", " year ", " years "]
    de: ["vor ", "", " und ", " Sekunde ", " Sekunden ", " Minute ", " Minuten ", " Stunde ", " Stunden ", " Tag ", " Tagen ", " Woche ", " Wochen ", " Monat ", " Monaten ", " Jahr ", " Jahren "]
    it: ["", " fa", " e ", " secondo ", " secondi ", " minuto ", " minuti ", " ora ", " ore ", " giorno ", " giorni ", " settimana ", " settimane ", " mese ", " mesi ", " anno ", " anni "]
    es: [" ", "antes", " y ", " segundo ", " segundos ", " minuto ", " minutos ", " hora ", " horas ", " d&#237;a ", " d&#237;as ", " semana ", " semanas ", " mes ", " meses ", " a&#241;o ", " a&#241;os "]
    fr: ["il ya ", "", " et ", " seconde ", " secondes ", " minute ", " minutes ", " heure ", " heures ", " jour ", " jours ", " semaine ", " semaines ", " mois ", " mois ", " an ", " ans "]

  detailed = false  if detailed is `undefined`
  language = "en"  if words[language] is `undefined`
  timestamp = parseInt(Date.now() / 1000, 10) + timedifference
  elements = document.getElementsByClassName("distime")
  elementcount = elements.length
  smallest = timestamp
  i = 0
  while i < elementcount
    elementtime = elements[i].getAttribute("data-time")
    distime = timestamp - elementtime
    if (typeof distime is "number") and (parseInt(distime, 10) is distime)
      insert = words[language][0]
      if distime > 31536000

        #years
        insert += parseInt(parseInt(distime, 10) / parseInt(31536000, 10), 10)
        if parseInt(distime / 31536000 * 1.2, 10) is 1
          insert += words[language][15]
        else
          insert += words[language][16]
      if ((distime < 60 * 60 * 24 * 365) and (distime > 60 * 60 * 24 * 7 * 4)) or ((distime > 60 * 60 * 24 * 365) and detailed and (parseInt(distime % 31536000 / 2419200, 10) isnt 0))

        #months
        insert += parseInt(distime % 31536000 / 2419200, 10)
        if parseInt(distime % 31536000 / 2419200, 10) is 1
          insert += words[language][13]
        else
          insert += words[language][14]
        if (distime < 60 * 60 * 24 * 365) and detailed and (parseInt(distime % 2419200 / 86400, 10) isnt 0)

          #days
          insert += parseInt(distime % 2419200 / 86400, 10)
          if parseInt(distime % 2419200 / 86400, 10) is 1
            insert += words[language][9]
          else
            insert += words[language][10]
      if ((distime < 60 * 60 * 24 * 7 * 4) and (distime > 60 * 60 * 24 * 7)) or ((distime < 10368000) and (distime > 2419199) and detailed and (parseInt(distime % 2592000 / 2419200, 10) isnt 0))

        #weeks
        insert += parseInt(distime % 2419200 / 604800, 10)
        if parseInt(distime % 2419200 / 604800, 10) is 1
          insert += words[language][11]
        else
          insert += words[language][12]
      if ((distime < 60 * 60 * 24 * 7) and (distime > 86399)) or ((distime < 2419200) and (distime > 604799) and detailed and (parseInt(distime % 604800 / 86400, 10) isnt 0))

        #days
        insert += parseInt(distime % 604800 / 86400, 10)
        if parseInt(distime % 604800 / 86400, 10) is 1
          insert += words[language][9]
        else
          insert += words[language][10]
      if ((distime < 86400) and (distime > 3599)) or ((distime < 604800) and (distime > 86399) and detailed and (parseInt(distime % 86400 / 3600, 10) isnt 0))

        #hours
        insert += parseInt(distime % 86400 / 3600, 10)
        if parseInt(distime % 86400 / 3600, 10) is 1
          insert += words[language][7]
        else
          insert += words[language][8]
      if ((distime < 3600) and (distime > 59)) or ((distime < 86400) and (distime > 3599) and detailed and (parseInt(distime % 3600 / 60, 10) isnt 0))

        #minutes
        insert += parseInt(distime % 3600 / 60, 10)
        if parseInt(distime % 3600 / 60, 10) is 1
          insert += words[language][5]
        else
          insert += words[language][6]
      if (distime < 60) or ((distime < 3600) and (distime > 59) and detailed and (distime % 60 isnt 0))

        #seconds
        insert += distime % 60
        if distime % 60 is 1
          insert += words[language][3]
        else
          insert += words[language][4]
      insert += words[language][1]
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
disTimeRepeater = undefined
