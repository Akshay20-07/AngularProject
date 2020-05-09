import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
    selector :'pm-products',
    templateUrl: './products-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  

    pageTitle :string ='Product List !';
    imageWidth : number=50;
    imageMargin :number=2;
    showImage: boolean=false;
    errorMessage :string;

    _listFilter: string;
    get listFilter():string{
      return this._listFilter;
    }
    set listFilter(value: string){
      this._listFilter=value; 
      this.filteredProduct=this._listFilter ?this.performFilter(this._listFilter) : this.product;   
    }
    
    filteredProduct: IProduct[];
    product :IProduct[] =[];

      constructor(private productService: ProductService){
        
      }
      
      onRatingClicked(message: string):void{
        this.pageTitle='Product list :'+message;
      }

      performFilter(filterBy: string): IProduct[] {
        filterBy=filterBy.toLocaleLowerCase();
        return this.product.filter((item : IProduct)=>item.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);
      }
      toggleImage() :void{
        this.showImage=!this.showImage;
      }

      ngOnInit():void {
        // this.product=this.productService.getProducts();
        this.productService.getProducts().subscribe({
          next : product=>{
            this.product=product;
            this.filteredProduct=this.product;
          },
          error :err=> this.errorMessage=err          
        })
       // this.filteredProduct=this.product;
      }

}