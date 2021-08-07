# WLessBuds - Fully functional ecommerce page

This project was build using React.js and Material UI for frontend. All the magic behind the scenes is handled with Express.js and payments are securely managed by Stripe.

## Used Technologies

- HTML (EJS view engine)
- CSS / Material UI
- TypeScript
- React
- Node.js (Express.js)
- MongoDB

## Given Problem

The task was to create a fully functional ecommerce website with all the common features both for client and admin. For the user it means searching products, view its details, sorting, adding and removing from cart and checking out securely. On the other hand an admin should have a few unique tools such as creating, editing or removing a product.

## Application Design

For this project I have decided to use a JavaScript strict superset Typescript. Both for frontend and backend. Website was build as a MERN stack application (React for frontend, non-relational database MongoDB, Node.js and its framework Express.js for backend).

For communication between frontend and backend I have used axios library.

The application is then built as a REST API.

## Approach to the Problem

### Authentication

Signing in and signing up have very common features such as checking if the username/email is already used (this is done with the built-in MongoDB functions) or whether the password and the confirmation password are matching.

The question was how to keep track of authenticated users and admins. I have chosen the method that is using jsonwebtokens (JWT Tokens). However, I have decided to take a little bit different approach that most would. I'm storing authenticated and admin state in redux store and also accessToken is kept there as a variable. The only exception is refreshToken that is located in HTTPOnly cookies.

With this approach whenever I am accessing private route I am by default sending a request with a header containing accessToken. If the accessToken is invalid, either it has expired or there is some other problem with it, the backend will reach for a refreshToken in cookies a tries to validate it. If it is valid the server send back to the client a new accessToken which will be stored in redux store and update the current refreshToken in cookies. In the opposite case the authenticated state will be set to false and the refreshToken will be destroyed.

### Private, Restricted and Admin Routes

This section is closely realted to the authetication since to be able to enter these routes you have to meet some criterias.

Firstly Private Routes. These routes are supposed to be accessed by all users that are authenticated. In the application I have used them when accessing client's orders. The way it works is that the page loads the global authenticated state that is kept in redux store. If the user is authenticated the route will let them through, on the other hand the client will be redirected to the login page.

Restricted Routes. These ones are quite the opposite to the private routes. The user can access them only if they are not authenticated, in this case I have used them to prevent a client to for instance login twice. The way it works is the same as the Private Routes.

Last but not least, Admin Routes. As I have already mention, admin has a few unique tools in order to manage the site from frontend. And that's the situation when I use these type of routes. A user must be an admin to be able to access them. This component is build very much the same way as the previous routes. The only difference is that I am no longer checking for authenticated, though for admin state.

### Redux Store, Async Thunk

I have mentioned Redux already in the previous paragraphs, however, now I would like to talk a little bit more about it. Since the website isn't the smallest one it's very important to have such a third party data store to avoid passing multiple states throughout the whole application.

In this case I have use Redux (redux toolkit) to store authentication, cart and products data. And I have chosen redux-presist library to prevent loosing all the data on every page reload.

Firstly authentication. As I have already mentioned in authentication store I am keeping multiple variables such as authenticated or admin state. What's more also accessToken or the user object could be found there. Lastly, since the requests to the server always return promises I am using async Thunk function to handle them.

Cart data are slightly different from authentication. The reason for it is that all the data is generated on the client side, thus there is no need to use async Thunk function to handle promises. Though it was a little more tricky since we have to create more robust inner logic in order to manage the states correctly.

At the end I have to bring up products data. This time we have to deal with promises again and again I'm using async Thunk function to manage it. The great thing about redux is that since I'm storing all the products there I don't have to make an API call to get the items every single time. All I need is to call the API in the beginning and then whenever I need this data I will just pull it out of the redux store. Also searching is much faster since all the data is already loaded and stored.

### Admin Tools

As it was already said, admin has some unique features to be able to manage the site directly from frontend. In this case the admin has tools to create, edit or delete products.

Creating and editing the product tool is built basicly the same way. The only difficulty was how to store an image of the product. For this purpose I have chosen Cloudinary service where I am storing the actual image and in the database I'm only keeping a URL reference of it. On the frontend after successfully calling the API I'm then dispatching a redux reducers to update the products store.

Deleting products is then a very basic API call to remove the products from database and their images on Cloudinary. After successfully calling the API I will dispatch a redux reducer to update products store.

### Cart, Checkout, Payment

Since in I'm only keeping product's IDs in the cart store while rendering the cart component and displaying the data I'm using HashMap to keep track of the number of same the product. This is then sent to checkout with the total sum.

Checkout and Payments are handled with the help of Stripe API. To be able to proceed to the final stage - payment, user must enter their personal information and shipping addresses. Then the data is sent to the server to create a PaymentIntent and to calculate the total price, since sending the price directly from the client's site is very vulnerable. After that I'm calling the Stripe API with all the information.

After a succesful payment redux reducer to clean the cart is dispatched. And the user, if he was logged in, can find his new order in Your Orders section.

### Responsive Website

Nowdays online shopping is mostly done our smartphones, therefore also this website is built as a responsive application and is mobile friendly.

## WLessBuds Demo Showcase

[Youtube Link](https://www.youtube.com/watch?v=6_iCTbN71J4)
