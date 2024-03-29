﻿//global

//initialise datepickers
$('.date').datepicker({
    beforeShow: customRange,
    dateFormat: "yy/mm/dd"//validRange
});

//set default date entries
$('#startDate').datepicker('setDate', new Date("11/11/2013"));
$('#endDate').datepicker('setDate', new Date("12/11/2013"));

//hide datapicker on mouse leave
$('.ui-datepicker').on('mouseleave', function () { $('.date').datepicker('hide').blur(); })

//set custom date picker range
function customRange(input) {

    if (input.id == 'endDate') {

        var minDate = new Date($('#startDate').val());

        minDate.setDate(minDate.getDate() + 1);

        return { minDate: minDate, maxDate: new Date("12/11/2013") };
    }
    else {
        return { minDate: new Date("11/11/2013"), maxDate: new Date("12/11/2013") };
    }
}

//get valid range
function validRange() {

    var start = new Date($('#startDate').val());
    var end = new Date($('#endDate').val());

    if (start > end) {
        end = new Date(Date.parse(start));
        $('#endDate').datepicker('setDate', end);

    }
}

//initilaise multiselect
$('#antivirusList').multiselect();

//at least one av must be selected
$('#antivirusList').multiselect({
    beforeclose: function (e) {
        if ($(this).multiselect("widget").find("input:checked").length < 1) {
            console.log("You must choose at least ONE antivirus!");
            alert("You must choose at least ONE antivirus!");
            return false;
        }
    }
});

function startProgressTimer() {

    $('#progressTimer').show()
$('#progressTimer').progressTimer({
    timeLimit: 2,
    warningThreshold: 50,
    baseStyle: 'progress-bar-warning',
    warningStyle: 'progress-bar-warning',
    completeStyle: 'progress-bar-success',
    onFinish: function () {
    }
});

}



//initialise field options
fieldOptions()

//field options
function fieldOptions() {
    var c = $('#column').find(":selected").val();

    switch (c) {
        case "version":

            //remove md5 from row options
            $('#row option[value=md5]').prop('disabled', true);

            //enable disabled siblings
            $('#row option[value=md5]').siblings().prop('disabled', false);

            //select next available option
            $('#row').children('option:enabled').eq(0).prop('selected', true);

            //hide matrix detection options and show version detection options
            $('#md').hide();
            $('#vd').show();
            break;

        default:

            var rOption = $('#row option[value=' + c + ']');
            //remove from row options
            rOption.prop('disabled', true);

            //enable disabled siblings
            rOption.siblings().prop('disabled', false);

            //select next available option
            $('#row').children('option:enabled').eq(0).prop('selected', true);

            //hide version detection options and show matrix detection options
            $('#vd').hide();
            $('#md').show();
            break;
    }

}

