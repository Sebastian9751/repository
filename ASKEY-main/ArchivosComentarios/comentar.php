<?php


include 'config.php';
$id_post ="1";                  

$id_Usuario= "1";

         
$fechareg = date("y/m/d");  //Con esto se pone la fecha de comentario



if(isset($_POST['comentar'])){
    
    if( strlen($_POST['comentario']>=7))
    {
        $texto =trim ($_POST['comentario']); //texto que se va apublicar
        
        $consulta =  "INSERT INTO `comentarios`(`Id_Comentario`, `Texto`, `Fecha_Comentario`, `MeGusta`, `Bandera_Roja`, `Id_post`, `Id_usuario`, `id_archivo`) VALUES ('','$texto','$fechareg','','','$id_post','$id_Usuario','') "  ;
        
        $resultado = mysqli_query($conexion,$consulta);
        
        
    }
}




