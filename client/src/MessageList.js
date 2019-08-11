import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_COURSES = gql`
  query {
    courses(topic: "") {
        id
        title
        author
        description
        topic
        url
    }
  }
`;


const MESSAGE_CREATED = gql`
    subscription {
        newCourseAdded {
            id
            title
            description
            url
            author
            topic
        }
    }
`;

class Messages extends React.Component {
    componentDidMount() {
        this.props.subscribeToMore({
            document: MESSAGE_CREATED,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                return {
                    courses: [
                        ...prev.courses,
                        subscriptionData.data.newCourseAdded,
                    ],
                };
            },
        });
        // console.log('Props', this.props);
    }

    render() {
        return (
            <ul>
                {this.props.courses.map(course => (
                    <li key={course.id}>{course.topic}</li>
                ))}
            </ul>
        );
    }
}

class List extends Component {
    render() {
        return (
            <Query query={GET_COURSES}>
                {({ data, loading, subscribeToMore }) => {
                    if (!data) {
                        console.log('data none')
                        return null;
                    }

                    if (loading) {
                        return <span>Loading ...</span>;
                    }

                    return (
                        <Messages
                            courses={data.courses}
                            subscribeToMore={subscribeToMore}
                        />
                    );
                }}
            </Query>
        )
    }
}

export default List;