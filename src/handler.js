'use strict';
const aws = require('aws-sdk');

const hello = async (event, context) => {
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

    // Dynamodb
    const dynamodb = new aws.DynamoDB({
        endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
        region: 'us-west-2',
    });

    try {
        const data = await s3.getObject(params).promise();

        await dynamodb.putItem(
            {
                'TableName': 'local-home-images',
                'Item': {
                    'image': { 'S': objectKey },
                }
            }
        ).promise();

        // Read image from bucket
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
