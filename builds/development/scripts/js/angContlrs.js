var mainCtrls = angular.module('mainCtrls', []);

mainCtrls.controller('OneController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/profile/dude').
    success(function(data) {
        $scope.dude = data;
    });

    angular.element(document).ready(function() {
        //$('.profile').html('hello');


        function getInternetExplorerVersion()
        // Returns the version of Internet Explorer or a -1
        // (indicating the use of another browser).
        {
            var rv = -1; // Return value assumes failure.
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) !== null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        }

        function checkVersion() {
            var msg = "You're not using Internet Explorer.";
            var ver = getInternetExplorerVersion();

            if (ver > -1) {
                if (ver <= 9.0) {
                    $('.animeIconsCntr').append('<div class="centerOverlay">' + $scope.dude.user.ieNotSupported + '</div><div class="animeDiableLayer"></div>');
                    msg = "You should upgrade your copy of Internet Explorer.";
                } else {
                    msg = "You're using a recent copy of Internet Explorer.";
                }

            }
            //alert(msg);
        }
        checkVersion();

    });

}]);


mainCtrls.controller('DateYear', ['$scope', function($scope) {
    $scope.date = new Date();
}]);
