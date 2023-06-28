const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
class NewsController {
    // [GET] /news
    index(req, res, next) {

        Course.find({})
            .then(courses => {
                //cách viết trực tiếp xủ lý đối tượng thành object để truy cập ở view
                // courses = courses.map(course => course.toObject())
                //c2 viết thông qua 1 hàm 
                res.render('news', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);

        // res.render('news');
    }

    detail(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('new-details', {
                    course: mongooseToObject(course)
                });
            })
            .catch(next)

    }
    create(req, res, next) {
        res.render('new-create');
    }

    store(req, res, next) {
        req.body.image = "https://files.fullstack.edu.vn/f8-prod/blog_posts/107/613a1f3685814.png";
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);

    }
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render('new-edit', {
                    course: mongooseToObject(course)
                });
            })
            .catch(next);
    }

    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    delete(req, res, next) {
        //Xoa theo cach binh thuong cuar Express
        // Course.deleteOne({ _id: req.params.id })
        //     .then(() => res.redirect('back'))
        //     .catch(next);

        //Xoa theo thu vien mongoose-delete
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    handleform(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.chkcourseId } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!' });
        }

    }
}

module.exports = new NewsController