var React = require('react');

class HelloWorld extends React.Component {
    render() {
        return <div> Hello {this.props.thing}</div>;
    }
}

module.exports = HelloWorld;