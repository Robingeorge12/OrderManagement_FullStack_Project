##ORDERMANAGEMENT APP

#Key Features of FULLY RESPONSIVE APPLICATION

1. Only the admin/seller can delete and update except the User Order page.
2. The User Order page can be managed by Only the respective User.
3. All the dashboard card lists are dynamic according to delivery, new order, production, return, cancel, and Total order.
4. Only once Either Admin/Seller changes the Order Status in the List Order page, once the order status is canceled or returned, the product quantity will be dynamically added to product stock.
5. According to the stock availability, on the Product page we can see the background color, which will also be dynamic.
6. If the user add more quantity than the actual quantity, there will be one button will appear, if want more quantity click the "WANT MORE" button,
    and a modal will appear then type the quantity and apply the request for production. It will be added to the Production Page.  
7. Only once the User can change the order status on the User Order page, once if order status cancelled or returned the product quantity will dynamically added in product stock.
8. Admin/Seller can't change order status or see User Page.
9. The user can't change the List order page status.
10. Admin and user can request for Production if they need more quantity, but Only the user Can place an order.
11. Production quantity updation can be placed only by the Admin/Seller.
12. Sorting, Multiple Filtration, pagination everything comes from the backend only.
13. using Redux Toolkit for managing data.
14. Everything in my ODRMAT APP is dynamic and functional

## Backend API and Its end Points

A. Sign up and  Login API => "/signup"
  https://steph-ordermanagement.onrender.com/ => "/add_user",signUp
  https://steph-ordermanagement.onrender.com/ => "/signin",signin

  
B. Order API  => "/order"
 GET  all orders =  https://steph-ordermanagement.onrender.com/ => "/",getOrders
 GET  all orders in Dashboard =  https://steph-ordermanagement.onrender.com/ => "/home",getOrdersHome
 GET  Only User respective orders =  https://steph-ordermanagement.onrender.com/ => "/user_order_data",isAuth,userOnly_orders
 GET  all orders in User List  =  https://steph-ordermanagement.onrender.com/ => "/:id",isAuth,get_buyer_item_data
 POST  filter only User List page all orders  =  https://steph-ordermanagement.onrender.com/ => "/filter_user",isAuth,filter_OnlyUser_order
 POST  post orders by user =  https://steph-ordermanagement.onrender.com/ => "/add",isAuth,postOrders  
 PATCH change order status by Only Admin =  https://steph-ordermanagement.onrender.com/ => "/edit/:id",isAuth,isAdmin,editOrders
 PATCH  change order status by Only user =  https://steph-ordermanagement.onrender.com/ => "/cancel/:id",isAuth,cancelOrders
 DELETE  delete order by only Admin =  https://steph-ordermanagement.onrender.com/ => "/remove/:id",isAuth,isAdmin,removeOrders
 DELETE  delete order by only User  =  https://steph-ordermanagement.onrender.com/ => "/removeByUSer/:id", isAuth, removeByUSer
 POST filter User Page =  https://steph-ordermanagement.onrender.com/ => "/filter", filter_order
       
 
C. Item API  =>  "/item"
  
 GET  all item   =  https://steph-ordermanagement.onrender.com => "/",isAuth,getAllItem
 POST  add new item by Admin /Seller  =  https://steph-ordermanagement.onrender.com/ => "/add_item",isAuth,isAdmin,addingItem
 PATCH  edit item by Admin /Seller =  https://steph-ordermanagement.onrender.com/ => "/update/:id",isAuth,isAdmin,edit_item_data
 PATCH order required quantity by user =  https://steph-ordermanagement.onrender.com/ => "/updateQty/:id",isAuth,update_quantity
 PATCH  reverse quantity if Admin cancel or return order =  https://steph-ordermanagement.onrender.com/ => "/editCancel_quant/:id",isAuth,isAdmin,update_Cancel_quantity
 PATCH  reverse quantity if User cancel or return order =  https://steph-ordermanagement.onrender.com/ => "/editCancel_userQuant/:id",isAuth,update_Cancel_quantityByUser
 PATCH  add production request quantity by Admin /Seller =  https://steph-ordermanagement.onrender.com/ =>"/production_Quantity/:id",isAuth,isAdmin,production_AddQuantity
 DELETE  delete product by Admin =  https://steph-ordermanagement.onrender.com/ => "/remove/:id", isAuth, isAdmin, delete_item

D. Production => "/production"


 GET  all productiom request   =  https://steph-ordermanagement.onrender.com => "/",get_Production
 POST  post production request by User / Admin =  https://steph-ordermanagement.onrender.com/ => "/receive",isAuth,product_Order
 DELETE  delete production request by Admin =  https://steph-ordermanagement.onrender.com/ => "/delete/:id",isAuth,isAdmin,product_Del


  
   
