import {Component} from "react";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

class ErrorBoundary extends Component{
  state = {
    error: false
  }
  
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true
    })
  }
  
  render() {
    if (this.state.error) {
      return (
        <ErrorMessage />
      )
    }
    
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object,
}

export default ErrorBoundary;