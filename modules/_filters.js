angular.module('filters', []);

angular.module('filters')
.filter('ageFilter', function() {
    return function(modDate) {
        if (!modDate || modDate.substr(0,4) === '0000') return 'n/a';
        var ageDifMs = Date.now() - new Date(modDate);
        return (ageDifMs /3600 /24000 /365.25).toFixed(1);
    };
});

angular.module('filters')
.filter('bornFilter', function($filter) {
    return function(born) {
        if (!born) return '';
        if (born.substr(0,4) === '0000') {
            if (born.substr(5,2) === '00') return ''; //month and year not known
            else born = '9999' +born.substr(4);
        }
        if (born.substr(5,2) === '00') { //month not known
            born = born.substr(0,5) +'07-01';
            var yearOnly= 1;
        }
        var ageDifMs = Date.now() - new Date(born).getTime();
        var ageDate = new Date(ageDifMs); // milliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        var birthdate = $filter('date')(born);
        if (age > 200) return birthdate.substr(0,birthdate.indexOf(',', 0));
        else if (typeof(yearOnly) !== 'undefined') return ' [' + age +']';
        else return birthdate +' [' + age +']';
    };
});