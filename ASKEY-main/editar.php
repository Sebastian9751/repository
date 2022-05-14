<?php include 'templates/header.php'?>
<?php
if(!isset($_GET["codigo"])){
    header('Location: index.php?mensaje=error');
    exit();
}
include_once 'model/conexion.php';
$codigo = $_GET['codigo'];

$sentencia = $bd->prepare("select * from articulos where idArticulo =?;");
$sentencia->execute([$codigo]);
$articulo = $sentencia->fetch(PDO::FETCH_OBJ);

?>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-5">
        <div class="card">
                <div class="card-header">
                    Editar Articulo
                </div>
                <form  class="p-4" method="POST" action="editarproceso.php">
                    <div class="mb-3">
                        <label class="form-label">Nombre</label>
                        <input type="text" class="form-control" name="nombre"  autocomplete="off" 
                        value="<?php echo $articulo->nombreArticulo; ?>" >

                    </div>
                
                    <div class="mb-3">
                        <label class="form-label">Descripcion</label>
                        <input type="text" class="form-control" name="descripcion"  autocomplete="off" 
                        value="<?php echo $articulo->descripcionArticulo; ?>">
                        
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Precio</label>
                        <input type="text" class="form-control" name="price"  autocomplete="off" 
                        value="<?php echo $articulo->precioArticulo; ?>" >
                        
                    </div>
                    <div class="d-grid">
                        <input type="hidden" name="codigo" value="<?php echo $articulo->idArticulo; ?>">
                        <input type="submit" class="btn btn-primary" value="Actualizar">
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>


<?php include 'templates/footer.php'?>

