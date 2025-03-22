POLICY_NAME_=QWedding-cdk-deploy-FRONT-S3-DOMAIN-zone-QUEUE-MY-NET
POLICY_FILE_=cdk-deploy-policy-FRONT-S3-DOMAIN.json
ACCOUNT_ID=399236433687
PAUSE=5s

# PROFILE=" --profile my-profile" 
PROFILE="" 

POLICY_FILE=file://$POLICY_FILE_
POLICY_NAME=policy-$POLICY_NAME_
ROLE_NAME=role-$POLICY_NAME_

clear
aws sts get-caller-identity

echo ">>>> create Policy"
aws iam create-policy --policy-name $POLICY_NAME --policy-document $POLICY_FILE   $PROFILE

# sleep $PAUSE
# echo ">>>> create role"
# aws iam create-role --role-name $ROLE_NAME --assume-role-policy-document file://trust-policy.json   $PROFILE

# echo ">>>> Check role"
# sleep $PAUSE
# aws iam get-role --role-name $ROLE_NAME

# sleep $PAUSE
# echo ">>>> attach role policy"
# aws iam attach-role-policy --role-name $ROLE_NAME --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/$POLICY_NAME   $PROFILE


sleep $PAUSE
echo ">>>> attach policy to user"
aws iam attach-user-policy --user-name $(aws sts get-caller-identity --query Arn --output text | cut -d '/' -f 2) --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/$POLICY_NAME

sleep $PAUSE
echo ">>>> Check attach policy to user"
aws iam list-attached-user-policies --user-name $(aws sts get-caller-identity --query Arn --output text | cut -d '/' -f 2)
# aws iam list-groups-for-user --user-name $(aws sts get-caller-identity --query Arn --output text | cut -d '/' -f 2)
