import React from "react";
import withStyles from "react-jss";

import CardModal from "../../../components/CardModal";

const styles = {
    actionsWrapper: {
        "& button": {
            borderRadius: "50px",
            padding: "5px 15px"
        }
    }
};

function EmployeeModal({ classes, employee, show, onHide, onEdit, onDelete }) {
    return employee ? (
        <CardModal title="Сотрудник" show={show} onHide={onHide}>
            <div className="text-center" style={{ color: "#707070" }}>
                <img
                    src={employee.avatar}
                    style={{ height: "115px" }}
                    className="rounded-circle mb-2"
                />
                <h5>{employee.user.full_name}</h5>
                <p>{employee.user.email}</p>
                <div className="row justify-content-center mb-5">
                    <div className="col-7">
                        {employee.groups.length
                            ? employee.groups.map((group, i) => (
                                  <span
                                      className="badge badge-pill badge-secondary mr-2"
                                      key={i}
                                  >
                                      {group.name}
                                  </span>
                              ))
                            : "Не состоит ни в одной группе."}
                    </div>
                </div>
                <div className={classes.actionsWrapper}>
                    <button
                        className="btn btn-danger mr-3"
                        onClick={() => onDelete(employee)}
                    >
                        Удалить
                    </button>
                    <button
                        className="btn btn-success mr-3"
                        onClick={() => onEdit(employee)}
                    >
                        Изменить
                    </button>
                    <button
                        className="btn btn-primary rounded-pill"
                        onClick={onHide}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </CardModal>
    ) : null;
}

export default withStyles(styles)(EmployeeModal);
