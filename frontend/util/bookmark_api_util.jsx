

export const updateBookmark = (bookmark) => {
    return $.ajax({
        url: `api/bookmarks/`,
        method: 'PATCH',
        data: { bookmark }
    })
};