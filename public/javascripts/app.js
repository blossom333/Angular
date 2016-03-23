angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){ 
    $scope.test = 'Hello world!';
    $scope.comments = [
     // {title:'Comment 1', upvotes:5},
      //{title:'Comment 2', upvotes:6},
     // {title:'Comment 3', upvotes:1},
     // {title:'Comment 4', upvotes:4},
     // {title:'Comment 5', upvotes:3}
    ];
    $scope.addComment = function() {
     // $scope.comments.push({title:$scope.formContent,upvotes:0});
     //  $scope.formContent='';
     if($scope.formContent === '') { return; }
     console.log("In addComment with "+$scope.formContent);
     $scope.create({
       title: $scope.formContent,
       upvotes: 0,
      });
      $scope.formContent = '';
    };

    $scope.getAll = function() {
        return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
    });
   };
  
   $scope.create = function(comment) {
        return $http.post('/comments', comment).success(function(data){
          $scope.comments.push(data);
      });
    };

   $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };
    $scope.FiveUpvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/FiveUpvote')
        .success(function(data){
          console.log("FiveUpvote worked");
          comment.upvotes += 5;
        });
    };

     $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };

    $scope.FiveIncrementUpvotes = function(comment) {
      $scope.FiveUpvote(comment);
    };


    $scope.getAll();

   }
]);
