const languageCodeArray = ['en', 'hi'];

exports.getMessage= (code = 'DEFAULT', languageCode) => {
    languageCode = languageCodeArray.indexOf(languageCode) !== -1 ? languageCode : 'en';
    let messageFile = _.defaults(require('./' + languageCode + '.json'), {});
    return messageFile[code];
};