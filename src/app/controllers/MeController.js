const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /news
    storedCourses(req, res, next) {

        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
        // Course.find({})
        //     .then(courses => {
        //         //cách viết trực tiếp xủ lý đối tượng thành object để truy cập ở view
        //         // courses = courses.map(course => course.toObject())
        //         //c2 viết thông qua 1 hàm 
        //         res.render('me/stored-courses', {
        //             courses: mutipleMongooseToObject(courses)
        //         });
        //     })
        //     .catch(next)

    }
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                //cách viết trực tiếp xủ lý đối tượng thành object để truy cập ở view
                // courses = courses.map(course => course.toObject())
                //c2 viết thông qua 1 hàm 
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next)
    }


}

module.exports = new MeController