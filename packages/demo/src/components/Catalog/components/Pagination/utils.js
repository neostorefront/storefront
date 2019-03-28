export const getLeadTile = (currentPage, totalPages, tileBuffer) => {
    const selectedTile = currentPage;
    const leftBound = 1 + tileBuffer;
    const rightBound = totalPages - tileBuffer;

    let leadTile = selectedTile - tileBuffer;

    if (selectedTile < leftBound) {
        leadTile = 1;
    } else if (selectedTile > rightBound) {
        leadTile = Math.max(totalPages - tileBuffer * 2, 1);
    }

    return leadTile;
};
