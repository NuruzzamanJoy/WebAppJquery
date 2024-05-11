let todos = null;
$(document).ready(function () {
    getData();
})
function getData() {
    $.ajax({
        type: 'GET',
        url: 'api/ToDoItems',
        success: function (data) {
            $('#todos').empty();
            getCount(data.length);
            $.each(data, function (key, item) {
                const checked = item.isComplete ? 'checked' : '';
                $('<tr>' + '<td><input disabled="true" type="checkbox"' + checked + '></td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.id + '</td>' +
                    '<td><button onclick="editItem(' + item.id + ')">Edit</button></td>' +
                    '<td><button onclick="deleteItem(' + item.id + ')">Delete</button></td></tr>'
                ).appendTo("#todos")
            });
            todos = data;
        }
    })
}

function getCount(data) {
    const elements = $('#counter');
    let name = 'to-do';
    if (data) {
        if (data > 1) {
            name = 'to-dos';
        }
        elements.text(data + ' ' + name);
    }
    else {
        elements.html('No ' + name)
    }
}
function addItem() {
    const item =
    {
        'name': $('#add-name').val(),
        'isComplete': false
    };
    $.ajax({
        type: 'post',
        url: 'api/ToDoItems',
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function (result) {
            getData();
            $('#add-name').val('');
        }
    })
}
function deleteItem(id) {
    $.ajax({
        type: 'delete',
        url: 'api/ToDoItems/' + id,
        success: function (result) {
            getData();
        }
    })
}
function editItem(id) {
    $.each(todos, function (key, item) {
        if (item.id == id) {
            $('#edit-id').val(item.id);
            $('#edit-name').val(item.name);
            $('#edit-isComplete')[0].checked = item.isComplete;
        }
    });
    $('#spoiler').css({ 'display': 'block' })

}

function closeInput() {
    $('#spoiler').css({ 'display': 'none' })
}
$('.myForm').on('submit', function () {
    const item = {
        'name': $('#edit-name').val(),
        'isComplete': $('#edit-isComplete').is(':checked'),
        'id': $('#edit-id').val()
    };
    $
    $.ajax({
        type: 'put',
        url: 'api/ToDoItems/' + $('#edit-id').val(),
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }

    });
    closeInput();
    return false;
})
