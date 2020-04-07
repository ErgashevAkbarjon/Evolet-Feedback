import React, { useState } from "react";
import CardModal from "./CardModal";

const AuthContext = React.createContext();
export default AuthContext;

const ADMIN_ROLE = 1;
const EMPLOYEE_ROLE = 2;
const CUSTOMER_ROLE = 3;

const UNAUTORIZE_CODE = 401;
const FORBIDDEN_CODE = 403;

export function AuthContextProvider(props) {
    const [auth, setAuth] = useState(null);
    const [requestForbidden, setRequestForbidden] = useState(false);

    const noitazb = localStorage.getItem("noitazb");

    const resetAuth = () => {
        localStorage.setItem("noitazb", null);
        setAuth(null);
    };

    const applyBearer = bearer => {
        if (!bearer || bearer === "null") return;

        localStorage.setItem("noitazb", bearer);

        window.axios.defaults.headers.common["Authorization"] =
            "Bearer " + bearer;

        setAuth(bearer);
    };

    const getUser = () => {
        if (!auth) return null;

        const jwtPayload = parseJwt(auth);
        return jwtPayload.sub[0];
    };

    const getUserRoles = () => {
        if (!auth) return [];

        const userRoles = getUser().roles;
        return userRoles.map(r => r.id);
    };

    const authIsAdmin = () => {
        if (!auth) return;

        return getUserRoles().includes(ADMIN_ROLE);
    };

    const authIsEmployee = () => {
        if (!auth) return;

        return getUserRoles().includes(EMPLOYEE_ROLE) || authIsAdmin();
    };

    const authIsCustomer = () => {
        if (!auth) return;

        return getUserRoles().includes(CUSTOMER_ROLE);
    };

    const movePaginatorToResponseBody = response => {
        const {data} = response;

        response.pagination = {
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            perPage: data.perPage,
        };
        response.data = data.data;

        return response;
    };

    const processPaginatedResponse = response => {

        const {data} = response;

        const responseHasPaginator = 
            data.hasOwnProperty('currentPage') &&
            data.hasOwnProperty('totalPages') &&
            data.hasOwnProperty('data');

        if(responseHasPaginator){
            response = movePaginatorToResponseBody(response);
        }
        
        return response;
    };

    window.axios.interceptors.response.use(
        response => processPaginatedResponse(response),
        error => {
            const unAutorized = error.response.status === UNAUTORIZE_CODE;
            const forbidden = error.response.status === FORBIDDEN_CODE;

            if (forbidden) {
                setRequestForbidden(true);
            }

            if (unAutorized) {
                resetAuth();
            }

            return Promise.reject(error);
        }
    );

    if (noitazb && noitazb !== "null" && auth === null) {
        window.axios.defaults.headers.common["Authorization"] =
            "Bearer " + noitazb;
        setAuth(noitazb);
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                resetAuth,
                applyBearer,
                getUser,
                authIsAdmin,
                authIsEmployee,
                authIsCustomer
            }}
        >
            {props.children}
            <CardModal
                title="Нет доступа"
                show={requestForbidden}
                onHide={() => setRequestForbidden(false)}
            >
                <p className="text-center">
                    У вас нет доступа, обратитесь к администратору.
                </p>
                <div className="text-center">
                    <button
                        className="btn btn-primary rounded-pill px-4"
                        onClick={() => setRequestForbidden(false)}
                    >
                        OK
                    </button>
                </div>
            </CardModal>
        </AuthContext.Provider>
    );
}
