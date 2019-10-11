<?php
include "Conexao.php";

	$con=Conexao::getConexao();
	
	if(!empty($_POST['timestamp'])) 
		$sql="SELECT * FROM  message WHERE timestamp>".$_POST['timestamp'];
	else
		$sql="SELECT * FROM  message";
	
	if($resultado=$con->query($sql)){
		
		$messages=null;
		while($message = $resultado->fetch(PDO::FETCH_ASSOC)){
			$messages[]=$message;
		}
		echo json_encode($messages);
	}else{

		echo null;
	}

