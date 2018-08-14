angular
    .module('contacts')
    .filter('ageFilter', ageFilter);

ageFilter.$inject = [];

function ageFilter() {
    return function(modDate) {
        if (!modDate || modDate.substr(0,4) === '0000') return 'n/a';
        var ageDifMs = Date.now() - new Date(modDate);
        return (ageDifMs /3600 /24000 /365.25).toFixed(1);
    };
}
