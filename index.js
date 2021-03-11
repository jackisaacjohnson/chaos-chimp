var autoScalingGroupName = "TestAutoScalingGroup";
var awsRegion = "eu-west-1";

const AWS = require('aws-sdk');
AWS.config.update({region:awsRegion});
AWS.config.apiVersions = {
  autoscaling: '2011-01-01',
  ec2: '2016-11-15'
};

const autoscaling = new AWS.AutoScaling();
const ec2 = new AWS.EC2();

exports.handler = (event, context, callback) => {
    var min = 1;
    var max = 6;    
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (randomNumber === 5) {
	    var message = "(" + randomNumber + ") You've hit on a quincunx, choosing an instance to terminate.";
	    console.log(message);    

		var autoscalingParams = {
		  AutoScalingGroupNames: [
		     autoScalingGroupName
		  ]
		};
		autoscaling.describeAutoScalingGroups(autoscalingParams, function(err, data) {
		   	if (err) { 
		   		callback(err, null);
		   	} else {
		   		var instances = [];
		   		var chosenInstance = '';

		   		for(var i = 0; i < data.AutoScalingGroups[0].Instances.length; i++) {
				    var obj = data.AutoScalingGroups[0].Instances[i];
					instances.push(obj.InstanceId);
				}  

				var randomInstance = instances[Math.floor(Math.random()*instances.length)];

			    var message = "Instance " + randomInstance + ", you've been chosen!";
			    console.log(message);   

				chosenInstance = randomInstance;
				
				const terminateParams = {
				  	InstanceIds: [
				    	chosenInstance
				  	]
				};

				ec2.terminateInstances(terminateParams, function(err, data) {
				  	if (err) {
		   				callback(err, null);    
				  	} else {
					    var message = "The following instance is been termiated : " + randomInstance;
					    console.log(message);
		   				callback(null, message);    
				  	}  
				});
		   	}
		});
    } else {
    	var message = "(" + randomNumber + ") You've been lucky, no instance will be terminated.";
	    console.log(message);
	    callback(null, message);   
    }
};