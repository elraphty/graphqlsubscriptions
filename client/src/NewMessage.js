import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// {
//     id: 8,
//     title: "test",
//     url: "/test",
//     description: "test",
//     author: "raphael",
//     topic: "Test"
// })

const CREATE_COMMENTS = gql`
    mutation add($course: newCourse!) {
        newCourseAdded(course: $course) {
            id
            title
            author
            description
            topic
            url
        }
    }
`;

class Add extends Component {
    render() {
        return (
            <Mutation mutation={CREATE_COMMENTS}>
                {(newCourseAdded) => {
                    const onSubmit = (event) => {
                        event.preventDefault();

                        const id = event.target.id.value;
                        if (!id) return;

                        const course = {
                            id: parseInt(event.target.id.value),
                            topic: event.target.topic.value,
                            author: event.target.author.value,
                            url: event.target.url.value,
                            description: event.target.description.value
                        };

                        newCourseAdded({ variables: { course } });

                        event.target.id.value = '';
                        event.target.topic.value = '';
                        event.target.author.value = '';
                        event.target.url.value = '';
                        event.target.description.value = '';
                    };
                    return (
                        <form onSubmit={onSubmit}>
                            <input name="id" placeholder="ID" />
                            <br />
                            <input name="title" placeholder="Title" />
                            <br />
                            <input name="author" placeholder="Author" />
                            <br />
                            <input name="topic" placeholder="Topic" />
                            <br />
                            <input name="url" placeholder="Url" />
                            <br />
                            <input name="description" placeholder="Description" />
                            <br />
                            <button type="submit">Send</button>
                        </form>
                    );
                }}
            </Mutation>
        )
    }
}

export default Add;