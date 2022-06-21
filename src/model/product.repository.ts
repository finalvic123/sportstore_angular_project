import {Injectable} from "@angular/core";
import {Product} from "./product.model";
import {RestDataSource} from "./rest.datasource";

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: (string | undefined)[] = [];

  /**
   * staticdatasource is injectable
   * @param dataSource
   */
  constructor(private dataSource: RestDataSource) {
    dataSource.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
      this.categories = data
        .map(product => product.category)
        .filter((category, index, array) => array.indexOf(category) == index)
        .sort()
    });
  }

  getProducts(category: string = null): Product[] {
    return this.products.filter(product => category === null || category === product.category);
  }

  getProduct(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  saveProduct(product: Product) {
    if (product.id == null || product.id == 0) {
      this.dataSource.saveProduct(product)
        .subscribe(p => this.products.push(p));
    } else {
      this.dataSource.updateProduct(product)
        .subscribe(p => {
          this.products.splice(this.products.
          findIndex(p => p.id === product.id), 1, product);
        });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(p => {
      this.products.splice(this.products.
      findIndex(p => p.id == id), 1);
    })
  }

  getCategories(): string[] {
    return this.categories;
  }
}
