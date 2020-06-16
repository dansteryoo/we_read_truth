

export const updateBookmark = (bookmarkData) => {
    return $.ajax({
        url: `api/bookmarks/`,
        method: 'POST',
        data: { bookmarkData }
    })
};