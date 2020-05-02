
export const fetchDevoIndex = () => {
    return $.ajax({
        url: `/api/devos`,
        method: 'GET'
    })
};


export const fetchDevo = (devoId) => {
    return $.ajax({
        url: `/api/devos/${devoId}`,
        method: 'GET'
    })
};

export const fetchDevoBook = (devoBook) => {
    return $.ajax({
        url: `/api/book/?book=${devoBook}`,
        method: 'GET',
        data: devoBook
    })
};

export const fetchSearchResult = (searchKeywords, startDate, endDate) => (
    $.ajax({
        type: 'GET',
        url: `/api/search`,
        data: {
            keywords: searchKeywords,
            start_date: startDate,
            end_date: endDate
        }
    })
);