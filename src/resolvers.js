// app/src/resolvers.js
const stackexchange = require('stackexchange-node');
const config = require('../config/config');

const options = {version: 2.2};
const context = new stackexchange(options);

const API_KEY = config['API_KEY'];

const resolvers = {
    Query: {
        questions: async (root, {tagged, limit, sort, score}) => {
           var result;

           await _getQuestionsByFilter(tagged, limit, sort, score).then(function (data) {
               result = data.items;
           });

           return result;
        }
    },
};

async function _getQuestionsByFilter (tagged, limit, sort, score) {
    return await _getQuestionsStackExchangeApi(tagged, limit, sort, score);
}

function _getQuestionsStackExchangeApi(tagged, limit, sort, score) {
    let filter = {
        key: API_KEY,
        pagesize: limit,
        tagged: tagged,
        sort: sort,
        score: score,
        order: 'asc'
    };

    return new Promise(function (resolve, reject) {
        context.questions.questions(filter, function (err, results) {
            if (err) throw err;
            resolve(results);
        });
    });
}

module.exports = {resolvers};