import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as targets from 'aws-cdk-lib/aws-route53-targets'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as iam from 'aws-cdk-lib/aws-iam'

export class QWeddingDeployStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(props, null, 2))

    const SOURCE = '/Users/yuriyzhuk/WSPr/TONA/wedding/build'

    const namesPrefix = 'QWedding'
    const ACCOUNT_ID = props?.env?.account
    const CERTIFICATE_ID = '7d700922-e45c-4c59-8b9a-30d6ffd52711'
    const hostedZoneId = 'Z0852366GZN90ZB1COY2'
    const domainName = 'wedding.queue-my.net'
    const certificateArn = `arn:aws:acm:us-east-1:${ACCOUNT_ID}:certificate/${CERTIFICATE_ID}`
    const s3BucketName = domainName // Унікальна назва бакету


    // 1️⃣ Використання існуючого сертифіката
    const certificate = acm.Certificate.fromCertificateArn(this, `${namesPrefix}SiteCertificate`, certificateArn)

    // 2️⃣ Створення S3 бакету БЕЗ блокування публічного доступу
    const siteBucket = new s3.Bucket(this, s3BucketName, {
      bucketName: s3BucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true, // Дозволяє публічний доступ
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      websiteIndexDocument: 'index.html',
    })

    // 3️⃣ Додавання Bucket Policy
    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.AnyPrincipal()], // Дозволяє доступ усім
        actions: ['s3:GetObject'],
        resources: [`${siteBucket.bucketArn}/*`], // Відкриває доступ до всіх об'єктів у бакеті
      })
    )

    // 4️⃣ Використання S3StaticWebsiteOrigin
    const origin = new origins.S3StaticWebsiteOrigin(siteBucket)

    // 5️⃣ Створення CloudFront дистрибутива з існуючим сертифікатом
    const distribution = new cloudfront.Distribution(this, `${namesPrefix}SiteDistribution`, {
      defaultRootObject: 'index.html',
      domainNames: [domainName],
      certificate: certificate,
      defaultBehavior: {
        origin: origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(1),
        },
      ],
    })

    // 6️⃣ Додавання Route 53 запису
    const zone = route53.HostedZone.fromHostedZoneAttributes(this, `${namesPrefix}Zone`, {
      hostedZoneId: hostedZoneId,
      zoneName: domainName,
    })

    new route53.ARecord(this, `${namesPrefix}SiteAliasRecord`, {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    })

    // 7️⃣ Завантаження файлів у S3
    new s3deploy.BucketDeployment(this, `${namesPrefix}DeployWebsite`, {
      sources: [s3deploy.Source.asset(SOURCE)],
      // sources: [s3deploy.Source.asset('./build')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    })

    // Вивід URL CloudFront
    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.distributionDomainName}`,
    })
  }
}

