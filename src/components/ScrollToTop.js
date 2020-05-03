import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
    // takes the previous prop's pathname as an argument and compares it to the current prop's pathname and if they do not match, then the window is automatically scrolled to the top of the page on every render  
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return null;
    }
}

export default withRouter(ScrollToTop);