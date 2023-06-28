const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (filedNm, sort) => {
        const sortType = filedNm === sort.column ? sort.type : 'default';

        const icons = {
            default: 'fa-sort',
            asc: 'fa-arrow-down-wide-short',
            desc: 'fa-arrow-down-short-wide'
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];
        const href = Handlebars.escapeExpression(`?_sort&column=${filedNm}&type=${type}`);
        const output = `<a href="${href}"> <i class="fa-solid ${icon}"></i></a>`
        return new Handlebars.SafeString(output);
    }
}