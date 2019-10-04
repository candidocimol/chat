$(document).ready(function(){
   var nick=null;

   $("#btn-input-chat").click(function(){
   		input_nick=$("#input-nick").value;
   		input_nick=input_nick.trim();
   		if(input_nick!=null || input_nick!=""){
   			nick=input_nick;
   			
   		}
   });
});
