const accessTokenUserJwtObject = {
  subject: "stickerdojo-access-token-user",
	algorithm: "HS256",
	expiresIn: "7d",
	issuer: "https://github.com/Hyperspace018",
	header: {
		typ: "JWT"
	}
}

module.exports = {
  accessTokenUserJwtObject
}