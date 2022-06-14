import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {Product} from "./product.model";
import {Cart} from "./cart.model";
import {Order} from "./order.model";
import {HttpHeaders} from "@angular/common/http";

const PROTOCOL = "http";
const PORT = 3500;
const PRODUCTS = "products";

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}${PRODUCTS}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.baseUrl}${PRODUCTS}`,
      product, this.getOptions());
  }

  updateProduct(product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}${PRODUCTS}/${product.id}`,
      product, this.getOptions());
  }

  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.baseUrl}${PRODUCTS}/${id}`,
      this.getOptions());
  }

  saveOrder(order: Order): Observable<Order> {
    const ORDERS = "orders";
    return this.httpClient.post<Order>(`${this.baseUrl}${ORDERS}`, order);
  }

  authenticate(username: string, password: string): Observable<boolean> {
    const LOGIN = "login";
    return this.httpClient.post<any>(`${this.baseUrl}${LOGIN}`, {
      name: username, password: password
    }).pipe(map(response => {
      this.auth_token = response.success ? response.token : null;
      return response.success;
    }));
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.baseUrl + "orders", this.getOptions());
  }
  deleteOrder(id: number): Observable<Order> {
    return this.httpClient.delete<Order>(`${this.baseUrl}orders/${id}`,
      this.getOptions());
  }
  updateOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.baseUrl}orders/${order.id}`,
      order, this.getOptions());
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        "Authorization": `Bearer<${this.auth_token}>`
      })
    }
  }
}
