exports.errorResponse = (message, status) => ({
  condition: "Error",
  message: message,
  time: new Date().toISOString(),
  status: status
})

exports.successResponseWithData = (response, message, method, status) => ({
  condition: "Success",
  message: message,
  method: method,
  time: new Date().toISOString(),
	status: status,
	data: response
})

exports.successResponseWithoutData = (message, method, status) => ({
  condition: "Success",
  message: message,
  method: method,
  time: new Date().toISOString(),
  status: status
})