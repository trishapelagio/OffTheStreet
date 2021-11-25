const express = require('express');
const multer  = require('multer');

const aboutController = require('../controllers/aboutController.js');
const adminOrderController = require('../controllers/adminOrderController.js');
const adminProductController = require('../controllers/adminProductController.js');
const adminController = require('../controllers/adminController.js');
const contactController = require('../controllers/contactController.js');
const faqController = require('../controllers/faqController.js');
const homeController = require('../controllers/homeController.js');
const loginController = require('../controllers/loginController.js');
const registerController = require('../controllers/registerController.js');
const orderCancelledController = require('../controllers/orderCancelledController.js');
const orderCompletedController = require('../controllers/orderCompletedController.js');
const orderConfirmedController = require('../controllers/orderConfirmedController.js');
const orderPendingController = require('../controllers/orderPendingController.js');
const privacyController = require('../controllers/privacyController.js');
const productDetailsController = require('../controllers/productDetailsController.js');
const searchController = require('../controllers/searchController.js');
const shippingDetailsController = require('../controllers/shippingDetailsController.js');
const shoppingCartController = require('../controllers/shoppingCartController.js');
const sizeChartController = require('../controllers/sizeChartController.js');
const termsController = require('../controllers/termsController.js');
const checkoutController = require('../controllers/checkoutController.js');
const logoutController = require('../controllers/logoutController.js');

const adminOrderPendingController = require('../controllers/adminOrderPendingController.js');
const adminOrderConfirmedController = require('../controllers/adminOrderConfirmedController.js');
const adminSettingsController = require('../controllers/adminSettingsController.js');
const navbarController = require('../controllers/navbarController.js');
const orderSummaryController = require('../controllers/orderSummaryController.js');
const app = express();

var storage = multer.diskStorage({
    destination:'views/uploads/',
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-';
        cb(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage});

module.exports = app;

app.get('/about', aboutController.about);
app.get('/adminOrder', adminOrderController.adminOrder);
app.get('/adminProduct', adminProductController.adminProduct);
app.get('/adminHome', adminController.admin);
app.get('/contact', contactController.contact);
app.get('/faq', faqController.faq);
app.get('/', homeController.home);
app.get('/login', loginController.login);
app.get('/register', registerController.register);
app.post('/home', registerController.postRegister);
app.get('/orderCancelled', orderCancelledController.orderCancelled);
app.get('/orderCompleted', orderCompletedController.orderCompleted);
app.get('/orderConfirmed', orderConfirmedController.orderConfirmed);
app.get('/orderPending', orderPendingController.orderPending);
app.get('/orderSummary', orderSummaryController.orderSummary);
app.get('/privacy', privacyController.privacy);
app.get('/productDetails', productDetailsController.productDetails);
app.post('/addToCart',shoppingCartController.addToCart);
app.post('/postDetails', shoppingCartController.postDetails);
app.get('/search', searchController.search);
app.get('/filter', searchController.filter);
app.get('/shippingDetails', shippingDetailsController.shippingDetails);
app.get('/shoppingCart', shoppingCartController.shoppingCart);
app.get('/sizeChart', sizeChartController.sizeChart);
app.get('/terms', termsController.terms);
app.post('/confirmation', checkoutController.checkout);
app.post('/postLogin', loginController.postLogin);
app.get('/logout', logoutController.getLogout);
app.get('/adminOrderPending', adminOrderPendingController.adminOrderPending);
app.get('/adminOrderConfirmed', adminOrderConfirmedController.adminOrderConfirmed);
app.get('/adminSettings', adminSettingsController.adminSettings);
app.post('/changeStatus', adminOrderController.changeStatus);
app.get('/getCheckLogin', loginController.getCheckLogin);
app.post('/login', loginController.postLogin);
app.get('/getNavbar', navbarController.getNavbar);
app.get('/getName', navbarController.getName);
app.get('/isSession', checkoutController.isSession);
app.post('/removeItem', shoppingCartController.removeItem);
app.post('/changeQuantity', shoppingCartController.changeQuantity);
app.post('/addProduct', upload.single('images'), adminProductController.addProduct);
app.post('/deleteProduct', adminProductController.deleteProduct);
app.post('/editProduct', upload.single('images'), adminProductController.editProduct);
app.get('/getCheckEmail', registerController.getCheckEmail);
app.post('/cancelOrder', orderPendingController.cancel);