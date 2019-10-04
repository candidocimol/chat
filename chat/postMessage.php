<?php
include "Conexao.php";
if(isset($_POST['message'])){

	$timestamp = time();
	$con=Conexao::getConexao();
	$sql="INSERT INTO message VALUES (0,'".$_POST['from']."',".$timestamp.", '".$_POST['message']."')";
	if($con->query($sql)){
		echo $timestamp;
	}else{
		echo null;
	}
}
