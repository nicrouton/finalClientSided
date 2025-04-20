export function fetchWhichMovies() {
    let which_movies_local = localStorage.getItem("which_movies_local")
    if (which_movies_local) {
        return which_movies_local
    }
    else {
        return "top_rated"
    }
}

export function storeWhichMovies(data) {
    localStorage.setItem("which_movies_local", data)
}

export function fetchSortedBy() {
    let sorted_by_local = localStorage.getItem("sorted_by_local")
    if (sorted_by_local) {
        return sorted_by_local
    }
    else {
        return "default"
    }
}

export function storeSortedBy(data) {
    localStorage.setItem("sorted_by_local", data)
}

export function fetchLanguage() {
    let language_local = localStorage.getItem("language_local")
    if (language_local) {
        return language_local
    }
    else {
        return "en-US"
    }
}


export function fetchInput() {
    let input_local = localStorage.getItem("input_local")
    if (input_local) {
        return input_local
    }
    else {
        return ""
    }
}

export function storeInput(data) {
    localStorage.setItem("input_local", data)
}

export function fetchGenre() {
    let genre_local = localStorage.getItem("genre_local")
    if (genre_local) {
        return genre_local
    }
    else {
        return "all"
    }
}

export function storeGenre(data) {
    localStorage.setItem("genre_local", data)
}

localStorage.removeItem("which_movies")
localStorage.removeItem("sorted_by")
localStorage.removeItem("input")
localStorage.removeItem("genre")