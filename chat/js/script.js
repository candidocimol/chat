$(document).ready(function(){
   var nick=null;
   var timestamp="";
   $("#btn-input-chat").click(function(){
   		/*Captura valor do campo input*/
   		input_nick=$("#input-nick").val();
   		/*Remove espaços em branco no inicio e final da string*/
   		console.log(input_nick);
   		input_nick=input_nick.trim();
   		if(input_nick!=""){
   			nick=input_nick;
   			$("#input-chat").css("display", "none");
   			$("#msg-chat").css("display", "block");
   			$("#nick-show").html(nick);
   			$("#chat-msg-nick").val(nick);
   		}

   		$("#btn-send-msg").click(function(){
	   		$.ajax({
	          url : "postMessage.php",
	          type : 'post',
	          data : {
	               nick : $("#chat-msg-nick").val(),
	               message :$("#chat-msg").val()
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
     	});

     	



   });

   function updateMessages(){
     		$.ajax({
	          url : "getMessage.php",
	          type : 'post',
	          data : {timestamp: timestamp
	          },
	          beforeSend : function(){
	              // $("#resultado").html("ENVIANDO...");
	          }
	     	}).done(function(resultado){
	          if(resultado !=null){
	          	
	          	messages=JSON.parse(resultado);

	          	for(i=0; i<messages.length;i++){
	          		console.log(messages[i]);
	          		str="<p>"+messages[i].nick+" diz: "+messages[i].message+"</p>";
	          		$("#msg-show").append(str);
	          		timestemp=messages[i].timestemp;
	          	}
	          	
	          }
	     	}).fail(function(jqXHR, textStatus, msg){
	          alert(msg);
	     
	     	}); 
     		
     	}

   setTimeout(updateMessages, 20000)
});
