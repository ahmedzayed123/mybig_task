//import service.js
import { addProduct, getProducts,editProduct,deleteImage,deleteProduct, uploadImage } from './services.js';

const tableBody = document.querySelector('#product-table tbody');
const modalContainer = document.getElementById('modal-container');
const imgModel = document.querySelector('#model-image');



  


//open image model when click product image (with data to delete or edit alt ) or empty if user click add image

function openImgModal(imageSrc, imageAlt, productTitle, imgIdParam, imgProductIdParam) {
   
    imgModel.style.display = 'block';
    const modalImg = imgModel.querySelector('img');
    const modalTitle = imgModel.querySelector('h2');
    const imgSubmit = imgModel.querySelector('#imgSubmit');
    const imgDelete = imgModel.querySelector('#imgDelete');
    const imgForm = imgModel.querySelector('#imgForm');
    const imgFile =  imgModel.querySelector('#image-upload');
    modalImg.src = imageSrc;
    modalImg.alt = imageAlt;
    modalTitle.textContent = productTitle;
    
    const imgId = imgModel.querySelector('#imgId');
    const imgProductId = imgModel.querySelector('#img_productId');
    const imageAltInput = imgModel.querySelector('#image-alt');
    if(imageAlt == null  || imageAlt === "null"){
        imageAlt = '';
    }
    imgId.value = imgIdParam;
    imgProductId.value = imgProductIdParam;
    imageAltInput.value = imageAlt;
  
    const uploadGroup = imgModel.querySelector('#uploadGroup');
    if(imgIdParam === ''){
        uploadGroup.style.display = 'block';
        imgSubmit.style.display = 'inline-block';
        imgDelete.style.display = 'none'; 
        modalImg.style.display = 'none'; 
    }
    else
    {
        uploadGroup.style.display = 'none'; 
        imageAltInput.disabled = true;
        imgSubmit.style.display = 'none'; 
        imgDelete.style.display = 'inline-block'; 
        modalImg.style.display = 'block'; 
    }
    //delete image
    imgDelete.addEventListener('click', async (event) => {
        const confirmDelete = confirm('Are you sure you want to delete this image?');
        if (confirmDelete) {
          await deleteImage(imgProductIdParam,imgIdParam);
          imgModel.style.display = 'none';
          renderProducts();
        }
       event.stopPropagation();
        event.preventDefault();
        imgDelete.removeEventListener('click', () => {});
      });
      //upload image
      imgSubmit.addEventListener('click', async (event) => {
      
         
  if (imgFile.files.length > 0) {
    // Get the first file
    const file = imgFile.files[0];
 
 
   // Call the uploadImage() function
const result = await uploadImage(imgProductIdParam, file,imageAlt);

// Check the result
if (result.status === 201) {
    imgForm.reset();
    imgId.value='';
    imgProductId.value='';
    imgModel.style.display = 'none';
    renderProducts();
  // The request was successful
  console.log('Image uploaded successfully');
} else {
  // The request was unsuccessful
  console.log('Error uploading image:', result.statusText);
}
      
   
  } 
 
        
      
      });
  }
  //open product model for edit
  function openProductModal(productData){
   // Get form input elements
  const productIdInput = document.getElementById('productId');
  const productTitleInput = document.getElementById('product-title');
  const productDescriptionInput = document.getElementById('product-description');
  const productTagsInput = document.getElementById('product-tags');
  const productSkuInput = document.getElementById('product-sku');
  const modalHeader = document.querySelector('#modal-header');
  const deleteBtn = document.querySelector('#deleteBtn');
  const editButton = document.querySelector('#submitBtn');
  // Set input field values to corresponding values in productData
  modalHeader.textContent = 'Edit Product: ' + productData.title;
    deleteBtn.style.display = 'inline-block';
  productIdInput.value = productData.id;
  productTitleInput.value = productData.title;
  productDescriptionInput.value = productData.body_html;
  productTagsInput.value = productData.tags;
  productSkuInput.value = productData.variants[0].sku;
  document.querySelectorAll('label.error').forEach(label => label.classList.remove('error'));
  // Show modal
  modalContainer.style.display = 'block';

  //edit button

  editButton.addEventListener('click', async () => {

    if (validateForm()) {
        await saveProduct();
       }
    });
   
//delete product
deleteBtn.addEventListener('click', async (event) => {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      await deleteProduct(productData.id);
      modalContainer.style.display = 'none';
      renderProducts();
    }
   event.stopPropagation();
    event.preventDefault();
    deleteBtn.removeEventListener('click', () => {});
  });
  }
  
  
