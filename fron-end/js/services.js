const url = "http://localhost:3000";



export async function addProduct(productData) {
    try {
      const response = await fetch(url + '/createProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });
      const data = await response.json();
      return 'Product added successfully!';
    } catch (error) {
      return 'Error adding product: ' + error;
    }
  }

 // function to list all products
export async function getProducts() {
  try {
    const response = await fetch(url + '/products'); // make a GET request to '/'
    const products = await response.json(); // parse the response body as JSON
    return products; // return the list of products
  } catch (error) {
    console.error('Error listing products:', error);
  }
}

// function to create a new product
export async function createProduct(productData) {
  try {
    const response = await fetch(url + '/createProduct', { // make a POST request to '/createProduct'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData) // serialize the product data as JSON and send in the request body
    });
    const result = await response.json(); // parse the response body as JSON
    return result; // return the result of creating the product
  } catch (error) {
    console.error('Error creating product:', error);
  }
}




// function to upload an image for a product
export async function uploadImage(productId, imageFile, imageAlt) { 
 

  // Create a new FormData object
  const formData = new FormData();
// Add the product ID to the FormData object
formData.append('productId', productId);
  // Add the image file to the FormData object
  formData.append('image', imageFile);

  // Add the imageAlt parameter to the FormData object
  formData.append('imageAlt', imageAlt);

  // Make a POST request to '/uploadImage'
  const response = await fetch(url + '/uploadImage', {
    method: 'POST',
    body: formData,
    headers: {
      
      'Content-Type': 'multipart/form-data; boundary=myboundary'
  }
  });

  // Check the response status code
  if (response.status === 201) {
    // The request was successful
    const result = await response.json();
    return result;
  } else {
    // The request was unsuccessful
    console.log('Error uploading image:', response.statusText);
  }
}



// function to delete an image for a product
export async function deleteImage(productId, imageId) {
  try {
    const response = await fetch(url + `/deleteImage/${productId}/${imageId}`, { // make a DELETE request to '/deleteImage'
      method: 'DELETE'
    });
    const result = await response.json(); // parse the response body as JSON
    return result; // return the result of deleting the image
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

// function to edit a product
export async function editProduct(productId, productData) {
  try {
    const response = await fetch(url + `/editProduct/${productId}`, { // make a PUT request to '/editProduct'
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData) // serialize the product data as JSON and send in the request body
    });
    const result = await response.json(); // parse the response body as JSON
    return result; // return the result of editing the product
  } catch (error) {
    console.error('Error editing product:', error);
  }
}

// function to delete a product
export async function deleteProduct(productId) {
  try {
    
    const response = await fetch(url + `/deleteProduct/${productId}`, { // make a DELETE request to '/deleteProduct'
      method: 'DELETE'
    });
    const result = await response.json(); // parse the response body as JSON
    return result; // return the result of deleting the product
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}



 