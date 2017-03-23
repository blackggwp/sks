$(document).ready(function() {
initstart();
initall($('body'),function(){
	isDatePicker($('#birthday'));
	isDatePicker($('#empstartdate'));

	function isDatePicker(dpk){
    $( dpk ).datepicker({
        dateFormat: 'dd/mm/yy',
        yearRange: "1930:",
        changeYear: true,
        changeMonth: true,
        monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"]
    });
}
});

});
