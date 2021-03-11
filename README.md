# Chaos Chimp

##### A concept built from the ideas of the Netflix Simian Army

## Prerequisites

- Basic experience with AWS (EC2, Lambda, IAM).
- A [simple EC2 autoscaling group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-launch-template.html).
- A **Node.js 14.x** lambda function created with ‘*Author from scratch*’.
- Modifications made to the role of the previously created lambda function (adding **AmazonEC2FullAccess** and **AutoScalingFullAccess**).
- A [CloudWatch Event Rule](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html#schedule-create-rule) that runs the lambda every minute.

## Deployment

Input the code from *index.js* into the main Lambda body, replacing the variable contents with the relevent information as per your environment.

## Further Reading

https://netflixtechblog.com/5-lessons-weve-learned-using-aws-1f2a28588e4c

https://netflixtechblog.com/the-netflix-simian-army-16e57fbab116

