# Inventori

Inventori is a small application that makes your current infrastructure visible by making
API requests via the Javascript SDK. In many organizations development teams have a good overview of their infrastructure, but the moment you need to find integrations between two domains it becomes blurry.
Inventori tries to solve this.

## Capabilities

- [ ] Add Region component
- [x] List VPCs
- [ ] Add availability zones
- [x] List subnets
- [x] List EC2 instances
- [ ] List route tables
- [ ] List gateways (Internet and NAT)
- [x] List RDS resources
- [x] List DynamoDb resources
- [x] List S3 buckets
- [ ] List and analyze IAM policies to generate relationships

## How to run

Inventori consists of a frontend and backend. The backend is responsible for making the API calls towards AWS, and the frontend handles the visualization of the components in relationship to eachother.

### Frontend

`npm run start` will start the React development server

### Backend

`npm run backend` will start the nodemon express server

## How to use the application

You will need to assume the SecurityAuditRole or another IAM role with the same read permissions to successfully list 
all the resources within the AWS account. The minimal policies that you need to have are:

```HCL
    {
        ...
        Resources: [
            "ec2:*",
            "dynamoDB:*",
            "s3:*",
            "rds:*",
            "iam:*",
        ]
    }
```

Create an IAM role that will have the least privilege policies that are needed and perform the sts command to 
generate your short lived credentials (Access Key, Secret Access Key, Session Token).

## Roadmap

1. Finalize the remaining core resources
2. Implement styling
3. Implement multi account support
4. Store state in database to limit the API calls.
