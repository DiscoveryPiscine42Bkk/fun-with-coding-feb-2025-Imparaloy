$(document).ready(function () {
    let TodoList = [];

    function createTodo(text) {
        let $todo = $('<div class="todo"></div>')
            .append(`<p>${text}</p>`)
            .append('<button class="delete">Delete</button>')
            .data('text', text);

        return $todo;
    }

    function render() {
        $('#ft_list').empty();
        TodoList.forEach(item => {
            $('#ft_list').append(createTodo(item));
        });
    }

    function saveCookies() {
        document.cookie = `todos=${encodeURIComponent(JSON.stringify(TodoList))}; path=/`;
    }

    function loadCookies() {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(row => row.startsWith('todos='));
        if (todoCookie) {
            try {
                TodoList = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
            } catch (e) {
                TodoList = [];
            }
        }
    }

    $('#newTodo').on('click', function () {
        let name = prompt("Name the todo.");
        if (name && name.trim().length > 0) {
            TodoList.unshift(name.trim());
            saveCookies();
            render();
        }
    });

    $('#ft_list').on('click', '.delete', function () {
        let text = $(this).parent().data('text');
        if (confirm('Are you sure to remove?')) {
            TodoList = TodoList.filter(item => item !== text);
            saveCookies();
            render();
        }
    });

    // Initialize on page load
    loadCookies();
    render();
});