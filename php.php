<html>
<head>
  <meta charset="utf-8">
  <title>disTime.js</title>
  <style>
    #config {
      font-family: monospace;
      font-size: 17px;
    }
    #examples {
      font-family: "Lucida Grande", "Lucida Sans Unicode", Geneva, sans-serif;
      font-size: 14px;
    }
  </style>
  <script src="disTime.js" type="text/javascript"></script>
  <script>
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function init() {
      var config, userLang = (navigator.language) ? navigator.language : navigator.userLanguage;
      config = {'lang' : userLang, 'time' : '60*60*24', 'detail' : 1},
      hash = window.location.hash.replace('#', '').split('&');
      for(i = 0; i < hash.length; i++) {
        config[hash[i].split('=')[0]] = hash[i].split('=')[1];
      }
      disTime(<?php echo time(); ?>-parseInt(Date.now()/1000),config['lang'],parseInt(config['detail'],10));
      //disTime(0,config['lang'],parseInt(config['detail'],10));
    }
    function changeDemo() {
      var lang, detail;
      lang = document.getElementById('lang').value;
      detail = document.getElementById('detail').value === 'on' ? true : false;
      window.clearTimeout(disTimeRepeater);
      disTime(0,lang,detail);
    }
  </script>
</head>
<body onload="javascript:init();">
  <div id="config">Language (ISO 639-1):
    <select id="lang" name="lang" size="1" onchange="changeDemo()">
      <optgroup label="autodetected">
        <option><script>document.write((navigator.language) ? navigator.language : navigator.userLanguage);</script></option>
      </optgroup>
      <optgroup label="supported">
        <option>en</option>
        <option>de</option>
        <option>it</option>
        <option>es</option>
        <option>fr</option>
        <option>ms</option>
        <option>pt</option>
        <option>ru</option>
        <option>uk</option>
      </optgroup>
    </select>
    Details:
    <select id="detail" name="detail" size="1" onchange="changeDemo()">
      <option>off</option>
      <option>on</option>
    </select>
  </div><div id="examples">
    <p class="distime" data-time="0">0</p>
    <p class="distime" data-time="613112400">613112400</p>
    <p class="distime" data-time="1363410000">1363410000</p>
    <?php
      $i = 0;
      while($i < 23) {
        $timestamp = time()-$i*(100+rand(0, 42));
        echo '<p class="distime" data-time="'.$timestamp.'">'.$timestamp.'</p>';
        ++$i;
      }
    ?>
  </div>
</body>
</html>
