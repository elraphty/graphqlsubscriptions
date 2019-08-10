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
const root = {
    course: ({ id }) => {
        return courseData.filter(course => {
            return course.id === id;
        })[0];
    },
    courses: ({ topic }) => {
        if (topic !== '') {
            console.log('Topic', topic);
            return courseData.filter(course => course.topic === topic);
        } else {
            return courseData;
        }
    },
    updateCourseTopic: ({ id, topic }) => {
        courseData.map(course => {
            if(course.id === id) {
                course.topic = topic;
                return topic;
            }
        });

        return courseData.filter(course => course.id === id)[0];
    }
};

module.exports = root;