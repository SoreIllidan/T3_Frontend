// Environment de producción
export const environment = {
  production: true,
  apiUrl: 'http://34.176.162.36:8080/api',
  uploadUrl: 'http://34.176.162.36:8080/api/upload',
  maxFileSize: 10485760, // 10MB
  allowedExtensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'zip']
};
