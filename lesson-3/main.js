/* TASK 1 */

var colorRegexp = /#[0-9a-f]{6}\b/ig;
console.log('colorRegexp matches #AAFFAA? - ' + colorRegexp.test('#AAFFAA'));

/* TASK 2 */

var digitRegexp = /\d+\.?\d*\b/g;
var str = '1.5 0 12. 123.4.';
console.log('digitRegexp matches "' + str + '":');
var match = digitRegexp.exec(str);
while(match) {
  console.log(match[0]);
  match = digitRegexp.exec(str);
}


/*  TASK 3  */

var timeRegexp = /([0-1][0-9]|2[0-3])[:-][0-5][0-9]/g;
console.log('timeRegex matches 23:59? - ' + timeRegexp.test('23:59'));