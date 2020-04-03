import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import Loading from "../Loading";
import Header from "./Header";
import Footer from "./Footer";

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
        },
        "& tfoot td": {
            borderTop: "1px solid #cccccc !important",
            background: "#F5F5F5",
            borderBottom: "unset"
        }
    }
};

function Table({
    classes,
    items,
    paginationData,
    onPageChange,
    onPrintRow,
    headers,
    onSort
}) {
    const printRow = (item, i) => {
        if (onPrintRow) {
            return onPrintRow(item, i);
        }

        return (
            <tr>
                {headers.map((header, i) => (
                    <td key={i}>{item[header.name]}</td>
                ))}
            </tr>
        );
    };

    return (
        <div className={classes.tableWrapper}>
            <table className="table">
                <Header headers={headers} onSort={onSort} />
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
                {paginationData ? (
                    <Footer
                        colsCount={headers.length}
                        paginationData={paginationData}
                        onPageChange={onPageChange}
                    />
                ) : null}
            </table>
        </div>
    );
}

Table.propTypes = {
    headers: PropTypes.array.isRequired
};

export default withStyles(styles)(Table);
