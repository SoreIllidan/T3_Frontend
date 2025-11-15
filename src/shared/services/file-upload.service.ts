import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadUrl = environment.uploadUrl;

  constructor(private http: HttpClient) {}

  /**
   * Sube un archivo al servidor
   * @param file Archivo a subir
   * @param category Categoría opcional del archivo (ej: 'productos', 'facturas', etc)
   * @returns Observable con el progreso de la subida
   */
  uploadFile(file: File, category?: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    if (category) {
      formData.append('category', category);
    }

    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  /**
   * Valida si el archivo cumple con los requisitos
   * @param file Archivo a validar
   * @returns true si es válido, string con error si no lo es
   */
  validateFile(file: File): true | string {
    // Validar tamaño
    if (file.size > environment.maxFileSize) {
      const maxSizeMB = environment.maxFileSize / (1024 * 1024);
      return `El archivo excede el tamaño máximo permitido de ${maxSizeMB}MB`;
    }

    // Validar extensión
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !environment.allowedExtensions.includes(extension)) {
      return `Tipo de archivo no permitido. Extensiones permitidas: ${environment.allowedExtensions.join(', ')}`;
    }

    return true;
  }

  /**
   * Descarga un archivo del servidor
   * @param fileId ID del archivo
   * @returns Observable con el blob del archivo
   */
  downloadFile(fileId: string): Observable<Blob> {
    return this.http.get(`${this.uploadUrl}/${fileId}`, {
      responseType: 'blob'
    });
  }

  /**
   * Elimina un archivo del servidor
   * @param fileId ID del archivo
   * @returns Observable con la respuesta
   */
  deleteFile(fileId: string): Observable<any> {
    return this.http.delete(`${this.uploadUrl}/${fileId}`);
  }
}
