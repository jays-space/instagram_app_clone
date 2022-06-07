/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppsyncID = process.env.API_INSTAGRAMAPP_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`; //TableName-AppsyncID-env

const userExists = async id => {
  const params = {
    TableName,
    Key: id,
  };

  try {
    const response = await docClient.get(params).promise();
    return !!response?.Item; // returns true only if truthy value, i.e. if user exists
  } catch (e) {
    console.log(e);
    return false;
  }
};

const saveUser = async user => {
  const date = new Date();
  const isoTimestamp = date.toISOString();
  const timestamp = date.getTime();

  const Item = {
    ...user,
    nofFollowers: 0,
    nofFollowings: 0,
    nofPosts: 0,
    createdAt: isoTimestamp,
    updatedAt: isoTimestamp,
    __typename: 'User',
    _lastChangedAt: timestamp,
    _version: 1,
  };
  const params = {
    TableName,
    Item,
  };

  try {
    await docClient.put(params).promise();
  } catch (e) {
    console.log(e);
  }
};

exports.handler = async (event, context) => {
  console.log('=== POST CONFIRMATION TRIGGER ===');

  if (!event?.request?.userAttributes) {
    console.log('No user data available from userAttributes');
    console.log(event);
    return;
  }

  const {sub, name, email} = event?.request?.userAttributes;

  const newUser = {
    id: sub,
    name,
    email,
  };

  //check if the user already exists
  if (!(await userExists(newUser.id))) {
    // if not, save the user to db
    await saveUser(newUser);
    console.log(`User ${newUser.id} has been saved to th database`);
  } else {
    console.log(`User ${newUser.id} already exists`);
  }

  return event;
};
