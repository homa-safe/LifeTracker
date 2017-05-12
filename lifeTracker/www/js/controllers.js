angular.module('starter.controllers', [])


.controller('FormsTabCtrl', ['$scope', '$state', 'formListFactory', '$localStorage', function($scope, $state, formListFactory, $localStorage) {
  
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    
    $scope.items = {};
    $scope.today = formatDate(new Date());
    $scope.todayId = -1;
    var todayIndex = -1;
    
    
    formListFactory.save({token: $localStorage.get('token', -1)}, 
                function(response){
                    $scope.items = response.formsList;
                    for(var i = 0; i < $scope.items.length; i++){
                        $scope.items[i].dateFormatted = formatDate($scope.items[i].date);
                        if(formatDate($scope.items[i].date) == $scope.today){
                            todayIndex = i;
                        }
                    }
                if(todayIndex != -1){
                            $scope.todayId = $scope.items[todayIndex]._id;
                            $scope.items.splice(todayIndex, 1);
                }
                     
            },
                function(err){
                    console.log(err);
            });
    
    $scope.openForm = function (formId) {
        if(formId == -1){
            $state.go('tabs.formDetails/:formId', {formId: $scope.todayId});
        }
        else{
            $state.go('tabs.formDetails/:formId', {formId: formId});
        }
    }
    
    
}])

.controller('FormDetailsCtrl', ['$scope', '$state', 'formListDetailsFactory', 'formUpdateFactory', '$localStorage', '$stateParams', '$ionicPopup', function($scope, $state, formListDetailsFactory, formUpdateFactory, $localStorage, $stateParams, $ionicPopup) {
    
     function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    
    $scope.form = {};
    
    if($stateParams.formId == -1){
        $scope.form.date = "Today - " + formatDate(new Date());
    }
    else{
        formListDetailsFactory.save({token: $localStorage.get('token', -1), formId: $stateParams.formId}, 
            function(response){
                $scope.form.date = "";
                if(formatDate(response.formDetail.date) == formatDate(new Date())){
                    $scope.form.date = "Today - ";
                }
                $scope.form.date += formatDate(response.formDetail.date);
                $scope.form.sleep =  response.formDetail.sleep;
                $scope.form.breakfastMeal = response.formDetail.breakfastMeal;
                $scope.form.breakfastDrink = response.formDetail.breakfastDrink;
                $scope.form.lunchMeal = response.formDetail.lunchMeal;
                $scope.form.lunchDrink = response.formDetail.lunchDrink;
                $scope.form.dinnerMeal = response.formDetail.dinnerMeal;
                $scope.form.dinnerDrink = response.formDetail.dinnerDrink;
                $scope.form.snack1 =  response.formDetail.snack1;
                $scope.form.snack2 = response.formDetail.snack2;
                $scope.form.snack3 = response.formDetail.snack3;
                $scope.form.supplementary = response.formDetail.supplementary;
                $scope.form.water = response.formDetail.water;
                $scope.form.exerciseDuration = response.formDetail.exerciseDuration;
                $scope.form.exerciseExplanation = response.formDetail.exerciseExplanation;
                $scope.form.dayMood = response.formDetail.dayMood;
                $scope.form.unusualFeeling = response.formDetail.unusualFeeling;
                $scope.form.sickness = response.formDetail.sickness;
                $scope.form.comments = response.formDetail.additionalComment;
                
        },
            function(response){
                console.log(response);
        });
    }
    
    $scope.updateForm = function(form){
        formUpdateFactory.save({token: $localStorage.get('token', -1), formId: $stateParams.formId, sleep: form.sleep, breakfastMeal: form.breakfastMeal, breakfastDrink: form.breakfastDrink, lunchMeal: form.lunchMeal, lunchDrink: form.lunchDrink, dinnerMeal: form.dinnerMeal, dinnerDrink: form.dinnerDrink, snack1: form.snack1, snack2: form.snack2, snack3: form.snack3, supplementary: form.supplementary, water: form.water, exerciseDuration: form.exerciseDuration, exerciseExplanation: form.exerciseExplanation, dayMood: form.dayMood, unusualFeeling: form.unusualFeeling, sickness: form.sickness, additionalComment: form.comments},
            function(response){
                $ionicPopup.alert({
                title: 'Success!',
                content: response.resMsg
                })
        },
            function(response){
                console.log(response);
        })
    }
    
    
}])

