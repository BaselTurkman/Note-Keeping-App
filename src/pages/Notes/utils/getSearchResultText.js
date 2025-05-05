export function getSearchResultText(resultsCount) {
    return `${resultsCount} result${resultsCount !== 1 ? "s" : ""} found`;
}