function agregar(){
    var correo = $("#Email").val();
    if($("#Password").val() =="" || $("#User").val() == "" || $("#Email").val() =="" || $("#PasswordR").val() ==""){
        alert("Los campos no pueden estar vacíos")
        limpiarFormularioAg();
    }else{
    if($("#Password").val() === $("#PasswordR").val()){
        if ($("#Password").val().length > 6){
            if(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(correo)){
                var items={
                    name:$("#User").val(), 
                    email:$("#Email").val(), 
                    password:$("#Password").val(),
                }
            $.ajax({    
                url : 'http://129.151.107.247:8080/api/user/new',
                data : JSON.stringify(items),
                type : 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success : function(json, textStatus, xhr) {
                    console.log(json);
                    console.log("Se guardó correctamente");
                },
                complete : function(xhr, status) {
                    confirm("Usuario creado");
                    limpiarFormularioAg();
                }
            });
        }else{
            alert("El correo no tiene un formato correcto")
            limpiarFormularioAg();
        }
    }else{
        alert("La contraseña debe tener más de 6 digitos")
        limpiarFormularioAg();
    }
    }else{
        alert("Las contraseñas no coinciden");
        limpiarFormularioAg();
    }
}
}
function limpiarFormularioAg(){
    $("#User").val(""); 
	$("#Email").val(""); 
    $("#Password").val("");
    $("#PasswordR").val(""); 
}
function confirmacion(){
    var confirma = $("#confirmarC").val();
    $.ajax({    
        url : 'http://129.151.107.247:8080/api/user/'+confirma,
        type : 'GET',
        dataType : 'json',
        success : function(json) {
            console.log(json);
            if(json === true){
                confirm("El correo ya está registrado");
                $("#confirmarC").val("");
            }else{
                alert("El correo no está registrado");
                $("#confirmarC").val("");
            }
            }
});
}
function Ingresar(){
    var correoi = $("#correo").val();
    var contrasenai = $("#contrasena").val();
    $.ajax({    
        url : 'http://129.151.107.247:8080/api/user/'+correoi+'/'+contrasenai,
        type : 'GET',
        dataType : 'json',
        success : function(json) {
            console.log(json);
                if(json.id!==null){
                    confirm("Bienvenido");
                    $("#correo").val("");
                    $("#contrasena").val("");
                    window.location="listado.html";
                }else{
                    alert("¿Quién es?");
                    $("#correo").val("");
                    $("#contrasena").val("");
                }
            }
    });
}

function Listar(){
    $.ajax({    
        url : 'http://129.151.107.247:8080/api/user/all',
        type : 'GET',
        dataType : 'json',
        success : function(json) {
            $("#listado").empty();
            for(i = 0;  i < json.length; i++){
                $("#listado").append("<tr>");
                $("#listado").append("<td class='col-2'>"+json[i].id+"</td>"); 
                $("#listado").append("<td class='col-2'>"+json[i].name+"</td>");
                $("#listado").append("<td class='col-2'>"+json[i].email+"</td>");
                $("#listado").append("</tr>");
            }
            console.log(json)
        }
    });
}