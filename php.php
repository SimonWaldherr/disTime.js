<html>
<head>
  <meta charset="utf-8">
  <title>disTime.js</title>
  <style>
  
  </style>
  <script src="disTime.js" type="text/javascript"></script>
  <script>
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function init() {
      var config = {'lang' : 'en', 'time' : '60*60*24', 'detail' : 0},
      hash = window.location.hash.replace('#', '').split('&');
      
      for(i = 0; i < hash.length; i++) {
        config[hash[i].split('=')[0]] = hash[i].split('=')[1];
      }
      
      disTime(<?php echo time(); ?>-parseInt(Date.now()/1000),config['lang'],parseInt(config['detail'],10));
      //disTime(0,config['lang'],parseInt(config['detail'],10));
    }
  </script>
</head>
<body onload="javascript:init();">
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
</body>
</html>