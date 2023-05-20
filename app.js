var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var container=[];
if(localStorage.getItem('store')!=null){
container=JSON.parse(localStorage.getItem('store'))
displayProduct();
}


function addProduct(){
    var product= {
name: productName.value,
price: productPrice.value,
category:productCategory.value ,
desc: productDesc.value,

    }
container.push(product);
displayProduct();
clearProduct()
localStorage.setItem('store',JSON.stringify(container))
}
function displayProduct(){
var cartona=``;
for(var i =0; i<container.length;i++){
cartona +=`<tr>

<td>${[i]}</td>
<td>${container[i].name}</td>
<td>${container[i].price}</td>
<td>${container[i].category}</td>
<td>${container[i].desc}</td>
<td ><button onclick='setForm(${i})'  class='bg-success btn-outline-info'>update</button></td>
<td ><button onclick='deleteProduct(${i})' class='bg-danger'>delete</button></td>
<td ><button  class='bg-danger'>pay</button></td>

</tr>`

}
document.getElementById('rowData').innerHTML=cartona;


}
function deleteProduct(i){
container.splice(i,1)
displayProduct();
localStorage.setItem('store',JSON.stringify(container))

}
function clearProduct(){
    name:productName.value ='';
        price:productPrice.value='';
        category:productCategory.value='';
        desc:productDesc.value='';
}

function search(term){
 
    var cartona=``;
for(var i =0; i<container.length;i++){
      if(container[i].name.toLowerCase().includes(term.toLowerCase())==true){
cartona +=`<tr>

<td>${[i]}</td>
<td>${container[i].name}</td>
<td>${container[i].price}</td>
<td>${container[i].category}</td>
<td>${container[i].desc}</td>
<td ><button onclick='deleteProduct(${i})' class='bg-danger'>delete</button></td>

</tr>`

}
document.getElementById('rowData').innerHTML=cartona;

}}
var formIndex=0;
function setForm(id){
    formIndex=id
   
    document.getElementById('productName').value=container[id].name
    document.getElementById('productPrice').value= container[id].price
    document.getElementById('productCategory').value= container[id].category
    document.getElementById('productDesc').value= container[id].desc


}
function updateProduct(){

container[formIndex].name=document.getElementById('productName').value
container[formIndex].price=document.getElementById('productPrice').value
container[formIndex].category=document.getElementById('productCategory').value
container[formIndex].desc=document.getElementById('productDesc').value

displayProduct();
clearProduct();
localStorage.setItem('store',JSON.stringify(container));
}