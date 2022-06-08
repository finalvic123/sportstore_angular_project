import {Component} from "@angular/core";
import {ProductRepository} from "../model/product.repository";
import {Product} from "../model/product.model";
import {Cart} from "../model/cart.model";
import {Router} from "@angular/router";

@Component({
  selector: 'store',
  templateUrl: 'store.component.html'
})
export class StoreComponent {
  public selectedCategory = null;
  public selectedPage = 1;
  public productsPerPage = 3;
  public pageOptions : number[] = [3,4,6,8];

  constructor(private repository: ProductRepository,
              private cart : Cart,
              private router : Router) {}

  get products(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.repository
      .getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): (string | undefined)[] {
    return this.repository.getCategories();
  }

  get pageCount() : number {
    return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage);
  }

  //this is not used
  get pageNumbers() : number[] {
    return Array(Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage))
      .fill(0)
      .map(((value, index) => index + 1));
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
  }

  changePage(newPage : number) {
    this.selectedPage = newPage;
  }

  /**
   * The event must be cast to a number, because the value in the select statement is statically defined in the
   * HTML, instead of taking data from the component, so it will be read as a string instead of a number
   * @param event
   */
  changePageSize(event : any) {
    this.productsPerPage = Number(event.target.value);
    this.changePage(1);
  }

  addProductToCart(product : Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }
}
