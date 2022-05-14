<?php

    if (!isset($_POST['codigo'])){
        header('Location: index.php?mensaje=error');
    }
    include 'model/conexion.php';
    $codigo = $_POST['codigo'];
    $nombre = $_POST['nombre'];
    $descript = $_POST['descripcion'];
    $price = $_POST['price'];

    $sentencia = $bd->prepare("UPDATE articulos SET
    nombreArticulo =?, descripcionArticulo=?, precioArticulo =?
    WHERE idArticulo =?;");
    $resultado = $sentencia->execute([$nombre, $descript, $price, $codigo]);

    if ($resultado === true ){
        header('Location: index.php?mensaje=actualizado');
    }
    else{
        header('Location: index.php?mensaje=error');}

?>