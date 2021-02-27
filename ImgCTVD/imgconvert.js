$(document).ready(function () {
    // Name of file will appear on select
    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    let imageUrl;

    // On image uploaded, check image format
    $("#image").change(function (e) {
        var file = e.target.files[0];
        // console.log(file);
        readImage(file)
    });

    function readImage(file) {
        if (file.type && file.type.indexOf('image') === -1) {
            alert("This is not an image file!!!")
            location.reload();
        }

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            imageUrl = event.target.result;
            // console.log(imageUrl)
        });
        reader.readAsDataURL(file);
    }

    $("#myForm").submit(function (e) {
        e.preventDefault();

        convertImage(imageUrl);
    });

    function convertImage(imageUrl) {
        var imageType = $("#format option:selected").text();
        if (browserImageCoverter.downloadImageWithType(imageUrl, imageType)) {
        }
    }
});
