class ProductSchema {
  constructor(productId, productname, seller, price, uuid) {
    this.productId = productId;
    this.productname = productname;
    this.seller = seller;
    this.price = price;
    this.uuid = uuid;
    this.firebaseId = "";
  }

  checkBlank() {
    if (
      this.productId == "" ||
      this.productname == "" ||
      this.seller == "" ||
      this.price == ""
    ) {
      return false;
    }
    return true;
  }

  showAlert() {
    if (this.productId == "") {
      alert("Please Enter Product Id");
    } else if (this.productname == "") {
      alert("Please Enter Product Name");
    } else if (this.seller == "") {
      alert("Please Enter Product Seller");
    } else if (this.price == "") {
      alert("Please Enter Product Price");
    }
  }
}
