<?php
session_start();
include "model/conexion.php";
include "model/usuario.php";

if(isset($_SESSION['id'])){
  header('location: askey.php');
}
?>

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
  <title>Post</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<div id="Comentarios">
<form action="comments.php" class="form-cometarios" method="POST" enctype="multipart/form-data">
        <h1 class="form__comentario">Comentario</h1>
        <div class="container--flex">
            <textarea type="text" class="form_input" placeholder="Ingresa tu comentario" name="texto" rows="10" cols="40"></textarea>
        </div>
        <input type="button" class="form_submit" value="Comentar" />
</form>
<?php
if(isset($_POST['texto'])) {
  $query = mysql_query("INSERT INTO comentarios(Id_Comentario, Texto, Id_Usuario, Id_Post, Fecha_Comentario, MeGusta, BanderaRoja) value ('".$_POST['comentarios']."','".$_SESSION['id']);	
  if($query) { header("Location: askey.php"); }
}
?>
<br>
	<div id="container">
    	<ul id="comments">
        
        <?php
         $comentarios = mysql_query("SELECT * FROM comentarios WHERE reply = 0 ORDER BY id DESC");
		     while($row=mysql_fetch_array($comentarios)) {
		   	 $usuario = mysql_query("SELECT * FROM usuarios WHERE id = '".$row['usuario']."'");
		  	 $user = mysql_fetch_array($usuario);

        ?>

</div>
</body>
</html>