.controller('SignUpCtrl', ['$scope', '$state', 'userRegisterFactory', '$localStorage', '$ionicPopup', function($scope, $state, userRegisterFactory, $localStorage, $ionicPopup) {

            $scope.signUp = function (user) {
                

                userRegisterFactory.save({name: user.name, username: user.username, password: user.password},
                    function(response){
                        if(response.res == 1){
                            $localStorage.store('token', response.token);
                            $state.go('tabs.forms');
                        }
                        else{
                           $ionicPopup.alert({
                            title: 'Error!',
                            content: response.resMsg
                            })
                        }
                },
                    function(err){
                        console.log(err);

                });
                
            };
        }])

.controller('SignInCtrl', ['$scope', '$state', 'userLoginFactory', '$localStorage', '$ionicPopup', function($scope, $state, userLoginFactory, $localStorage, $ionicPopup) {

            $scope.signIn = function (user) {
                

                userLoginFactory.save({username: user.username, password: user.password},
                    function(response){
                        if(response.res == 1){
                            $localStorage.store('token', response.token);
                            $state.go('tabs.forms');
                        }
                        else{
                           $ionicPopup.alert({
                            title: 'Error!',
                            content: response.resMsg
                            })
                        }
                },
                    function(err){
                        console.log(err);

                });
                
            };
        }])

.controller('ProfileCtrl', ['$scope', '$state', 'userProfileFactory', 'userPorfileUpdateFactory', '$localStorage', '$ionicPopup', function($scope, $state, userProfileFactory, userPorfileUpdateFactory, $localStorage, $ionicPopup) {
            
            $scope.user = {};
    
            userProfileFactory.save({token: $localStorage.get('token', -1)}, 
                function(response){
                    $scope.user.name = response.profileInfo.name;
                    $scope.user.gender = response.profileInfo.gender;
                    $scope.user.age = response.profileInfo.age;
                    $scope.user.marriageStatus = response.profileInfo.marriageStatus;
                    $scope.user.occupancy = response.profileInfo.occupancy;
                    $scope.user.diseases = response.profileInfo.diseases;
                    $scope.user.allergies = response.profileInfo.allergies;
                    $scope.user.specialCare = response.profileInfo.specialCare;
                    $scope.user.doctors = response.profileInfo.doctors;
                    $scope.user.emergencyRelation = response.profileInfo.emergencyRelation;
                    $scope.user.emergencyName = response.profileInfo.emergencyName;
                    $scope.user.emergencyPhone = response.profileInfo.emergencyPhone;
            },
                function(err){
                    console.log(err);
            });
    
            $scope.updateProfile = function (user) {
                
                
                if(user.age == undefined){
                    user.age = "";
                }
                if(user.emergencyPhone == undefined){
                    user.emergencyPhone = "";
                }
                userPorfileUpdateFactory.save({token: $localStorage.get('token', -1), name: user.name, gender: user.gender, age: user.age, marriageStatus: user.marriageStatus, occupancy: user.occupancy, diseases: user.diseases, allergies: user.allergies, specialCare: user.specialCare, doctors: user.doctors, emergencyRelation: user.emergencyRelation, emergencyName: user.emergencyName, emergencyPhone: user.emergencyPhone},
                    function(response){
                        if(response.res == 1){
                            $ionicPopup.alert({
                            title: 'Success!',
                            content: response.resMsg
                            })
                        }
                        else{
                           $ionicPopup.alert({
                            title: 'Error!',
                            content: response.resMsg
                            })
                        }
                },
                    function(err){
                        console.log(err);

                });
                
            };
        }])


;
