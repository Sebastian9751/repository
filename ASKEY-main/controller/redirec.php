<?php

  session_start();

  if($_SESSION['cargo'] == 1){
    header('location: ../askey.php');
  }else if($_SESSION['cargo'] == 2){
    header('location: ../askey.php');
  }

 ?>
