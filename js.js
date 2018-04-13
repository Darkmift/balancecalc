//add css link with anti caching string
var x = document.createElement("LINK");
x.setAttribute("id", "CssSheet");
x.setAttribute("rel", "stylesheet");
x.setAttribute("type", "text/css");
x.setAttribute("href", "css.css?" + new Date());
document.head.appendChild(x);

var amount = $('#amount');
var cycle_date = $('#cycle_date');
var result = $('#result');
var button = $('#button');

//today's date
var a = new Date();
//days between today and cycle date
function dateDiffInDays(a, b) {
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    //86400000 is one day in ms
    return Math.floor((utc2 - utc1) / 86400000);
}

//calc due payment
function duePay(amount, difference) {
    return (amount / 30 * difference).toFixed(2);
}

$('#cycle_date,#amount').on('focus', function() {
    result.css('visibility', 'hidden');
});

$('#button').on('click', function() {
    var b = new Date(cycle_date.val() + 'T00:00');
    difference = dateDiffInDays(a, b);
    console.log(difference, duePay(amount.val(), difference));
    result.css('visibility', 'visible');
    if (amount.val() == "" || cycle_date.val() == "") {
        result.html('Please fill amount and cycle date');
    } else {
        result.html('Billing due for remaining time to next cycle: $' + duePay(amount.val(), difference));
    }
});

//prevent past dates
$(function() {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var minDate = year + '-' + month + '-' + day;
    $('#cycle_date').attr('min', minDate);
});


// $('#amount').on('change', function() {
//     console.log(this.value);
// });

// $('#cycle_date').on('change', function() {
//     console.log(this.value);
// });

//function dateToday() {
//     var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();

//     if (dd < 10) {
//         dd = '0' + dd
//     }

//     if (mm < 10) {
//         mm = '0' + mm
//     }

//     return today = yyyy + '-' + mm + '-' + dd;
// }