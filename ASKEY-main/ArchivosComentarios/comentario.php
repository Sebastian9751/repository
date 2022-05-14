



<html>
    <head>
    <meta charset="utf-8">
  
    </head>
    <?php include 'config.php' 
        ?>
    

<?php 
    
    if($conexion){
        
        echo"<h1> conexion exitosa </h1>";
    }
    ?>

    <body>
    
    
        <form method="post">
        

            <h1>Realiza un comentario</h1>
            
            <input type="text" name="comentario" placeholder="Escribe aqui" required>
            
            <input type="submit" name="comentar"> 
            
        
        
        </form>
        
        <?php include 'comentar.php"'; ?>
    
    
    
        
        
        
        
        
        
        
        <br><br>
        
        <center>
        
            <?php
        
         while($coluM = mysqli_fetch_array($comentario)){

    ?>  
         id_comentario =&nbsp; <?php echo $coluM ['Id_comentario'] ?>&nbsp; 
            id_comentario =&nbsp; <?php echo $coluM ['Id_comentario'] ?>&nbsp; 
         Email =&nbsp; <?php echo $coluM ['email'] ?>&nbsp; 
         nombre ==&nbsp; <?php echo $coluM ['nombre'] ?>&nbsp;  <br><br><br>
         Texto ==<br><?php echo $coluM ['Texto'] ?>  <br><br><br><br><br><br>
        
        
        
        
        
        
        
        
         <?php  
        }
        ?>

        
        
        
        
        
        </center>
        
        
        
        
        
        
        
    
    
    
    </body>
    
    
    
    
    

</html>








