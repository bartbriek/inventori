# Inventori

Inventori is a small application that makes your current AWS infrastructure visible by making
API requests via the Javascript SDK of AWS. In many organizations development teams have a good overview 
of the newer parts of the infrastructure, but it becomes blurry when all the infrastructure needs to be visualized.
And who are we kidding, documenting not the best part of the job, but our future selfs or replacements will be ever gratefull.
Inventori tries to solve this for a few of the many components of the AWS infrastructure. 

## Capabilities
- [x] List VPCs
- [x] List availability zones
- [x] List public and private subnets by using the route tables
- [x] List EC2 instances
- [x] List gateways (Internet and NAT)
- [x] List RDS instances
- [x] List DynamoDb tables
- [x] List S3 buckets
- [x] List Lambda functions
- [x] List Cloudfront distributions

## How to run

Inventori consists of a frontend and backend. 
The backend is responsible for making the API calls towards AWS, 
and the frontend handles the visualization of the components in relationship to eachother.

### Frontend

`npm run start` will start the React development server

### Backend

`npm run backend` will start the nodemon express server

## How to use the application

You will need to assume the SecurityAuditRole or another IAM role with the same read permissions to successfully list 
all the resources within the AWS accounts.

Create an IAM role that will have the least privilege policies that are needed and perform the sts command to 
generate your short lived credentials (Access Key, Secret Access Key, Session Token).

## Roadmap

1. Finalize the remaining core resources (eks labeling, route53, iam user and roles, WAF, API Gateways)..
2. Implement better styling (dynamic grid layout based on public private subnet count.
3. Store state in database to limit the API calls and support multi account support.
4. Support docker setup.
5. Develop way to visualize route tables and therefor flow on network level.
6. Develop way to visualize IAM policies which result in (cross) account relationships. 
