function add(bookImg, title, author, publisher, bookLink, date) {

    var res = "";

    // if localstorage is empty, create the first item
    if (!localStorage.getItem('count')) {
        localStorage.setItem('count', 1);
        localStorage.setItem('title1', title);
        localStorage.setItem('author1', author);
        localStorage.setItem('img1', bookImg);
        localStorage.setItem('publisher1', publisher);
        localStorage.setItem('link1', bookLink);
        localStorage.setItem('date1', date);

        alert(title + " has been added to your book list!");
    }
    else {
        // Do a for loop to verify if this item is already in localstorage
        for (i = 1; i < parseInt(localStorage.getItem('count')) + 1; i++) {
            if (title == localStorage.getItem(`title${i}`) && author == localStorage.getItem(`author${i}`)) {
                alert(title + " is already added into your book list!");
                res = true;
            }
            else {
                res = false
            }
        }
        if (!res) {
            localStorage['count'] = parseInt(localStorage.getItem('count')) + 1
            var count = localStorage.getItem('count');
            localStorage.setItem(`title${count}`, title);
            localStorage.setItem(`author${count}`, author);
            localStorage.setItem(`img${count}`, bookImg);
            localStorage.setItem(`publisher${count}`, publisher);
            localStorage.setItem(`link${count}`, bookLink);
            localStorage.setItem(`date${count}`, date);
            alert(title + " has been added to your book list!");
        }
    }
}

function remove(title, author) {
    if (confirm("Do you really want to remove " + title + "?")) {
        for (i = 1; i < parseInt(localStorage.getItem('count')) + 1; i++) {
            if (title == localStorage.getItem(`title${i}`) && author == localStorage.getItem(`author${i}`)) {
                localStorage.removeItem(`title${i}`);
                localStorage.removeItem(`author${i}`);
                localStorage.removeItem(`date${i}`);
                localStorage.removeItem(`link${i}`);
                localStorage.removeItem(`publisher${i}`);
                localStorage.removeItem(`img${i}`);
                localStorage['count'] = parseInt(localStorage.getItem('count')) - 1
                alert(title + " has been successfully removed!");
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

    var bookImg1 = "";
    var title1 = "";
    var author1 = "";
    var publisher1 = "";
    var bookLink1 = "";
    var date1 = "";

    if (!localStorage.getItem('count')) {
        document.getElementById("button").style.visibility = "hidden";
        alert("There is currently nothing in your collections!");
    }
    else {

        if (parseInt(localStorage.getItem('count')) == 0) {
            document.getElementById("text").innerHTML = "Nothing to display yet...."
        }
        else {
            document.getElementById("button").style.visibility = "visible";
            document.getElementById("text").innerHTML = "";

            var count = parseInt(localStorage.getItem('count'));

            for (i = 1; i < count + 1; i++) {

                if (localStorage.getItem(`title${i}`) != null) {
                    title1 = localStorage.getItem(`title${i}`);
                    author1 = localStorage.getItem(`author${i}`);
                    publisher1 = localStorage.getItem(`publisher${i}`);
                    bookLink1 = localStorage.getItem(`link${i}`);
                    bookImg1 = localStorage.getItem(`img${i}`);
                    date1 = localStorage.getItem(`date${i}`);
    
                    var output1 = formatOutput2(bookImg1, title1, author1, publisher1, bookLink1, date1)
    
                    // in production code, item.text should have the HTML entities escaped.
                    document.getElementById("output").innerHTML += '<div class="row">'
                        + output1
                        + '</div>';
                }
            }
        }
    }
}

function formatOutput2(bookImg, title, author, publisher, bookLink, date) {
    var htmlCard =
    `<div class="col-lg-12">
        <div class="panel panel-primary">
            <div class="panel-heading">${title}</div>
            <div class="panel-body">
                <div class="col-lg-6">
                    <img src="${bookImg}" class="img-responsive" alt="Image">
                </div>
                <div class="col-lg-6">
                    <p> <b>Author</b>: ${author} </p>
                    <p> <b>Publisher</b>: ${publisher} </p>
                    <p> <b>Published Date</b>: ${date} </p>
                </div>
            </div>
            <div class="panel-footer">
                <a target="_blank" href="${bookLink}" class="btn btn-primary">Learn More</a>
                <a href="#" class="btn btn-primary" onclick="remove(('${title}'), ('${author}'))">Remove</a>
            </div>
        </div>
    </div>`
    return htmlCard;
}