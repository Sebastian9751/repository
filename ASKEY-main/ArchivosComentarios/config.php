<?php

$user= "root";
$pass= "";
$server= "localhost";
$bd= "newbd";




$conexion = mysqli_connect ($server, $user, "") or die("No hay conexion con el servidor");
    

$base= mysqli_select_db(  $conexion, $bd) or die ("no se ha podido conectar con a base de datos");

$consulta ="SELECT * FROM post";

//consutas para mostrar JOIN DE TRES TABLAS  USUARIO/COMENTARIOS/POST

$ola="1"; // para seleccinar el id de la publicacion
$showcom= "select  usuarios.nombre, post.id_Post , comentarios.Texto, usuarios.email, comentarios.Fecha_Comentario, usuarios.id, comentarios.Id_comentario 
from comentarios inner join  usuarios on comentarios.Id_usuario=usuarios.id inner join post on comentarios.id_post=post.Id_Post  where post.Id_Post= $ola";



$comentario = mysqli_query ($conexion, $showcom) or die ("Sin conexion_1"); //comentarios

$resultado_2 = mysqli_query ($conexion, $consulta) or die ("Sin conexion");

//Consulta para mostrar la foto del usuario de la cuenta
$idUsuario=1;
$consulta_foto_usuario_cuenta = "SELECT foto FROM usuarios WHERE id=1";
$resultado_foto_usuario_cuenta = mysqli_query ($conexion, $consulta_foto_usuario_cuenta) or die ("Sin conexion");
$columna4 = mysqli_fetch_array($resultado_foto_usuario_cuenta);

//Consultas obtener datos del usuario de la cuenta
$consulta_datos_usuario_cuenta = "SELECT * FROM usuarios WHERE id=$idUsuario";
$resultado_datos_usuario_cuenta = mysqli_query ($conexion, $consulta_datos_usuario_cuenta) or die ("Sin conexion");
$datos_usuario_cuenta = mysqli_fetch_array($resultado_datos_usuario_cuenta);
?>