
// product details

const pId = document.getElementById("productId");
const pName = document.getElementById("productname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");

// button details

const createBtn = document.getElementById("btn-create");
const readBtn = document.getElementById("btn-read");
const updateBtn = document.getElementById("btn-update");
const deleteallBtn = document.getElementById("btn-deleteall");

let allProducts = [];

createBtn.addEventListener("click", function () {
  create();
});

readBtn.addEventListener("click", function () {
  read();
  // let x = read();
  // if (x.style.display === "none") {
  //   x.style.display = "block";
  // } else {
  //   x.style.display = "none";
  // }
});

updateBtn.addEventListener('click' , function(){
  updateProduct();
})

deleteallBtn.addEventListener("click", function () {
  if(confirm("You want to delete all record")){
    deleteAllProduct();
  }
  else{
    return;
  }
});


//  functions 


const create = () => {
  const productObj = new ProductSchema(
    pId.value,
    pName.value,
    seller.value,
    price.value,
    UUID()
  );

  if (!productObj.checkBlank()) {
    productObj.showAlert();
    return;
  }

  // allProducts.push(productObj);
  // localStorage.setItem("products", JSON.stringify(allProducts));
  db.collection('products').add(Object.assign({}, productObj));
  
  clearFields();
  read();
};

const read = () => {
  allProducts = [];
  // allProducts = JSON.parse(localStorage.getItem("products"));
  db.collection('products').get()
    .then((snapshot)=>{
      snapshot.forEach(doc=>{
        allProducts.push(doc.data());
      });
      createTable();
    })
    .catch(err=>{
      console.log(err);
    });
};

const createTable = ()=>{
  let html = "";
  let sno = 1;
  allProducts.forEach((product) => {
    html += `<tr class="parent-row"><th scope="row">${sno}</th>
        <td class=""># ${product.productId}</td>
        <td>${product.productname}</td>
        <td>${product.seller}</td>
        <td>₹ ${numberWithCommas(product.price)}</td>
        <td><i class="fas fa-edit btnedit" id="${product.uuid}" onclick="editProduct(this.id)"></i></td>
        <td><a class="btn-delete"><i class="fas fa-trash-alt btn-delete" id="${product.uuid}"onclick="deleteProduct(this.id)"></i></a></td></tr>
        `;
    sno++;
  });
  document.getElementById("root").innerHTML = html;
}

const clearFields = () => {
  pId.value = "";
  pName.value = "";
  seller.value = "";
  price.value = "";
};

const editProduct = (uid)=>{
    // allProducts = [];
    // allProducts = JSON.parse(localStorage.getItem("products"));
    if(allProducts.length == 0){
      db.collection('products').get()
        .then((snapshot)=>{
          snapshot.forEach(doc=>{
            allProducts.push(doc.data());
          });
        })
        .catch(err=>{
          console.log(err);
        });
    }
    const index = allProducts.findIndex(product=>product.uuid == uid);
    const productObj = allProducts[index];
    localStorage.setItem('currentKey',uid);
    fillValues(productObj);
}

const fillValues = (productObj) => {
  pId.value = productObj.pId;
  pName.value = productObj.productname;
  seller.value = productObj.seller;
  price.value = productObj.price;
}

const updateProduct = ()=>{
  const uuid = localStorage.getItem('currentKey');
  const updateProductObj = new ProductSchema(
    pId.value,
    pName.value,
    seller.value,
    price.value,
    uuid
  );
  
  if (!updateProductObj.checkBlank()) {
    updateProductObj.showAlert();
    return;
  }
  const index = allProducts.findIndex(product=>product.uuid == uuid);
  allProducts[index] = updateProductObj;
  localStorage.setItem("products", JSON.stringify(allProducts));

  clearFields();
  read();

}

const deleteProduct = (uid) => {
  allProducts = [];
  allProducts = JSON.parse(localStorage.getItem("products"));
  const index = allProducts.findIndex(product=>product.uuid == uid);
  allProducts.splice(index,1); 
  localStorage.setItem("products", JSON.stringify(allProducts));
  read();
};

const deleteAllProduct = () => {
  allProducts = [];
  localStorage.setItem("products", JSON.stringify(allProducts));
  read();
};

// Function for unique ID

function UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}


// Function for commas

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


