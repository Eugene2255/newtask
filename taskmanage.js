function Task(name) {
    this.name = ko.observable(name);
    this.isComplete = ko.observable(false);
}

function TaskViewModel() {
    var self = this;

    // Observable to track the input value
    self.newTask = ko.observable('');

    // Observable array to store tasks
    self.tasks = ko.observableArray([]);

    // Function to add a new task
    self.addTask = function () {
        if (self.newTask().trim() !== '') {
            self.tasks.push(new Task(self.newTask()));
            self.newTask('');  // Clear input field after adding
        }
    };

    // Function to delete a task
    self.deleteTask = function (task) {
        self.tasks.remove(task);
    };

    // Computed observable to count completed tasks
    self.completedCount = ko.computed(function () {
        return ko.utils.arrayFilter(self.tasks(), function (task) {
            return task.isComplete();
        }).length;
    });

    // Computed observable to count pending tasks
    self.pendingCount = ko.computed(function () {
        return self.tasks().length - self.completedCount();
    });
}

// Apply Knockout bindings
document.addEventListener("DOMContentLoaded", function() {
    ko.applyBindings(new TaskViewModel());
});

