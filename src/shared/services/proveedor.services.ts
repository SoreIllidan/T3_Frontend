import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError,throwError} from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { IProveedor } from '../models/proveedor';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = environment.apiUrl.replace('/api', '');
  constructor(private http: HttpClient) {}
  agregarProveedor(producto: IProveedor): Observable<any> {
    return this.http.post<any>(this.apiUrl+`/proveedores/crear`, producto).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );;
  }

  getProveedor(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proveedores/GetAll`);
  }

  eliminarProveedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/proveedores/eliminar/${id}`).pipe(
        catchError(error => {
            Swal.fire('Error', error.error, 'warning');
            return throwError(() => error);
        })
    );
}

actualizarProveedor(proveedor: IProveedor): Observable<IProveedor> {
  return this.http.put<IProveedor>(`${this.apiUrl}/proveedores/actualizar/${proveedor.id}`, proveedor).pipe(
    catchError(error => {
      Swal.fire('Error', error.error, 'warning');
      return throwError(() => error);
    })
  );
}
}
