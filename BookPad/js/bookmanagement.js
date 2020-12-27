// Note: localStorage only supports strings. Use JSON.stringify() and JSON.parse().
function add(bookImg, title, author, publisher, bookLink, date) {
    var book = {title: title, author: author, publisher: publisher, bookImg: bookImg, bookLink: bookLink, date: date};
    var temp = {}

    // if localstorage is empty, create the first item. 
    if (!localStorage.getItem('count')) {
        localStorage.setItem('count', 1);
        temp[title] = book 
        localStorage.setItem('collection', JSON.stringify(temp));

        alert(title + " has been added to your book list!");
    }
    else {
        // Verify if this item is already in localstorage
        var collection = JSON.parse(localStorage.getItem('collection'));

        if (collection.hasOwnProperty(title)) {
            alert(title + " has already been added to your book list previously!");
        }
        else {
            localStorage.setItem('count', parseInt(localStorage.getItem('count')) + 1); 
            collection[title] = book;

            localStorage.setItem('collection', JSON.stringify(collection));

            alert(title + " has been added to your book list!");
        }
    }
}

function remove(title) {
    var collection = JSON.parse(localStorage.getItem('collection'));

    if (confirm("Do you really want to remove " + title + "?")) {
        for (key in collection) {
            if (title == key) {
                delete collection[key];

                localStorage.setItem('collection', JSON.stringify(collection));
                localStorage['count'] = parseInt(localStorage.getItem('count') - 1);

                alert(title + " has been successfully deleted!");
                location.reload();
            }
        }
    }
}

function Clear() {
    if (confirm("Do you really want to clear your collection?")) {
        localStorage.clear();
        alert("Collection has been emptied!");
        location.reload();
    }
}

function retrieveAll() {

    var bookImg = "";
    var title = "";
    var author = "";
    var publisher = "";
    var bookLink = "";
    var date = "";

    if (!localStorage.getItem('count')) {
        document.getElementById("button").style.visibility = "hidden";
        alert("There is currently nothing in your collections!");
    }
    else {

        if (parseInt(localStorage.getItem('count')) == 0) {
            document.getElementById("text").innerHTML = "Nothing to display yet....";
        }
        else {
            document.getElementById("button").style.visibility = "visible";
            document.getElementById("count").innerHTML += localStorage.getItem('count');
            document.getElementById("text").innerHTML = "";

            var collection = JSON.parse(localStorage.getItem('collection'));

            for (key in collection) {

                title = collection[key]["title"];
                author = collection[key]["author"];
                publisher = collection[key]["publisher"];
                bookLink = collection[key]["bookLink"];
                bookImg = collection[key]["bookImg"];
                date = collection[key]["date"];

                var output = formatOutput2(bookImg, title, author, publisher, bookLink, date);

                // in production code, item.text should have the HTML entities escaped.
                document.getElementById("output").innerHTML += output;
            }
        }
    }
}

function formatOutput2(bookImg, title, author, publisher, bookLink, date) {
    var htmlCard =
    `<div class="col-lg-6">
        <div class="panel panel-primary">
            <div class="panel-heading">${title}</div>
            <div class="panel-body">
                <div class="col-lg-4 col-sm-6">
                    <img src="${bookImg}" style="height:100px;" class="img-responsive" alt="Image">
                </div>
                <div class="col-lg-8 col-sm-6">
                    <p> <b>Author</b>: ${author} </p>
                    <p> <b>Publisher</b>: ${publisher} </p>
                    <p> <b>Published Date</b>: ${date} </p>
                </div>
            </div>
            <div class="panel-footer">
                <a target="_blank" href="${bookLink}" class="btn btn-primary">Learn More</a>
                <a href="#" class="btn btn-primary" onclick="remove('${title}')">Remove</a>
            </div>
        </div>
    </div>`
    return htmlCard;
}