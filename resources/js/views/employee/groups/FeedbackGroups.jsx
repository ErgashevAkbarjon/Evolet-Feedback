import React, { useState, useEffect } from "react";
import axios from "axios";
import withStyles from "react-jss";

import Loading from "../../../components/Loading";
import { ApiRoutes } from "../../../routes";
import Table from "../../../components/table/Table";
import NewGroupModal from "./NewGroupModal";
import GroupModal from "./GroupModal";
import GroupEditModal from "./GroupEditModal";
import GroupDeleteModal from "./GroupDeleteModal";
import TableTitle from "../../../components/table/Title";

const styles = {
    title: {
        color: "#707070",
        fontWeight: "400"
    },
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            background: "#f5f5f5"
        }
    }
};

function FeedbackGroups({ classes }) {
    const [feedbackGroups, setFeedbackGroups] = useState();

    const [showNewGroup, setShowNewGroup] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupToEdit, setGroupToEdit] = useState(null);
    const [groupToDelete, setGroupToDelete] = useState(null);

    const fetchGroups = () => {
        axios
            .get(ApiRoutes.feedbackGroups)
            .then(({ data }) => {
                console.log(data);
                setFeedbackGroups(data);
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const resetGroupList = () => {
        setFeedbackGroups(null);
        fetchGroups();
    };

    const onGroupAdded = () => {
        setShowNewGroup(false);
        resetGroupList();
    };

    const onGroupEdit = group => {
        setSelectedGroup(null);
        setGroupToEdit(group);
    };

    const onGroupDelete = group => {
        setSelectedGroup(null);
        setGroupToDelete(group);
    };

    const onGroupUpdated = updatedGroup => {
        setGroupToEdit(null);

        resetGroupList();

        setSelectedGroup(updatedGroup);
    };

    const onGroupDeleted = () => {
        setGroupToDelete(null);
        resetGroupList();
    };

    return feedbackGroups ? (
        <div>
            <TableTitle title="Группы">
                <div className="text-right">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowNewGroup(true)}
                    >
                        Добавить
                    </button>
                </div>
            </TableTitle>
            <div className="row">
                <div className="col-4">
                    <Table>
                        <thead>
                            <tr>
                                <th>Название</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbackGroups.map((group, i) => (
                                <tr
                                    className={classes.tableRow}
                                    key={i}
                                    onClick={() => setSelectedGroup(group)}
                                >
                                    <td>{group.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <NewGroupModal
                show={showNewGroup}
                onHide={() => setShowNewGroup(false)}
                onGroupAdded={onGroupAdded}
            />
            <GroupModal
                group={selectedGroup}
                show={selectedGroup !== null}
                onHide={() => setSelectedGroup(null)}
                onGroupEdit={onGroupEdit}
                onGroupDelete={onGroupDelete}
            />
            <GroupEditModal
                group={groupToEdit}
                show={groupToEdit !== null}
                onHide={() => setGroupToEdit(null)}
                onGroupUpdated={onGroupUpdated}
            />
            <GroupDeleteModal
                group={groupToDelete}
                show={groupToDelete !== null}
                onHide={() => setGroupToDelete(null)}
                onGroupDeleted={onGroupDeleted}
            />
        </div>
    ) : (
        <Loading />
    );
}
export default withStyles(styles)(FeedbackGroups);
