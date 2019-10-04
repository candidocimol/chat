<?php
include "Conexao.php";

	$con=Conexao::getConexao();
	$sql="SELECT * FROM  message";

	if(!empty($_POST['timestamp'])) 
		$sql.=" WHERE timestamp>".$_POST['timestamp'];
	
	if($resultado=$con->query($sql)){

		$messages=null;
		while($message = $resultado->fetch(PDO::FETCH_ASSOC)){
			$messages[]=$message;
		}
		
		echo json_encode($messages);
	}else{
		echo null;
	}

