import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpressionType } from '@angular/compiler';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    public url = 'http://localhost:3000/v1';
    constructor(private http: HttpClient) { }

    public composeHeader() {
        const token = localStorage.getItem('petshop.token'); /// RECUPERA TOKEN DO LOCAL STORAGE
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
}
