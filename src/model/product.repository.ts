import {Injectable} from "@angular/core";
import {Product} from "./product.model";
import {StaticDataSource} from "./static.datasource";

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: (string | undefined)[] = [];

  /**
   * staticdatasource is injectable
   * @param dataSource
   */
  constructor(private dataSource: StaticDataSource) {
    dataSource.getProducts().subscribe(data => {
      this.products = data;
      this.categories = data
        .map(product => product.category)
        .filter((category, index, array) => array.indexOf(category) == index)
        .sort()
    });
  }

  getProducts(category: string | null = null): Product[] {
    return this.products.filter(product => category == null || category == product.category);
  }

  getProduct(id: number): Product | undefined {
    return this.products.find(product => product.id == id);
  }

  getCategories(): (string | undefined)[] {
    return this.categories;
  }
}
