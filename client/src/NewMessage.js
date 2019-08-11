import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// const MESSAGE_CREATED = gql`
//   subscription {
//     userAdded
//   }
// `;

class Add extends Component {
    render() {
        return (
            <h1>
                Add Name
            </h1>
        )
    }
}

export default Add;