const db = require('./models/db.js');

db.connect();

const Address = require('./models/AddressModel.js')
const Order = require('./models/OrderModel.js')
const Product = require('./models/ProductModel.js')
const ProductOrder = require('./models/ProductOrdersModel.js')
const User = require('./models/UserModel.js')

var blackShirt = {
    name: "Black Shirt",
    description: "This is a black shirt.",
    color: "black",
    pictures: null,
    postingdate: new Date(2020, 9, 13),
    price: 100,
    category: "shirt",
    variation: "M",
    quantity: 100
}
var whiteShirt = {
    name: "White Shirt",
    description: "This is a white shirt.",
    color: "white",
    pictures: null,
    postingdate: new Date(2020, 9, 13),
    price: 100,
    category: "shirt",
    variation: "S",
    quantity: 100
}
var blueJeans = {
    name: "Blue Jeans",
    description: "This is a pair of blue jeans.",
    color: "blue",
    pictures: null,
    postingdate: new Date(2020, 9, 13),
    price: 100,
    category: "pants",
    variation: "L",
    quantity: 100
}

// db.insertMany(Product, [blackShirt, whiteShirt, blueJeans])

// var address = {
//     firstname: "John",
//     lastname: "Doe",
//     email: "john_doe@gmail.com",
//     phonenum: 09090909090,
//     postalcode: 0909087,
//     province: "test",
//     city: "test",
//     barangay: "test",
//     addressline: "test"
// }

// db.insertOne(Address, address, function(flag){});
var products = []
var product1 = {
    product: "test",
    quantity: 10
}
var product2 = {
    product: "test",
    quantity: 20
}
products.push(product1)
products.push(product2)

var order = {
    numitems: 1,
    products: products,
    modepayment: "COD",
    modedelivery: "Shipment",
    address: "test",
    total: 1,
    shippingfee: 1,
    pointsused: 1,
    subtotal: 1,
    status: "pending",
    timeordered: new Date(2020, 9, 13),
    timecompleted: new Date(2020, 9, 13),
    timecancelled: new Date(2020, 9, 13),
    timeconfirmed: new Date(2020, 9, 13)
}

db.insertOne(Order, order, function(flag){});

// var orderOne = {
//     product: "test",
//     user:"test",
//     quantity: 12
// }
// var orderTwo = {
//     product: "test",
//     user:"test",
//     quantity: 3
// }

// db.insertMany(ProductOrder, [orderOne, orderTwo])

// var user = {
//     firstname: "John",
//     lastname: "Doe",
//     email: "john_doe@gmail.com",
//     type: "customer",
//     password: "john123",
//     points: 12,
//     address: [],
//     orders: [],
//     cart: [],
//     wishlist: []
// }

// db.insertOne(User, user, function(flag){});