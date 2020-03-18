import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import Loading from "../Loading";

const styles = {
    tableWrapper: {
        border: "1px solid #cccccc",
        borderRadius: "5px",
        overflow: "hidden",
        marginBottom: "2rem",
        "& table": {
            marginBottom: "0px",
            color: "#707070"
        },
        "& th": {
            borderBottom: "1px solid #cccccc !important",
            borderTop: "unset",
            background: "#F5F5F5",
            fontWeight: "400",
            cursor: "pointer"
        },
        "& td": {
            border: "none",
            verticalAlign: "middle"
        }
    }
};

function Table({ classes, items, onPrintRow, headers, onSort }) {
    const [headerToSort, setHeaderToSort] = useState(null);

    const printRow = (item, i) => {
        if (onPrintRow) {
            return onPrintRow(item, i);
        }

        const values = Array.isArray(item) ? item : Object.values(item);

        return (
            <tr>
                {values.map((value, i) => (
                    <td key={i}>{value}</td>
                ))}
            </tr>
        );
    };

    const onHeaderClick = header => {
        if (!onSort) return;
        
        const unsortableHeader = header.hasOwnProperty('sortable') && !header.sortable;

        if(unsortableHeader) return;

        const newHeaderToSort = headerToSort && headerToSort.header.name !== header.name;

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

        if(header.hasOwnProperty('sortColumn')){
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

    const getHeaderString = header => {
        const sortingByCurrentHeader =
            headerToSort && headerToSort.header.name === header.name;

        if (sortingByCurrentHeader) {
            return headerToSort.isDesc ? `${header.label} sd` : `${header.label} s`;
        }

        return header.label;
    };

    return (
        <div className={classes.tableWrapper}>
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th
                                className="unselectable-text"
                                key={i}
                                onClick={() => onHeaderClick(header)}
                            >
                                {getHeaderString(header)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(items) ? (
                        items.map(printRow)
                    ) : (
                        <tr>
                            <td colSpan={headers.length}>
                                <Loading />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    headers: PropTypes.array.isRequired
};

export default withStyles(styles)(Table);
