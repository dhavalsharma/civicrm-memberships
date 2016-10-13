(function(angular, $, _) {

  angular.module('memberships').config(function($routeProvider) {
      $routeProvider.when('/listmemberships', {
        controller: 'MembershipsListMembershipsCtrl',
        templateUrl: '~/memberships/ListMembershipsCtrl.html',

        // If you need to look up data when opening the page, list it out
        // under "resolve".
        resolve: {
          myContact: function(crmApi) {
            return crmApi('Contact', 'getsingle', {
              id: 'user_contact_id',
              return: ['first_name', 'last_name']
            });
          },
          allMemberships: function(crmApi){
            return crmApi('Membership', 'get', {
                  sequential: 1
                });            
          }
        }
      });
    }
  );

  // The controller uses *injection*. This default injects a few things:
  //   $scope -- This is the set of variables shared between JS and HTML.
  //   crmApi, crmStatus, crmUiHelp -- These are services provided by civicrm-core.
  //   myContact -- The current contact, defined above in config().
  angular.module('memberships').controller('MembershipsListMembershipsCtrl', 
    function($scope, crmApi, crmStatus, crmUiHelp, allMemberships) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('memberships');
    // See: templates/CRM/memberships/ListMembershipsCtrl.hlp
    var hs = $scope.hs = crmUiHelp({file: 'CRM/memberships/ListMembershipsCtrl'}); 

    //all memberships data
    $scope.allMemberships = allMemberships;
    //filter dates
    $scope.filterdates = {};
/*
    // We have myContact available in JS. We also want to reference it in HTML.
    $scope.myContact = myContact;
    $scope.save = function save() {
      return crmStatus(
        // Status messages. For defaults, just use "{}"
        {start: ts('Saving...'), success: ts('Saved')},
        // The save action. Note that crmApi() returns a promise.
        crmApi('Contact', 'create', {
          id: myContact.id,
          first_name: myContact.first_name,
          last_name: myContact.last_name
        })
      );
    };

    $scope.filterDateRange = function(filterdates){
      return function(value){
        return compareDate(value, filterdates.start, filterdates.end);
        function compareDate(value, start, end){
          console.log(value, start, end);
          if(!start && !end){
            return true;
          }
          var valuestartts, valueendts,startts,endts;
          
          valuestartts = new Date(value.start_date);
          valuestartts = valuestartts.getTime();
          if(value.end_date){
            valueendts = new Date(value.end_date);
            valueendts = valueendts.getTime();           
          }
          else{
            valueendts = Infinity;//for lifetime
          }
          if(start){
            startts = new Date(start);
            startts = startts.getTime();
          }
          else{
            startts = -Infinity;
          }
          if(end){
            endts = new Date(end);
            endts = endts.getTime();
          }
          else{
            endts = Infinity;
          }

          if(valuestartts >= startts && valueendts <= endts){
            return true;
          }
          return false;
        }
      }
    }
*/
  });

  //filter to check if dates in array are in range
  angular.module('memberships').filter('dateRange', function(){
    return function(array, filterdates){
      var start = filterdates.start;
      var end = filterdates.end;
      var retarray = array.filter(compareDate);
      return retarray;

      //helper function to get date in range
      function compareDate(value){
        if(!start && !end){
          return true;
        }
        var valuestartts, valueendts,startts,endts;
        
        valuestartts = new Date(value.start_date);
        valuestartts = valuestartts.getTime();
        if(value.end_date){
          valueendts = new Date(value.end_date);
          valueendts = valueendts.getTime();           
        }
        else{
          valueendts = Infinity;//for lifetime
        }
        if(start){
          startts = new Date(start);
          startts = startts.getTime();
        }
        else{
          startts = -Infinity;
        }
        if(end){
          endts = new Date(end);
          endts = endts.getTime();
        }
        else{
          endts = Infinity;
        }

        if(valuestartts >= startts && valueendts <= endts){
          return true;
        }
        return false;
      }
      
    }
  });

})(angular, CRM.$, CRM._);
