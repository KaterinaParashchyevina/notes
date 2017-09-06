var notesApp = angular.module("notesApp", ['ngStorage']);
notesApp.controller('notesController', ['$scope', '$localStorage', function ($scope, $localStorage) {
    $scope.$storage = $localStorage.$default({
        "notes": [{
            'title': 'Lorem ipsum',
            'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
            'colorNote': 'color_5',
            'categories': ['Lorem', 'ipsum'],
            'images': ['img/1.png']
        },
            {
                'title': 'Sed ut perspiciatis',
                'text': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,',
                'colorNote': 'color_2',
                'categories': ['Sed ut', 'unde'],
                'images': ['img/5.png', 'img/1.png']
            }]
    });

    var init = function () {
        $scope.notes = $localStorage["notes"];
        if (!$scope.notes) {
            $scope.notes = [];
            $localStorage.setItem("notes", JSON.stringify($scope.notes));
        } else {
            $scope.notes = $scope.$storage.notes;
        }
        return $scope.notes;
    }

    $scope.photos = ['img/1.png',
        'img/2.png',
        'img/3.png',
        'img/4.png',
        'img/5.png',
        'img/6.png',
        'img/7.png',
        'img/8.png',
        'img/9.png',
        'img/10.png',
        'img/11.png',
        'img/12.png'];

    $scope.colorNote = 'color_1';
    $scope.imgUrl = '';
    $scope.categories = [];
    $scope.images = [];

    $scope.addNote = function () {
        if ($scope.newCategory !== undefined) {
            if ($scope.newCategory)
                if ($scope.newCategory.indexOf(',') >= 0) {
                    $scope.categories = $scope.newCategory.split(',');
                } else {
                    $scope.categories[0] = $scope.newCategory;
                }
        }
        var newNote = {
            title: $scope.newNoteTitle,
            text: $scope.newNoteText,
            colorNote: $scope.colorNote,
            categories: $scope.categories,
            images: $scope.images
        }

        $scope.notes.push(newNote);

        angular.element(document.querySelector('form').reset());
        $scope.colorNote = 'color_1';
        $scope.categories = [];
        $scope.images = [];
        $scope.clearEdit();
        angular.element(document.querySelector('.collection')).find('img').removeClass('checked');
        angular.element(document.querySelector('.file_upload')).removeClass('checked');
    }

    $scope.removeNote = function (index) {
        $scope.notes.splice(index, 1);
    }

    $scope.editNote = function (index) {
        var objEdit = $scope.notes.splice(index, 1)[0];
        $scope.editTitle = objEdit.title;
        $scope.editText = objEdit.text;
        $scope.editCategory = objEdit.categories.join(',');
        $scope.editColor = objEdit.colorNote;
    }

    $scope.clearEdit = function () {
        $scope.editTitle = "";
        $scope.editText = "";
        $scope.editCategory = "";
    }

    $scope.checkImg = function (obj) {
        var element = angular.element(obj.target);
        console.log(element.attr("class"));
        if (element.attr("class") === "ng-scope checked") {
            element.removeClass("checked");
            var indexDel = $scope.images.indexOf(obj.target.attributes.src.value);
            $scope.images.splice(indexDel, 1);
        } else {
            element.addClass("checked");
            $scope.images.push(obj.target.attributes.src.value);
        }
    }


    $scope.checkFileSelect = function () {
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                $scope.images.push(e.target.result);
                angular.element(document.querySelector('.file_upload')).addClass('checked');
            }
        })(userFile.files[0]);

        reader.readAsDataURL(userFile.files[0]);
    }


    init();


}]);


