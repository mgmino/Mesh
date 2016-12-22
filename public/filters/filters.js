angular.module('filters', [])

.filter('ageFilter', function() {

     return function(birthdate) {
//     	console.log(birthdate);
//		var ageDifMs = Date.now() - new Date(birthdate).getTime();
//		var ageDate = new Date(ageDifMs); // miliseconds from epoch
//		var age = Math.abs(ageDate.getUTCFullYear() - 1970)
//		if (isNaN(age) || age > 200) return ''
//		else return '[' + age +']';      
     }; 
})

.filter('bornFilter', function($filter) {

     return function(born) {
     	if (born.substr(0,4) == '0000') {
			if (born.substr(5,2) == '00') return '';
			else born = '9999' +born.substr(4);
		}
		var ageDifMs = Date.now() - new Date(born).getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		var age = Math.abs(ageDate.getUTCFullYear() - 1970)
		var birthdate = $filter('date')(born);
		if (age > 200) return birthdate.substr(0,birthdate.indexOf(',', 0));
		else return birthdate +' [' + age +']';      
     };
 });