//render products function
document.addEventListener('click', (event) => {
    if (event.target.matches('.product-image')) {
      const productTitle = event.target.dataset.productTitle;
      const imageSrc = event.target.src;
      const imageAlt = event.target.alt;
      const imgId = event.target.dataset.imgId;
      const imgProductId = event.target.dataset.imgProductId;
      openImgModal(imageSrc, imageAlt, productTitle, imgId, imgProductId);
    } else if (event.target.matches('.add-image-link')) {
      const productTitle = event.target.dataset.productTitle;
      const imgProductId = event.target.dataset.imgProductId;
      openImgModal('', '', productTitle, '', imgProductId);
    }
    else  if (event.target.matches('.product-link')) {
        const productData = JSON.parse(event.target.parentNode.dataset.product);
        openProductModal(productData);
      }
  });
  async function renderProducts() {
    //get the product list
    const products = await getProducts();
    //clear table
    tableBody.innerHTML = '';
    //fill table with products
    products.forEach(product => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td class="product-name" data-product='${JSON.stringify(product)}'>
  <a  class="product-link">${product.title}</a>
</td>


        
        <td>${product.body_html}</td>
        <td>${product.tags}</td>
        <td>
          ${product.images.map(image => `
            <img src="${image.src}" alt="${image.alt}"  class="product-image"
              data-product-title="${product.title}" data-img-id="${image.id}" data-img-product-id="${product.id}">
          `).join('')}
          <br>
          <a  class="add-image-link" data-product-title="${product.title}" data-img-product-id="${product.id}">Add Image</a>
        </td>
        <td>${product.variants[0].sku}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Close the image modal when the user clicks outside of it
  window.addEventListener('click', function(event) {
    if (event.target == imgModel) {
      imgModel.style.display = 'none';
    }
  });

  //close img modal when click bttn
  const imgModalCloseBtn = document.getElementById('modal-img-close-btn');
  imgModalCloseBtn.addEventListener('click', () => {
    imgModel.style.display = 'none';
  });
 
//call render function
renderProducts();






// open / close left menu on mobile 
const toggleButton = document.querySelector('.menu-toggle');
const leftNav = document.querySelector('.left-nav');

toggleButton.addEventListener('click', function() {
  leftNav.classList.toggle('active');

});


const openModalBtn = document.getElementById('addNew');


//Open the modal when the button is clicked

openModalBtn.addEventListener('click', function() {
  modalContainer.style.display = 'block';
  const modalHeader = document.querySelector('#modal-header');
  //const deleteBtn = document.querySelector('#deleteBtn');
  modalHeader.textContent = 'Add Product';
   // deleteBtn.style.display = 'none';
    form.reset();



});

// Close the modal when the user clicks outside of it
window.addEventListener('click', function(event) {
  if (event.target == modalContainer) {
    modalContainer.style.display = 'none';

  }
});

//close modal onClick
const modalCloseBtn = document.getElementById('modal-close-btn');
modalCloseBtn.addEventListener('click', () => {
  modalContainer.style.display = 'none';
});




const form = document.getElementById('productForm');
const submitBtn = document.getElementById('submitBtn');

function validateForm() {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach((input, index) => {
    const label = input.parentNode.querySelector('label');
    if (!input.value && index != 0) {
      label.classList.add('error');
      
      isValid = false;
    } else {
      label.classList.remove('error');
    }
  });

  return isValid;
}



async function saveProduct() {
  
    const title = document.querySelector('#product-title').value;
    const description = document.querySelector('#product-description').value;
    const tags = document.querySelector('#product-tags').value;
    const sku = document.querySelector('#product-sku').value;
    const productId = document.querySelector('#productId').value;
   
    const req = {
        "title": title,
        "body_html": description,
        "tags": tags,
        "variants": [
          {
            "sku": sku
          }
        ]
      };
  
    try {
       let result='';
      if(productId == '')
      {
        
     result = await addProduct(req);
      }
      else
      {
      result =  await editProduct(productId,req)
      }
      
      if (typeof result === 'string' && result.startsWith('Error')) {
        console.error(result); // There was an error
      } else {
        
         //reset form 
         form.reset();
         //close model
         modalContainer.style.display = 'none';
         //reload products
         renderProducts();
      }
      
    } catch (error) {
      alert(error);
    }
  }


  

  async function _saveProduct() {
   // await saveProduct();
    if (validateForm()) {
        await saveProduct();
       }
  }
  submitBtn.addEventListener('click', _saveProduct);

