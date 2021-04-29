import { Component, OnInit, TemplateRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutItems, FireBaseService } from 'src/app/services/fire-base.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  path:string;

  public form: FormGroup;

  public checkoutList: CheckoutItems[]=[];
  public checkoutDetails: CheckoutItems;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private firebaseService:FireBaseService,
    public cart: CartService,
    public af:AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.cart.getCart();
    this.cart.totalAmount();
    this.getCheckouts();
    
  }

  cartAdd(param1):void{
    this.cart.increaseQuantity(param1);
  }

  cartMin(param1):void{
    this.cart.deductQuantity(param1);
  }


  //CHECKOUT
  upload($event){
    this.path = $event.target.files[0]
  }
  uploadImage(){
    console.log(this.path);
    this.af.upload("/files"+Math.random()+this.path,this.path)
  }
  getCheckouts():void {
    this.firebaseService.getCheckout().subscribe((res)=>{
      this.checkoutList = res.map((items) => {
        return{
          ...items.payload.doc.data() as {},
          id: items.payload.doc.id
        }as CheckoutItems;
      });
    });
  }
  formInit(data: CheckoutItems): void{
    this.form = this.fb.group({
      name: [data ? data.name : '', Validators.required],
      image: [data ? data.image : '',Validators.required],
      address: [data ? data.address : '', Validators.required],
      amount: [data ? data.amount : ''],
      number: [data ? data.number : '',
      Validators.compose([
        Validators.required
      ])
    ]
    });
  }
  openModal(content:TemplateRef<any>, itemsId: string):void{
    this.checkoutDetails = this.checkoutList.find((items: CheckoutItems) => items.id === itemsId);

    this.formInit(this.checkoutDetails);
    this.modalService.open(content, {backdrop:'static', centered:true});
  }
  addCheckout(): void{
    this.firebaseService.addCheckout(this.form.value).then();
    this.uploadImage();
  }
  deleteCheckout(itemsId:string):void{
    this.firebaseService.deleteCheckout(itemsId).then();
  }
}
