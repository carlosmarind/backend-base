export const configuration = {
    username: process.env.USERNAME || 'default',
    apikey: process.env.APIKEY || 'miApiKeySecreta',
    port: 3001,
    jwtSecretKey: process.env.JWT_SECRET_KEY || 'pruebas'
}
