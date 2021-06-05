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

2. Using docker run command

```
docker run --rm -it -p 4566:4566 -p 4571:4571 -v /data/tmp:-/tmp/localstack:/tmp/localstack -v /var/run/docker.sock:/var/run/docker.sock -e SERVICES=s3,lambda,iam,sqs,cloudformation,sts,ssm -e DEBUG=1 -e DATA_DIR=/data -e LAMBDA_EXECUTOR=docker -e DOCKER_HOST=unix:///var/run/docker.sock --name my_localstack localstack/localstack
```

