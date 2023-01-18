$(`#submit`).on('click', function(e){
    e.preventDefault();
    if ($(`#title`).val().length < 2) {
        alert('Movie must have at least 2 characters!');
        $(`#title`).val('');
    } else {
        let movie = $(`#title`).val();
        let rating = $(`#rating`).val();

        $(`<li>${movie} - ${rating}/10 - <button class="remove">X</button></li>`).appendTo(`ul`);
            $(`.remove`).on('click', function(e){
                $(this).parent().remove();
                delete storedMovies[movie];
                localStorage.setItem('storedMovies', JSON.stringify(storedMovies));
            })
    
        storedMovies ? storedMovies[movie] = rating : storedMovies = {}; storedMovies[movie] = rating;
        localStorage.setItem('storedMovies', JSON.stringify(storedMovies));

        $(`#title`).val('');
    }
})

$('.sortZA').on("click", function () {
    let movies = $('li').get();
    movies.sort(function(a,b){
        let movieA = $(a).text().toLowerCase();
        let movieB = $(b).text().toLowerCase();

        if (movieA < movieB) return -1;
        if (movieA > movieB) return 1;
        return 0;
    })
    $.each(movies, function(i, li){
        $(`ul`).append(li);
    });
    $(this).addClass('sortAZ');
    $(this).removeClass('sortZA');
});

storedMovies = JSON.parse(localStorage.getItem('storedMovies'));
for (let movie in storedMovies){
    $(`<li>${movie} - ${storedMovies[movie]}/10 - <button class="remove">X</button></li>`).appendTo(`ul`);
        $(`.remove`).on('click', function(e){
            $(this).parent().remove();
            delete storedMovies[movie];
            localStorage.setItem('storedMovies', JSON.stringify(storedMovies));
        })
}