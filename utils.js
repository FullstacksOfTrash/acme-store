const getProductByLineItem = (products, lineItem) => {

  const productId = lineItem.productId;
  
  return products.find( product => product.id === productId );

}

// const findNonEmptyLineItems = (lineItems) => {
//   return lineItems.filter( lineItem => lineItem.quantity )
// }


module.exports = {
  getProductByLineItem
}




//if a lineItem quantity is decreased to zero, then delete lineItem

//if a lineItem quantity is increased from zero to 1, or if a lineItem doesn't exist, create lineItem