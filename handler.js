'use strict';

module.exports.hello = async (event, context) => {
    console.log('event', event, context)
    return {
        statusCode: 200,
        message: 'Hola! This is awesome!'
    };
};
