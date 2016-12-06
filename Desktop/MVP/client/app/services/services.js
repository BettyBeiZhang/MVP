angular.module('app.services',[])

.factory('DateFactory', function($http) {
	var day = 0;
	var date="";
  var userName="";

  var monthDays = [27,28,29,30,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  var dates = [];
  for (var i = 0; i < monthDays.length; i++ ) {
    if (i % 7 === 0) dates.push([]);
    dates[dates.length-1].push(monthDays[i]);
  }

  var getDates = function() {
    return dates;
  };

  var setDay = function(day) {
    day = day;
    date = moment([2016, 11, day]);
  
  };

  var getDate = function() {
    if(typeof date === 'object'){
      return date.format('YYYY/MM/DD');
    }
    console.log('returning date', date);
   return date;
  };

  var setName = function(name) {
    userName = name;

  };

  var getName = function() {
    return userName;
  };


  var getNotes = function(note) {
      return $http({
        method: 'POST',
        url: '/takeNote',
        header: {'content-type': 'application/json'},
        data: JSON.stringify({note: note})
      });
      // .then(function(res) {  
      // console.log(res.data); 
      //   return res.data; 
      // });
  };
  

  var rendernotes = function(theDate) {
    return $http({
      method: 'POST',
      url:'/rendernotes',
      data: JSON.stringify({date: theDate})  
    })
    .then(function(res) {
      console.log('in service', res.data); 
      return res.data;
    });
  };


  return {
    getDates: getDates,
    setDay: setDay,
    getDate: getDate,
    setName: setName,
    getName: getName,
    getNotes: getNotes,
    rendernotes: rendernotes

  };

});