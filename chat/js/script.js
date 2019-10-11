$(document).ready(function(){
   var nick=null;
   var timestamp="";
   $("#btn-input-chat").click(function(){
   		/*Captura valor do campo input*/
   		input_nick=$("#input-nick").val();
   		/*Remove espaços em branco no inicio e final da string*/
   		input_nick=input_nick.trim();
   		if(input_nick!=""){
   			nick=input_nick;
   			$("#input-chat").css("display", "none");
   			$("#msg-chat").css("display", "block");
   			$("#nick-show").html(nick);
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
	          	
	          	console.log("Atualizando");
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

   setTimeout(updateMessages, 2000)
});
