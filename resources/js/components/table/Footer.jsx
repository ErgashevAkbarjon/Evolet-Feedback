import React, { useState } from "react";

const FIRST_PAGE = 1;

const ROW_PER_PAGE_VARIANTS = [
    { label: 8, value: 8 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 50, value: 50 },
    { label: "Все", value: "all" }
];

function Footer({ colsCount, paginationData, onPageChange }) {
    let { currentPage, totalPages, perPage } = paginationData;

    const [pageToGo, setPageToGo] = useState(currentPage);

    const isFirstPage = currentPage <= FIRST_PAGE;
    const isLastPage = currentPage >= totalPages;

    const perPageVariants = ROW_PER_PAGE_VARIANTS;

    const perPageVariant = perPageVariants.find(
        v => parseInt(v.value) == perPage
    );

    if (!perPageVariant) {
        perPage = perPageVariants.find(v => v.value == "all").value;
    }

    const onNextPageClick = () => {
        if (!onPageChange) return;

        let nextPage = isLastPage ? currentPage : parseInt(currentPage) + 1;

        if (pageToGo > currentPage && pageToGo <= totalPages) {
            nextPage = pageToGo;
        }

        onPageChange(nextPage, perPage);
    };

    const onPrevPageClick = () => {
        if (!onPageChange) return;

        let prevPage = isFirstPage ? currentPage : parseInt(currentPage) - 1;

        if (pageToGo < currentPage && pageToGo >= FIRST_PAGE) {
            prevPage = pageToGo;
        }

        onPageChange(prevPage, perPage);
    };

    const onCurrentPageChange = ({ target }) => {
        if (target.value < FIRST_PAGE || target.value > totalPages) return;
        setPageToGo(target.value);
    };

    const rowsPerPageChanged = ({ target }) => {
        onPageChange(currentPage, target.value);
    };

    let pageButtonClasses =
        "btn btn-outline-secondary rounded-pill btn-sm px-3";

    return (
        <tfoot>
            <tr>
                <td colSpan={colsCount}>
                    <div className="form-inline justify-content-end">
                        <label
                            className="my-1 mr-2 unselectable-text"
                            htmlFor="rows-per-page-selector"
                        >
                            Кол-во элементов на странице:
                        </label>
                        <select
                            className="form-control h-auto mr-5 p-0"
                            id="rows-per-page-selector"
                            onChange={rowsPerPageChanged}
                            value={perPage}
                        >
                            {perPageVariants.map((v, i) => (
                                <option value={v.value} key={i}>
                                    {v.label}
                                </option>
                            ))}
                        </select>

                        <button
                            className={pageButtonClasses + " mr-3"}
                            disabled={isFirstPage}
                            onClick={onPrevPageClick}
                            type="button"
                        >
                            {"<"}
                        </button>

                        <span className="unselectable-text form-inline">
                            <span>
                                <input
                                    className="form-control h-auto p-0"
                                    type="number"
                                    value={pageToGo}
                                    onChange={onCurrentPageChange}
                                    style={{width: "40px"}}
                                />
                                {" из " + totalPages}
                            </span>
                        </span>

                        <button
                            className={pageButtonClasses + " ml-3"}
                            disabled={isLastPage}
                            onClick={onNextPageClick}
                            type="button"
                        >
                            {">"}
                        </button>
                    </div>
                </td>
            </tr>
        </tfoot>
    );
}

export default Footer;
