<?php
include "Conexao.php";

if(isset($_POST['message'])){

	$timestamp = time();
	$con=Conexao::getConexao();
	$sql="INSERT INTO message VALUES (0,'".$_POST['message']."','".$_POST['nick']."','".$timestamp."')";
	if($con->query($sql)){
		echo $timestamp;
	}else{
		echo null;
	}
}
