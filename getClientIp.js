// import axios from './node_modules/axios/lib/axios.js';
export async function getClientIP() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    console.log(response.data.ip);
  } catch (error) {
    console.error(error);
  }
}
