export const searchRegexMatch = (search) => {
    const input = Array.from(search).reduce(
        (a, v, i) => `${a}[^${search.substring(i)}]*?${v}`,
        ''
    );
    return new RegExp(input);
};


export const setPayload = (data) => {
    let payload;
    if (!data) return

    if (data.book.includes("&")) {
        payload = {
            gender: data.gender,
            book: data.book.replace("&", "%26")
        }
    } else {
        payload = {
            gender: data.gender,
            book: data.book
        }
    }

    return payload
}

export const sortTitles = (data, bibleBooks) => {
    const lowerCaseArr = bibleBooks.map(ele => ele.toLowerCase());
    return data
        .sort((a, b) => lowerCaseArr.indexOf(a.book) - lowerCaseArr.indexOf(b.book))
        .map(ele => ele)
};

export const sortAlphabetically = (data) => {
    return data
        .sort((a, b) => a.book < b.book ? -1 : 1)
        .map(ele => ele)
};