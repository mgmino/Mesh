angular
    .module('contacts')
    .filter('ageFilter', ageFilter);

ageFilter.$inject = [];

function ageFilter() {
    return function(modDate) {
        if (!modDate || modDate.substr(0,4) === '0000') return '?';
        var ageDifMs = new Date().getTime() - new Date(modDate).getTime();
//        var ageDate = new Date(ageDifMs); // milliseconds from epoch
//        return (ageDate.getUTCFullYear() - 1970);
		return (ageDifMs /3600 /24000 /365.25).toFixed(1);
    };
}
