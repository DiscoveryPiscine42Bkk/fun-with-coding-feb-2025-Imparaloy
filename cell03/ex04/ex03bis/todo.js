$(document).ready(function() {
    let TodoList = [];

    function createTodo(text) {
        return $('<div>')
            .addClass('todo')
            .append(
                $('<p>').text(text),
                $('<button>')
                    .text('Delete')
                    .click(function() { remove(text); })
            );
    }

    function render() {
        $('#ft_list').empty();
        TodoList.forEach(function(element) {
            $('#ft_list').append(createTodo(element));
        });
        document.cookie = JSON.stringify(TodoList);
    }

    function newTodo() {
        let name = prompt("Name the todo.");
        if (name && name.length > 0) {
            TodoList.unshift(name);
            render();
        }
    }

    function remove(text) {
        if (confirm('Are you sure to remove.')) {
            TodoList = TodoList.filter(a => a !== text);
            render();
        }
    }

    // Event handler for new todo button
    $('#new').click(newTodo);

    // Load saved todos on page load
    let save = document.cookie;
    if (save.length > 0) {
        TodoList = JSON.parse(save);
        render();
    }
});