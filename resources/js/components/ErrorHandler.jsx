import React, { Component } from "react";
import CardModal from "./CardModal";

class ErrorHandler extends Component {
    constructor(props) {
        super(props);

        this.state = { hasErrorToShow: false, error: null };

        this.resetError = this.resetError.bind(this);
    }

    static getDerivedStateFromError(error) {
        return { hasErrorToShow: true, error };
    }

    resetError() {
        this.setState({ hasErrorToShow: false, error: null });
        window.history.back();
    }

    render() {
        const { hasErrorToShow } = this.state;

        if (!hasErrorToShow) return this.props.children;

        return (
            <CardModal
                title="Ошибка"
                show={hasErrorToShow}
                onHide={this.resetError}
            >
                <div className="text-center">
                    <p className="mb-3">Что-то пошло не так...</p>
                    <button
                        className="btn btn-primary rounded-pill px-4"
                        onClick={this.resetError}
                    >
                        OK
                    </button>
                </div>
            </CardModal>
        );
    }
}

export default ErrorHandler;
