
Product.find({}, (err, products) => {
  if (err) {
    console.error("Error retrieving products:", err);
  } else {
    // Iterate through each product
    products.forEach((product) => {
      console.log("Product Name:", product.product_name);
      // Access other properties as needed
      res.sen({})
    });
  }
});

//for tracking id 

const random6DigitNumber = Math.floor(100000 + Math.random() * 900000);
this.tracking_id = random6DigitNumber.toString();

const currentDate = new Date(this.order_date);
  

//date change


    // Assuming express reduces 2 days, fastTrack reduces 1 day
    let daysToReduce;
    if (this.order_mode === 'Express') {
      daysToReduce = 2;
    } else if (this.order_mode === 'FastTrack') {
      daysToReduce = 1;
    } else {
      daysToReduce = 0; // Ordinary, no reduction
    }

    const newExpectedDelivery = new Date(currentDate);
    newExpectedDelivery.setDate(currentDate.getDate() - daysToReduce);
    this.expected_delivery = newExpectedDelivery;


    when item oreder

    const orderId = new ObjectId(); // Generate a new ObjectId for the order