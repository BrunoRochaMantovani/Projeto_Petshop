import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpressionType } from '@angular/compiler';
import { Product } from '../models/product.model';
import { Security } from '../utils/security.util';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    public url = 'http://localhost:3000/v1';
    constructor(private http: HttpClient) { }

    public composeHeader() {
        const token = Security.getToken(); /// RECUPERA TOKEN DO LOCAL STORAGE
        const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
        return headers;

    }



    getProducts() {
        return this.http.get<Product[]>(`${this.url}/products`);
    }
    authenticate(data: any) {
        return this.http.post(`${this.url}/accounts/authenticate`, data);
    }
    refreshToken() {
        return this.http.post(`${this.url}/accounts/refresh-token`, null, { headers: this.composeHeader() });
    }
    create(data: any) {
        return this.http.post(`${this.url}/accounts`, data);
    }
    resetPassword(data : any){
        return this.http.post(`${this.url}/accounts/reset-password`,data);
    }

    getProfile(){
        return this.http.get(`${this.url}/accounts`, {headers: this.composeHeader()});
    }
    updateProfile(data : any){
        return this.http.put(`${this.url}/accounts`, data, {headers:this.composeHeader()});
    }
}
