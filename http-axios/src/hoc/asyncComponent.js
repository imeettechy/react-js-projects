import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {

        state = {
            component : null
        }

        componentDidMount () {
            console.log('Starting to load component...');
            importComponent()
                .then(cmp => {
                    console.log('Component loaded');
                    this.setState({component : cmp.default});
                })
                .catch(error => {
                    console.error('Error loading component:', error);
                });
        }

        render() {
            const M = this.state.component;

            return M ? <M {...this.props} /> : <p>Loading...</p>;
        }
    }
}

export default asyncComponent;