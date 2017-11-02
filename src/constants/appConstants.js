const env = process.env.NODE_ENV;
console.log(env);
export const API_URL = (env === 'development') ? 'http://localhost:3435/api': 'https://ghtl-api.herokuapp.com/api' ;
// export const API_URL = 'https://ghtl-api.herokuapp.com/api';