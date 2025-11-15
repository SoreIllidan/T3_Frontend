// Environment de desarrollo
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  uploadUrl: 'http://localhost:8080/api/upload',
  maxFileSize: 10485760, // 10MB
  allowedExtensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'zip']
};
