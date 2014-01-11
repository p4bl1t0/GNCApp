(function(){
    //VARIABLES GLOBALES A ESTE SCOPE
    //========================================================================================
    //FUNCIONES
    //========================================================================================
    function init() {
        var storage = null;
        var dataEntrySelector = window.localStorage.getItem('carapp.dataEntrySelector');
        if(dataEntrySelector !== null) {
            dataEntrySelector = JSON.parse(dataEntrySelector);
        } else {
            dataEntrySelector = [];
            var els = $(".data-entry");
            if(els.length > 0) {
                for(var i = 0; i < els.length; i++) {
                    dataEntrySelector.push(els.get(i).getAttribute("id"));
                }
                window.localStorage.setItem('carapp.dataEntrySelector', JSON.stringify(dataEntrySelector));
            }
        }
        console.log(dataEntrySelector);
        $(document).ready(function() {
            console.log("document ready");
            storage = window.localStorage.getItem('carapp.registros');
            console.log(storage);
            $("#txtDate").val(new Date().toLocaleDateString());
            if(storage !== null) {
                storage = JSON.parse(storage);
                console.log(storage);
            }
            if(storage === null || storage === '') {
                var storage = [];
                window.localStorage.setItem('carapp.registros', JSON.stringify(storage));
            } else {
                storage = JSON.parse(window.localStorage.getItem('carapp.registros'));
                for (var i = 0; i < storage.length; i++) {
                    var _data = ""; 
                    for(var j = 0; j < dataEntrySelector.length; j++) {
                        _data += "<td>" + storage[i][dataEntrySelector[j]] + "</td>";
                    }
                    $('#tblRegistro').html($('#tblRegistro').html() + "<tr>" + _data + "</tr>");    
                }
            }
            $("#btnCargar").click(function(event){
                event.preventDefault();
                storage = window.localStorage.getItem('carapp.registros');
                storage = JSON.parse(storage);
                var registro = {};
                for(var i = 0; i < dataEntrySelector.length; i++) {
                    registro[dataEntrySelector[i]] = $("#" + dataEntrySelector[i]).val();
                }
                storage.push(registro);
                window.localStorage.setItem('carapp.registros', JSON.stringify(storage));
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
    document.addEventListener("deviceready", init, false);
    //init();
})();