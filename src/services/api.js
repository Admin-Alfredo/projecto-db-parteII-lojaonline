const fsp = require('fs/promises');
const fs = require('fs');
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const generateOrGetAdminID = () => {
  const filePath = path.join(__dirname, '/admin-id.json');
  let adminID = null;
  if (!fs.existsSync(filePath)) {
    adminID = uuidv4()
    fs.writeFileSync(filePath, JSON.stringify({ adminID }));
  }
  if (!adminID)
    return JSON.parse(fs.readFileSync(filePath)).adminID
}

module.exports = {
  config: {
    BASE_URL: 'http://localhost:5000/api',
    ALLOWRED_METHOD: ['GET', 'POST', 'DELETE', 'PUT', 'HEAD'],
    PORT: 5000,
    ADMIN_ID: generateOrGetAdminID()
  },

}