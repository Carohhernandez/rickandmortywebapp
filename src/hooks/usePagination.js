import {useMemo} from "react";

export const DOTS = '...';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ totalCount, pageLimit, siblingCount = 1, currentPage }) => {
    
    const paginationRange = useMemo(() => {

        const totalPages = Math.ceil(totalCount/pageLimit);
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        };

        const leftSiblingIndex = Math.max(currentPage - 1, 1);
        const rightSiblingIndex = Math.min(currentPage + 1, totalPages);
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
      
            return [...leftRange, DOTS, totalPages];
        };

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 2 * siblingCount;
            let rightRange = range(totalPages - rightItemCount + 1, totalPages);

            return [firstPageIndex, DOTS, ...rightRange];
        };

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);

            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        };

    }, [totalCount, pageLimit, siblingCount, currentPage]);
  
    return paginationRange;
};