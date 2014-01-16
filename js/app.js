//(function(){
    //VARIABLES GLOBALES A ESTE SCOPE
    //========================================================================================
    //FUNCIONES
    //========================================================================================
    function init() {
        var storage = db.load('carapp.registros');
        if(storage === null) {
            storage = new Array();
            db.save('carapp.registros', storage);
        }
        var dataEntrySelector = null;
        dataEntrySelector = db.load('carapp.dataEntrySelector');
        if(dataEntrySelector === null) {
            dataEntrySelector = [];
            var els = $(".data-entry");
            if(els.length > 0) {
                for(var i = 0; i < els.length; i++) {
                    dataEntrySelector.push(els.get(i).getAttribute("id"));
                }
                db.save('carapp.dataEntrySelector', dataEntrySelector);
            }
        }
        console.log(dataEntrySelector);
        $(document).ready(function() {
            $("#txtDate").val(new Date().toLocaleDateString());
            var storage = db.load('carapp.registros');
            console.log(storage);
            if(storage !== null) {
                for (var i = 0; i < storage.length; i++) {
                    var _data = ""; 
                    for(var j = 0; j < dataEntrySelector.length; j++) {
                        _data += "<td>" + storage[i][dataEntrySelector[j]] + "</td>";
                    }
                    $('#tblRegistro').html($('#tblRegistro').html() + "<tr>" + _data + "</tr>");    
                }
            }
            $('#txtDate').pickadate();
            
            $("#btnCargar").click(function(event){
                event.preventDefault();
                storage = db.load('carapp.registros');
                console.log(storage);
                var registro = {};
                for(var i = 0; i < dataEntrySelector.length; i++) {
                    var el = $("#" + dataEntrySelector[i]);
                    registro[dataEntrySelector[i]] = el.val();
                    el.val('')
                }
                $("#txtDate").val(new Date().toLocaleDateString());
                storage.push(registro);
                db.save('carapp.registros', storage);
                var _data = ""; 
                for(var j = 0; j < dataEntrySelector.length; j++) {
                    _data += "<td>" + registro[dataEntrySelector[j]] + "</td>";
                }
                $('#tblRegistro').html($('#tblRegistro').html() + "<tr>" + _data + "</tr>");   
            });    
        });
    }
    //CODIGO A EJECUTAR
    //========================================================================================
    //document.addEventListener("deviceready", init, false);
    init();
//})();