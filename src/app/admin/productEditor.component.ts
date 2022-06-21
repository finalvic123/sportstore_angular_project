import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Product} from "../../model/product.model";
import {ProductRepository} from "../../model/product.repository";

@Component({
  templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent {
  submitted: boolean = false;
  editing: boolean = false;
  product: Product = new Product();

  editProductGroup = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
  })

  constructor(private productRepository: ProductRepository,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.editing = this.activeRoute.snapshot.params['mode'] === 'edit';
    /**
     * Object.assign = Hiermee vul je automatisch een object in aan de hand van een gelijkaardig object
     */
    if (this.editing) {
      this.product = Object.assign(this.product, productRepository.getProduct(this.activeRoute.snapshot.params['id']));
      console.log(this.product)
      this.fillInFormBasedOnProduct();
    }
  }

  setFormAttributeValue =  (controlName: string, value : any) => this.editProductGroup.get(`${controlName}`).setValue(value);
  getFormAttributeValue = (controlName: string) => this.editProductGroup.get(`${controlName}`).value;

  fillInProduct() {
    this.product.category = this.getFormAttributeValue('category');
    this.product.name = this.getFormAttributeValue('name');
    this.product.price = this.getFormAttributeValue('price');
    this.product.description = this.getFormAttributeValue('description');
  }

  fillInFormBasedOnProduct() {
    this.setFormAttributeValue('category', this.product.category)
    console.log(this.product.category)
    this.setFormAttributeValue('name', this.product.name)
    this.setFormAttributeValue('description', this.product.description)
  }

  save() {
    this.submitted = true;
    if (!this.editing) {
      this.fillInProduct();
    }
    if (this.editProductGroup.valid) {
      this.productRepository.saveProduct(this.product);
      this.router.navigateByUrl("/admin/main/products");
    }
  }
}
