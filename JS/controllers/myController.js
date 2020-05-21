(function(){
  app.controller('MyController', myController);

  myController.$inject =[
    '$scope',
    'regions',
    'countryList',
    'statesList'
  ]

  function myController(
    $scope,
    regions,
    countryList,
    statesList
  ){
    $scope.myArray = [
      { name: 'item1' },
      { name: 'item2' }
    ];
  
    $scope.myArray2 = [
      { name: 'item1' },
      { name: 'item2' }
    ];
  
    $scope.newArray3 = {};
    $scope.newArray3.blah = [];
  
    $scope.newArray = [];
    $scope.statesNewArray = [];
    $scope.states1 = [];
    $scope.groupArray = [
      {
        groupName: "blah1",
        suites: [{
          name: "suite1"
        }, {
          name: "suite2"
        }]
      }, {
        groupName: "blah2",
        suites: [{
          name: "suite1blah2"
        }, {
          name: "suite2blah2"
        }]
      }
    ]
    $scope.finalStatesArray = [];
    $scope.newRegions = [];
    $scope.regions = regions;
    $scope.selected = '';
    
    $scope.generateArray = function () {
      $scope.finalStatesArray = [];
      if ($scope.statesNewArray && $scope.statesNewArray.length) {
        angular.forEach($scope.statesNewArray, function (item, index) {
          if (item.states && item.states.length) {
            var i = 0;
            angular.forEach(item.states, function (data, i) {
              if ($scope.finalStatesArray.findIndex(x => x.name == data.name)) {
                $scope.finalStatesArray.push(data);
              }
              i++;
            });
          }
          else {
            $scope.finalStatesArray = [];
          }
        });
      } else {
        $scope.finalStatesArray = [];
      }
  
    }
    $scope.generateArray1 = function (val) {
      $scope.finalStatesArray = [];
      if (!val) {
        $scope.fillArray($scope.statesNewArray);
      } else {
        $scope.fillArray(statesList);
      }
    }
  
    $scope.fillArray = function (inputArray) {
      if (inputArray && inputArray.length) {
        angular.forEach(inputArray, function (item, index) {
          if (item.states && item.states.length) {
            var i = 0;
            angular.forEach(item.states, function (data, i) {
              if ($scope.finalStatesArray.findIndex(x => x.name == data.name)) {
                $scope.finalStatesArray.push(data);
              }
              i++;
            });
          }
          else {
            $scope.finalStatesArray = [];
          }
        });
      } else {
        $scope.finalStatesArray = [];
      }
    }
  
    $scope.checkIfEmpty = function () {
      return $scope.statesNewArray.length === 0;
      $scope.finalStatesArray = [];
    }
  
    $scope.emptyArray = function () {
      $scope.finalStatesArray = [];
    }
    $scope.emptyNewRegions = function () {
      $scope.newRegions = [];
      $scope.selectedServiceUnitsArray = [];
      $scope.finalServiceUnitsArray = [];
      $scope.selectedSubdivisionArray = [];
      $scope.finalSubDivisionsArray = [];
      //uncheck radio buttons
      $scope.uncheckAllRadioButtons();
    }
    $scope.uncheckAllRadioButtons = function () {
      angular.forEach(regions, function (val, l) {
        document.getElementById(val.regionId).checked = false;
      });
      document.getElementById("4321").checked = false;
    }
    $scope.emptySelectedServiceUnitsArray = function () {
      $scope.selectedServiceUnitsArray = [];
      $scope.finalSubDivisionsArray = [];
      $scope.selectedSubdivisionArray = [];
    }
    $scope.emptySelectedSubdivisionArray = function () {
      $scope.selectedSubdivisionArray = [];
    }
    // angular.extend(this, $controller('myCalendarCtrl', {$scope: $scope}));
    $scope.model1 = {
      startDate: new Date(),
      endDate: new Date()
    }
    //radio button
    $scope.radioChanged = function (item) {
  
      if (item && item.regionName) {
        //disable other things
        angular.forEach(regions, function (value, index) {
          if (value) {
            if (value.regionName && value.regionName === item.regionName) {
              $scope.newRegions = [];
              value.ticked = true;
              $scope.newRegions.push(value);
              $scope.generateServiceUnits(false);
            }
            value.ticked = false;
          }
        });
        item.ticked = true;
      } else if (item && item.toLowerCase() == 'all') {
        angular.forEach(regions, function (value, index) {
          if (value) {
            $scope.newRegions = [];
            value.ticked = true;
            $scope.newRegions.push(value);
            $scope.generateServiceUnits(true);
          }
        });
      }
    };
  
    //Service UNits
    $scope.finalServiceUnitsArray = [];
    $scope.selectedServiceUnitsArray = [];
    $scope.selectedSubdivisionsArray = [];
  
    $scope.generateServiceUnits = function (val) {
      $scope.finalServiceUnitsArray=[];
      $scope.selectedServiceUnitsArray=[];
      $scope.finalSubDivisionsArray=[];
      $scope.selectedSubdivisionArray=[];
      $scope.emptySelectedServiceUnitsArray();
      if (!val) {
        $scope.fillServiceUnitsArray($scope.newRegions);
      } else {
        $scope.fillServiceUnitsArray(regions);
      }
    }
  
    $scope.fillServiceUnitsArray = function (inputArray) {
      var isRadioSelected = false;
      if (inputArray && inputArray.length) {
        //check 'all' radio button
        if (inputArray.length === regions.length) {
          document.getElementById("4321").checked = true;
          isRadioSelected = true;
        }
        angular.forEach(inputArray, function (item, index) {
          //item.selected=item.regionName;//set radio button
          if (!isRadioSelected) {
            document.getElementById(item.regionId).checked = true;
          }
          if (item.serviceUnits && item.serviceUnits.length) {
            var i = 0;
            angular.forEach(item.serviceUnits, function (data, i) {
              if (!$scope.finalServiceUnitsArray.some(x => x.serviceUnitName === data.serviceUnitName)) {
                $scope.finalServiceUnitsArray.push(data);
              }
              i++;
            });
          }
          else {
            $scope.uncheckRadioButtons();
            $scope.finalServiceUnitsArray = [];
          }
        });
      } else {
        //uncheck radio butons
        $scope.uncheckRadioButtons();
        $scope.finalServiceUnitsArray = [];
      }
      if($scope.finalServiceUnitsArray && $scope.finalServiceUnitsArray.length){
        angular.forEach($scope.finalServiceUnitsArray,function(item ,j){
         item.ticked=false;
        })
      }
    }
    $scope.uncheckRadioButtons = function () {
      angular.forEach(regions, function (reg, j) {
        document.getElementById(reg.regionId).checked = false;
      })
    }
    //sub divisions
    $scope.finalSubDivisionsArray = [];
    $scope.generateSubdivisions = function (val) {
     // $scope.finalSubDivisionsArray = [];
      if (!val) {
        $scope.fillSubdivisonArray($scope.selectedServiceUnitsArray);
      } else {
        $scope.fillSubdivisonArray($scope.finalServiceUnitsArray);
      }
    }
    $scope.fillSubdivisonArray = function (inputArray) {
      if (inputArray && inputArray.length) {
        angular.forEach(inputArray, function (item, index) {
          if (item.subDivisions && item.subDivisions.length) {
            var i = 0;
            angular.forEach(item.subDivisions, function (data, i) {
              if (!$scope.finalSubDivisionsArray.some(x => x.subDivisionName == data.subDivisionName)) {
                $scope.finalSubDivisionsArray.push(data);
              }
              i++;
            });
          }
          else {
            $scope.finalSubDivisionsArray = [];
          }
        });
      } else {
        $scope.finalSubDivisionsArray = [];
      }
  
    }
  
  
    $scope.finalData = {
      startDate: $scope.model1.startDate,
      endDate: $scope.model1.endDate,
      regionIds: [],
      serviceUnitIds: [],
      subDivisionIds: []
    }
    $scope.insertData = function () {
      // $scope.finalData.startDate=$scope.model1.startDate;
      // $scope.finalData.endDateDate=$scope.model1.endDate;
      if ($scope.newRegions && $scope.newRegions.length) {
        angular.forEach($scope.newRegions, function (reg, l) {
          if (reg.ticked) {
            if (!$scope.finalData.regionIds.length || !$scope.finalData.regionIds.includes(reg.regionId))
              $scope.finalData.regionIds.push(reg.regionId);
          }
        })
      }
      if ($scope.selectedServiceUnitsArray && $scope.selectedServiceUnitsArray.length) {
        angular.forEach($scope.selectedServiceUnitsArray, function (reg, l) {
          if (reg.ticked) {
            if (!$scope.finalData.serviceUnitIds.length || !$scope.finalData.serviceUnitIds.includes(reg.serviceUnitId))
              $scope.finalData.serviceUnitIds.push(reg.serviceUnitId);
          }
        })
      }
      if ($scope.selectedSubdivisionArray && $scope.selectedSubdivisionArray.length) {
        angular.forEach($scope.selectedSubdivisionArray, function (reg, l) {
          if (reg.ticked) {
            if (!$scope.finalData.subDivisionIds.length || !$scope.finalData.subDivisionIds.includes(reg.subDivisionId))
              $scope.finalData.subDivisionIds.push(reg.subDivisionId);
          }
        })
      }
      console.log($scope.finalData);
    }
    $scope.resetForm = function () {
  
      $scope.newRegions = [];
      $scope.selectedServiceUnitsArray = [];
      $scope.finalServiceUnitsArray = [];
      $scope.selectedSubdivisionArray = [];
      $scope.finalSubDivisionsArray = [];
      $scope.model1.startDate = new Date();
      $scope.model1.endDate = new Date();
      $scope.finalData = {
        startDate: new Date(),
        endDate: new Date(),
        regionIds: [],
        serviceUnitIds: [],
        subDivisionIds: []
      }
      // $scope.$broadcast('md-calendar-change', new Date());
      //uncheck radio buttons
      $scope.uncheckAllRadioButtons();
      angular.forEach(regions, function (val, l) {
        if (val && val.ticked) {
          val.ticked = false;
        }
      })
    }
  
    $scope.isDisabled=function(){
      if(!$scope.newRegions || !$scope.newRegions.length)
      return true;
    }
  }
}())
