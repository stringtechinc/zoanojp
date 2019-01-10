$(function(){
  moment.lang('ja', {weekdays: ["日","月","火","水","木","金","土"]});
  var holidays = [];
  var publicHolidays = [
    '2018/11/23','2018/12/23','2018/12/24','2019/01/01',
    '2019/01/14','2019/02/11','2019/03/21','2019/04/29',
    '2019/05/03','2019/05/04','2019/05/05','2019/05/06',
    '2019/07/15','2019/08/11','2019/08/12','2019/09/16',
    '2019/09/23','2019/10/14','2019/11/03','2019/11/04',
    '2019/11/23','2019/12/23','2020/01/01','2020/01/13',
    '2020/02/11','2020/03/20','2020/04/29','2020/05/03',
    '2020/05/04','2020/05/05','2020/05/06','2020/07/20',
    '2020/08/11','2020/09/21','2020/09/22','2020/10/12',
    '2020/11/03','2020/11/23','2020/12/23'
  ];
  var holiday =  0;
  var monday = 0;
  var tuesday = 0;
  var wednesday = 0;
  var thursday = 0;
  var friday = 0;
  var saturday = 0;
  var sunday = 0;
  var shimeTime = 1200;
  var orderDateDisp = 0;
  var deliveryDay = 0;
  var orderDateFormat = "M／D(dddd) H時 ";
  var orderDateFormat2 = "M月D日(dddd)";
  var deliveryDateFormat = " M月D日(dddd) 出荷予定です。";

  function isEigyo(date) {
    var a = date.day();
    var ymd = date.format('YYYY/MM/DD');
    if ($.inArray(ymd, holidays)>=0) return false;
    if (monday==1&&a==1) return false;
    if (tuesday==1&&a==2) return false;
    if (wednesday==1&&a==3) return false;
    if (thursday==1&&a==4) return false;
    if (friday==1&&a==5) return false;
    if (saturday==1&&a==6) return false;
    if (sunday==1&&a==0) return false;
    if (holiday==1&&$.inArray(ymd, publicHolidays)>=0) return false;
    return true;
  }

  function nextDate(date) {
    date.add('days', 1);
    if (isEigyo(date)) {
      return date;
    } else {
      return nextDate(date);
    }
  }

  var fmt = "";
  var now = new Date();
  var m = moment(now);
  var time = m.hours() * 100 + m.minutes();
  if (!isEigyo(m)||shimeTime<time) {
    m = nextDate(m);
  } else {
    orderDateDisp = 0;
  }

  if (orderDateDisp == 0) {
    m = m.hour(Math.floor(shimeTime / 100)).minutes(shimeTime % 100);
    $('#orderDate').html(m.format(orderDateFormat));
  } else {
    $('#orderDate').html(moment().format(orderDateFormat2));
  }

  for (var i = 0; i < deliveryDay; i++) {
    m = nextDate(m);
  }
  $('#deliveryDate').html(m.format(deliveryDateFormat));
});

