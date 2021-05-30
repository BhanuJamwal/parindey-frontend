import { Component } from "react";
import "./NavHeader.css";
import { connect } from "react-redux";

class NavHeader extends Component{
    render() {
        return (
            <div className="header-dimension">
                <div className="d-flex flex-row justify-content-between">
                    <div className="header-logo-text-holder">
                        <div>
                            <span className="app-type-text">Parindey</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(NavHeader);