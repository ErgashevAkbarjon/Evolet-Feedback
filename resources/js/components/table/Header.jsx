import React, { useState, useEffect } from "react";
import withStyles from 'react-jss';


const styles = {
    sortArrow: {
        marginLeft: "5px",
        transition: "-webkit-transform 0.2s ease,transform 0.2s ease"
    },
    upArrow: {
        transform: "rotate(180deg)"
    },
    downArrow: {
        transform: "rotate(0deg)"
    }
}

function Header({ classes, headers, onSort }) {
    const [headerToSort, setHeaderToSort] = useState(null);

    const onHeaderClick = header => {
        if (!onSort) return;

        const unsortableHeader =
            header.hasOwnProperty("sortable") && !header.sortable;

        if (unsortableHeader) return;

        const newHeaderToSort =
            headerToSort && headerToSort.header.name !== header.name;

        if (!headerToSort || newHeaderToSort) {
            setHeaderToSort({
                header,
                isDesc: false
            });
        } else {
            setHeaderToSort({ header, isDesc: !headerToSort.isDesc });
        }
    };

    const makeSortQuery = (header, isDesc) => {
        let column = header.name;

        if (header.hasOwnProperty("sortColumn")) {
            column = header.sortColumn;
        }

        let sortQuery = isDesc ? "&sortByDesc=" : "&sortBy=";

        sortQuery += column;

        return sortQuery;
    };

    const onHeaderToSortChange = () => {
        if (!headerToSort) return;

        const { header, isDesc } = headerToSort;

        const sortQuery = makeSortQuery(header, isDesc);

        onSort(sortQuery);
    };

    useEffect(onHeaderToSortChange, [headerToSort]);

    const getHeader = header => {
        const sortingByCurrentHeader =
            headerToSort && headerToSort.header.name === header.name;

        if (sortingByCurrentHeader) {
            return (
                <>
                    {header.label} {getSortArrowSvg(headerToSort.isDesc)}
                </>
            );
        }

        return header.label;
    };

    const getSortArrowSvg = upDirection => {
        return (
            <svg
                viewBox="0 0 926.23699 573.74994"
                version="1.1"
                x="0px"
                y="0px"
                width="10"
                height="10"
                className={
                    classes.sortArrow +
                    " " +
                    (upDirection ? classes.upArrow : classes.downArrow)
                }
            >
                <g transform="translate(904.92214,-879.1482)">
                    <path
                        d="
                    m -673.67664,1221.6502 -231.2455,-231.24803 55.6165,
                    -55.627 c 30.5891,-30.59485 56.1806,-55.627 56.8701,-55.627 0.6894,
                    0 79.8637,78.60862 175.9427,174.68583 l 174.6892,174.6858 174.6892,
                    -174.6858 c 96.079,-96.07721 175.253196,-174.68583 175.942696,
                    -174.68583 0.6895,0 26.281,25.03215 56.8701,
                    55.627 l 55.6165,55.627 -231.245496,231.24803 c -127.185,127.1864
                    -231.5279,231.248 -231.873,231.248 -0.3451,0 -104.688,
                    -104.0616 -231.873,-231.248 z
                    "
                        fill="currentColor"
                    ></path>
                </g>
            </svg>
        );
    };

    return (
        <thead>
            <tr>
                {headers.map((header, i) => (
                    <th
                        className="unselectable-text"
                        key={i}
                        onClick={() => onHeaderClick(header)}
                    >
                        {getHeader(header)}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default withStyles(styles)(Header);
