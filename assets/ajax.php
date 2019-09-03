<?php 
require "../../db.connect.php";
if(isset($_GET['estado'])){
    $estado = $_GET['estado'];
    $sql = $pdo->prepare("SELECT * FROM cidade_select WHERE estado = :estado");
    $sql->execute(['estado' => $estado]); 
    $query = $sql->fetchAll();
    echo json_encode($query);
}elseif(isset($_GET['cidade'])){
    $cidade = $_GET['cidade'];
    $sql = $pdo->prepare("SELECT * FROM bairro_select where cidade = :cidade");
    $sql->execute(['cidade' => $cidade]);
    $query = $sql->fetchAll();
    echo json_encode($query);
}else{
    $sql = $pdo->query("SELECT * FROM estado_select");
    $query = $sql->fetchAll();
    echo json_encode($query);
}
?>