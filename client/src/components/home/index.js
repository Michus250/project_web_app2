import React from "react";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: null };
    }

    componentDidMount() {
        fetch('/home')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ data })
                
    });
            }

    render() {
        return (
            <div>
                <h1>My Data</h1>
                {this.state.data && <p>{this.state.data.msg}</p>}
            </div>
        );
    }
}
export default Home;