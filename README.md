# aws-offline
Use AWS services offline using localstack (tested on Unix)

<h2>Main flow covered</h2>

<img src="https://user-images.githubusercontent.com/6856894/120879674-b54dfd00-c5e2-11eb-9197-a714455eec24.png" width="400" />
<br />
<br />
There are two ways to run the offline services:

1. Using docker-compose.yml
```
TMPDIR=/private$TMPDIR docker-compose up
```
Can check how the compose.yml looks like when it runs

```
docker-compose config
```

2. Using docker run command

```
docker run --rm -it -p 4566:4566 -p 4571:4571 -v /private/tmp/localstack:/tmp/localstack -v /var/run/docker.sock:/var/run/docker.sock -e SERVICES=s3,lambda,iam,sqs,cloudformation,sts,ssm -e DEBUG=1 -e  DATA_DIR=/data -e LAMBDA_EXECUTOR=docker -e DOCKER_HOST=unix:///var/run/docker.sock --name my_localstack  localstack/localstack
```

Once the localstack up and running, can confirm all required AWS services are running

```
http://localhost:4566/health
```

How to deploy locally

```
SLS_DEBUG=* sls deploy --stage local
```

How to deploy AWS

```
SLS_DEBUG=* sls deploy -v --stage dev
```

How validate each services taken placed. Execute the following commands from command line tool

S3:
```
#List all buckets:
aws --endpoint-url=http://localhost:4566 s3 ls --region=us-west-2
#List resources inside a bucket:
aws --endpoint-url=http://localhost:4566 s3 ls s3://local-dilum-home-images --region=us-west-2 
```

SQS:
```
#Get queue URL:
aws --endpoint-url=http://localhost:4566 sqs get-queue-url --queue-name 'local-home-workerQueue' --region us-west-2
#Get items in the Queue:
aws --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/local-home-workerQueue --region us-west-2

```

SQS Dead letter Queue:
```
#Get queue URL:
aws --endpoint-url=http://localhost:4566 sqs get-queue-url --queue-name 'local-home-workerDlq' --region us-west-2
#Get items in the Queue:
aws --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/local-home-workerDlq --region us-west-2
```

Lambda:
```
aws --endpoint-url=http://localhost:4566 lambda list-functions --region=us-west-2
```

All the available command from AWS should works:
[link](https://docs.aws.amazon.com/cli/latest/index.html)