aws cloudformation cancel-update-stack --stack-name QWeddingDeployStack
sleep 5
aws cloudformation describe-stacks --stack-name QWeddingDeployStack --query "Stacks[0].StackStatus"
