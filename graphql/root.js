const { PubSub } = require('apollo-server-express');

const ADDED = 'added';
const pubsub = new PubSub();
// exports.pubsub = pubsub;

// pubsub.asyncIterator(ADDED);

// pubsub.asyncIterator(ADDED);

// Including Mongoose Models 
let courseData = [
    {
        id: 1,
        title: 'Complete Javascript course',
        author: 'Raphael Osaze',
        description: 'This course talks about javascript',
        topic: 'Javascript',
        url: 'https/google.com'
    },
    {
        id: 2,
        title: 'Complete Php course',
        author: 'Raphael Osaze Eyerin',
        description: 'This course talks about php',
        topic: 'Php',
        url: 'https/google.com'
    }
];

pubsub.asyncIterator(ADDED)

const root = {
    Query: {
        course: (root, { id }) => {
            return courseData.filter(course => {
                return course.id === id;
            })[0];
        },
        courses: (root, { topic }) => {
            if (topic !== '') {
                // console.log('Topic', topic);
                return courseData.filter(course => course.topic === topic);
            } else {
                return courseData;
            }
        },
    },
    Mutation: {
        updateCourseTopic: (root, { id, topic }) => {
            courseData.map(course => {
                if (course.id === id) {
                    course.title = topic;
                    return topic;
                }
            });

            return courseData.filter(course => course.id === id)[0];
        },
        addCourse: (root, { input }) => {
            courseData.unshift(input);
            return true;
        },
        newCourseAdded: (root, { course }) => {
            // pubsub.publish(ADDED)
            pubsub.publish(ADDED, { entry: course });
            return course;
        }
    },
    Subscription: {
        newCourseAdded: {
            resolve: (message) => {
                console.log('message', message.entry);
                return message.entry;
            },
            subscribe: () => pubsub.asyncIterator(ADDED)
        }
    }
};

module.exports = root;