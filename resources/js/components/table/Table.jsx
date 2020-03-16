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

function Table({ classes, items, onPrintRow, headers, onSortBy }) {
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
        if (!onSortBy) return;

        const newHeaderToSort = headerToSort && headerToSort.header !== header;

        if (!headerToSort || newHeaderToSort) {
            setHeaderToSort({
                header,
                isDesc: false
            });
        } else {
            setHeaderToSort({ header, isDesc: !headerToSort.isDesc });
        }
    };

    const onHeaderToSortChange = () => {
        if (!headerToSort) return;

        const { header, isDesc } = headerToSort;

        onSortBy(header, isDesc);
    };

    useEffect(onHeaderToSortChange, [headerToSort]);

    const getHeaderString = header => {
        const sortingByCurrentHeader =
            headerToSort && headerToSort.header === header;

        if (sortingByCurrentHeader) {
            return headerToSort.isDesc ? `${header} sd` : `${header} s`;
        }

        return header;
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
