angular.module('filters', [])

.filter('ageFilter', function() {
     return function(modDate) {
     	if (!modDate || modDate.substr(0,4) == '0000') return '';
 		var ageDifMs = Date.now() - new Date(modDate);
		return (ageDifMs /1000 /3600 /24 /365.25).toFixed(1);
     }; 
})

.filter('bornFilter', function($filter) {
     return function(born) {
     	if (!born) return '';
     	if (born.substr(0,4) == '0000') {
			if (born.substr(5,2) == '00') return ''; //month and year not known
			else born = '9999' +born.substr(4);
		}
		if (born.substr(5,2) == '00') { //month not known
			born = born.substr(0,5) +'07-01';
			var yearOnly= 1;
		}
		var ageDifMs = Date.now() - new Date(born).getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		var age = Math.abs(ageDate.getUTCFullYear() - 1970)
		var birthdate = $filter('date')(born);
		if (age > 200) return birthdate.substr(0,birthdate.indexOf(',', 0));
		else if (typeof(yearOnly) != 'undefined') return ' [' + age +']';
		else return birthdate +' [' + age +']';      
     };
 })

.filter('typeFilter', function() {
     return function(contactDetail) {
     	switch(contactDetail.type) {
     		case 'url':
     			return '<a href="http:' +contactDetail.info +'" target="_blank">' +contactDetail.info +'</a>'
     			break;
     		case 'eml':
     			return '<a href="mailto:' +contactDetail.info +'" target="_blank">' +contactDetail.info +'</a>'
     			break;
     		default:
     			return contactDetail.info;
     	}
     }; 
})