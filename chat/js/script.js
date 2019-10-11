$(document).ready(function(){
   var nick=null;/*Identifica o usuário*/
   var timestamp=""; /*Registro temporal da ultima atualização*/

   /*Evento botão acesso chat*/
   $("#btn-input-chat").click(function(){
   		/*Captura valor do campo input*/
   		input_nick=$("#input-nick").val();
   		/*Remove espaços em branco no inicio e final da string*/
   		input_nick=input_nick.trim();
   		/*Verifica tem um valor para o nick*/
   		if(input_nick!=""){
   			/*sete a variavel global nick*/
   			nick=input_nick;

   			$("#input-chat").css("display", "none");

   			$("#msg-chat").css("display", "block");

   			$("#nick-show").html(nick);

   			/*Passa valor para campo input*/
   			$("#chat-msg-nick").val(nick);

   			sendMessage(nick,"Olá!");
   		}

   		$("#btn-send-msg").click(function(){
	   		sendMessage($("#chat-msg-nick").val(),$("#chat-msg").val());
     	});

     	



   });

  /*FUNÇÃO RESPONÇAVEL POR ENVIAR AS MENSAGENS AO SERVIDOR*/
   function sendMessage(nick,message){
   		/*Requisição ajax*/
   		$.ajax({
	          url : "postMessage.php",
	          type : 'post',
	          data : {
	               nick : nick,
	               message :message
	          },
	          beforeSend : function(){
	              // $("#resultado").html("ENVIANDO...");
	          }
	     	}).done(function(resultado){
	          
	          if(resultado !=null){
	          	console.log(resultado);
	          	updateMessages();
	          }
	     	}).fail(function(jqXHR, textStatus, msg){
	          alert(msg);
	     
	     	}); 
   }

   /*FUNÇÃO RESPONÇAVEL POR ATULIZAR AS MENSAGENS VINDAS DO SERVIDOR*/
   function updateMessages(){
     		
     		$.ajax({
	          url : "getMessage.php",/*Caminho do servidor*/
	          type : 'post', /*Forma como os dados serão enviados*/
	          data : {timestamp: timestamp /*Dados do timestamp da ultima mensagem*/
	          },
	          beforeSend : function(){
	          	  /*Ação a ser executada enquanto a requisição não é encerrada*/
	              // $("#resultado").html("ENVIANDO...");
	          }
	     	}).done(function(resultado){ /*Callback executado ao final da requisição*/
	          /*Recebe um objetos com o retorno do servidor*/
	          if(resultado !=null){
	          	/*Converte strig JSON em objeto JSON*/
	          	messages=JSON.parse(resultado);

	          	for(i=0; i<messages.length;i++){
	          		
	          		str="<p>"+messages[i].nick+" diz: "+messages[i].message+"</p>";
	          		$("#msg-show").append(str);
	          		timestamp=messages[i].timestamp;
	          	}
	          	
	          }
	     	}).fail(function(jqXHR, textStatus, msg){
	          alert(msg);
	     
	     	}); 
     		
    }
    /*Chama a atualização das mensagens*/
   setTimeout(updateMessages, 2000)
});
