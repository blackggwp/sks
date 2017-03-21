$(document).ready(function() {
initstart();
initall($('body'),function(){
	isDatePicker($('#birthday'));
	isDatePicker($('#empstartdate'));

	function isDatePicker(dpk){
    $( dpk ).datepicker({
        dateFormat: 'dd/mm/yy'
        
    });
}
});

});
