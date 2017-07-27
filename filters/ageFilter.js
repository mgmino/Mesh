angular.module('filters')
.filter('ageFilter', function() {
    return function(modDate) {
        if (!modDate || modDate.substr(0,4) === '0000') return '';
        var ageDifMs = Date.now() - new Date(modDate);
        return (ageDifMs /1000 /3600 /24 /365.25).toFixed(1);
    };
});
