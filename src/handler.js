'use strict';
const aws = require('aws-sdk');
// const { DateTime } = require('luxon');

const hello = async (event, context) => {
    // console.log('Current Time', DateTime.local().toLocaleString(DateTime.DATETIME_FULL));
    const eventBody = JSON.parse(event.Records[0].body);

    const bucket = eventBody.Records[0].s3.bucket.name;
    const objectKey = eventBody.Records[0].s3.object.key;

    const s3 = new aws.S3({
        endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
        region: 'us-west-2',
        s3ForcePathStyle: true,
    });

    const params = {
        Bucket: bucket,
        Key: objectKey,
    };

    try {
        const data = await s3.getObject(params).promise();
        console.log('dataaa', data)
    } catch(e) {
        console.log('eeee', e)
    }

    return {
        statusCode: 200,
        message: 'Hola! This is awesome!'
    };
};

module.exports = {
    hello,
};
