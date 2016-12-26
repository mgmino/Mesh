angular.module('directives', [])

.directive('linkedIn', function() {
    return {
        scope: {
            fname: '=',
            lname: '='
        },
        link: function (scope, elem, attrs) {

            console.log(scope.fname);

            // var parsedFirstName = scope.fname.substr(0, scope.fname.indexOf(" "));
            // console.log(parsedFirstName);
            //
            // var img_element = angular.element('<img/>');
            // img_element.attr('src', 'pix/icons/linkedin.gif');
            //
            // // Builds <a> tag
            // var a_element = angular.element('<a/>');
            // a_element.attr('href', 'https://www.linkedin.com/vsearch/f?keywords=' + parsedFirstName + scope.lname + '&search=Search');
            // a_element.attr('target', '_blank');
            //
            // // Adds LinkedIn logo to <a> tag
            // a_element.append(img_element);
            //
            // elem.append('hey');
        }
    }
});