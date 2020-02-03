$(document).ready(function() {
  for (var i = 1; i <= 31; i++) {
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {date: moment(i + '/01/2018', 'D/MM/YYYY',).format('D MMMM')};
    var html = template(context);
    $("#calendar").append(html);
  }
  $.ajax(
  {
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    method: "GET",
    success: function (data, stato) {
      $("#risultati").html(data);
      for (var key in data.response) {
        for (var i = 0; i < $("#calendar > li").length; i++) {
          if (moment(data.response[key].date, 'YYYY-MM-DD', true).format('D MMMM') == $("#calendar > li").eq(i).text())
          {
            $("#calendar > li").eq(i).append(" - " + data.response[key].name);
            $("#calendar > li").eq(i).addClass("red");
          }
        }
      }
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
    }
  });

});