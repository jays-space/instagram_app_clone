/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log('===== Lambda working!! =====');
  console.log(event);
  return event;
};
