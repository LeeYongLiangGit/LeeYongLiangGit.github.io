$(document).ready(function () {

    var outputList = document.getElementById("list-output");

    // On button submit
    $("#myForm").submit(function () {

        var search = $("#books").val();

        if (search == "") {
            alert("Search field is empty! Input required!");
        }
        else {
            var book = "";
            var bookImg1 = "";
            var title1 = "";
            var author1 = "";
            var publisher1 = "";
            var bookLink1 = "";
            var date1 = "";

            var book2 = ""
            var bookImg2 = "";
            var title2 = "";
            var author2 = "";
            var publisher2 = "";
            var bookLink2 = "";
            var date2 = "";

            $("#list-output").empty();

            // Return an array of books
            $.get("https://www.googleapis.com/books/v1/volumes?q=" + search, function (response) {
                if (response.totalItems === 0) {
                    alert("No result!.. Try again")
                }
                else {
                    for (i = 0; i < response.items.length; i += 2) {
                        book = response.items[i];
                        title1 = book.volumeInfo.title;
                        author1 = book.volumeInfo.authors;
                        publisher1 = book.volumeInfo.publisher;
                        bookLink1 = book.volumeInfo.infoLink;
                        date1 = book.volumeInfo.publishedDate;
                        bookImg1 = book.volumeInfo.imageLinks.thumbnail;

                        book2 = response.items[i + 1];
                        title2 = book2.volumeInfo.title;
                        author2 = book2.volumeInfo.authors;
                        publisher2 = book2.volumeInfo.publisher;
                        bookLink2 = book2.volumeInfo.infoLink;
                        date2 = book2.volumeInfo.publishedDate;
                        bookImg2 = book2.volumeInfo.imageLinks.thumbnail 

                        var output1 = formatOutput(bookImg1, title1, author1, publisher1, bookLink1, date1)
                        var output2 = formatOutput(bookImg2, title2, author2, publisher2, bookLink2, date2)
                        // in production code, item.text should have the HTML entities escaped.
                        outputList.innerHTML += '<div class="row">' 
                             + output1
                             + output2
                             + '</div>';
                    }
                }
            });
        }
        return false;
    });

    // Nothing to display shows up when you press enter
    document.getElementById("books").addEventListener("search", function (event) { $("#list-output").empty(); outputList.innerHTML = "Nothing to display yet..."});
});

// card element formatter using es6 backticks and templates (individual card)
function formatOutput(bookImg, title, author, publisher, bookLink, date) {
    var htmlCard =
    `<div class="col-lg-6">
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
                <a href="#" class="btn btn-primary" onclick="add(('${bookImg}'), ('${title}'), ('${author}'), ('${publisher}'), ('${bookLink}'), ('${date}'))">Add to list</a>
            </div>
        </div>
    </div>`
    return htmlCard;
}
