clear

# export AWS_SDK_LOAD_CONFIG=1
# export AWS_PROFILE=yura-amplify


aws sts get-caller-identity

# cdk synth
# cdk deploy

npm run cdk-synth
npm run cdk-deploy

# cdk synth --profile yura-amplify
# cdk deploy --profile yura-amplify