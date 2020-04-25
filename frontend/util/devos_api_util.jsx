export const fetchDevos = () => (
    $.ajax({
        url: `/api/devos`,
        method: 'GET'
    })
);

export const fetchDevo = (devoId) => (
    $.ajax({
        url: `/api/devos/${devoId}`,
        method: 'GET'
    })
);

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