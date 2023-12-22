var cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(name, price) {
    var quantity = 1;
    var existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        var newItem = { name: name, price: price, quantity: quantity };
        cart.push(newItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
function displayCart() {
    var cartItemsElement = document.getElementById('cart-items');
    var cartTotalElement = document.getElementById('cart-total');
    cartItemsElement.innerHTML = '';
    cart.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item.name + ' (x' + item.quantity + ') - ₹' + (item.price * item.quantity);
        cartItemsElement.appendChild(li);
    });
    var total = cart.reduce(function (sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);
    cartTotalElement.textContent = total;
}
function viewCart() {
    displayCart();
    $('#cartModal').modal('show');
}
function checkout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}
var cartData = JSON.parse(localStorage.getItem('cart'));
        var checkoutItemsElement = document.getElementById('checkout-items');
        var checkoutTotalElement = document.getElementById('checkout-total');
        if (cartData && cartData.length > 0) {
            cartData.forEach(function (item) {
                var p = document.createElement('p');
                p.textContent = item.name;
                checkoutItemsElement.appendChild(p);
                var quantity = document.createElement('p');
                quantity.textContent = 'x' + item.quantity;
                quantity.className = 'quantity';
                checkoutItemsElement.appendChild(quantity);
                var price = document.createElement('p');
                price.textContent = '₹' + (item.price * item.quantity);
                price.className = 'price';
                checkoutItemsElement.appendChild(price);
            });
            var total = cartData.reduce(function (sum, item) {
                return sum + (item.price * item.quantity);
            }, 0);
            checkoutTotalElement.textContent = 'Total: ₹' + total;
        } else {
            checkoutItemsElement.innerHTML = '<p>No items in the cart.</p>';
        }
        var checkoutForm = document.getElementById('checkout-form');
        checkoutForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var fullName = document.getElementById('fullName').value;
            var address = document.getElementById('address').value;
            var contactNumber = document.getElementById('contactNumber').value;
            alert('Thank you for your order!');
            localStorage.removeItem('cart');
            window.location.href = 'confirmation.html';
        });
        function processPayment() {
            var orderDetails = "Your order details:\n- Item 1\n- Item 2";
            var carriers = ["UPS", "FedEx", "DHL", "USPS"];
            var randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];
            var randomTrackingNumber = Math.floor(100000000 + Math.random() * 900000000);
            var trackingInfo = `Tracking information:\nShipped via ${randomCarrier}\nTracking number: ${randomTrackingNumber}`;
            document.getElementById('paymentSuccessDetails').textContent = orderDetails + '\n\n' + trackingInfo;
            $('#paymentSuccessModal').modal('show');
        }
        function redirectToMain() {
            window.location.href = 'main.html';
        }
        function logout() {
            alert("You have logged out");
            window.location.href = "login.html";
        }
        function showRegister() {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('register-container').style.display = 'block';
        }
        function showLogin() {
            document.getElementById('login-container').style.display = 'block';
            document.getElementById('register-container').style.display = 'none';
        }
        function login(e) {
            e.preventDefault();
            var userId = document.getElementById('userId').value;
            var password = document.getElementById('password').value;
            setTimeout(function () {
                var registeredUser = localStorage.getItem('registeredUser');
                var registeredPassword = localStorage.getItem('registeredPassword');
                console.log('Login attempt with User ID:', userId);
                console.log('Registered User ID:', registeredUser);
                if (userId === registeredUser && password === registeredPassword) {
                    console.log('Login successful! Redirecting to main.html.');
                    window.location.href = 'main.html';
                } else {
                    $('#invalidCredentialsModal').modal('show');
                }
            }, 500);
        }
        function register(e) {
            e.preventDefault();
            var newUserId = document.getElementById('newUserId').value;
            var newPassword = document.getElementById('newPassword').value;
            if (!isValidPassword(newPassword)) {
                alert('Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one special character, and one number.');
                return;
            }
            if (isUsernameExists(newUserId)) {
                alert('Username already exists. Please choose a different username.');
                return;
            }
            setTimeout(function () {
                localStorage.setItem('registeredUser', newUserId);
                localStorage.setItem('registeredPassword', newPassword);
                alert('Registration successful! You can now log in.');
                showLogin();
            }, 500);
        }
        function isValidPassword(password) {
            var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        }
        function isUsernameExists(username) {
            var existingUser = localStorage.getItem('registeredUser');
            return existingUser === username;
        }
        document.getElementById("deliveryVideo").play();
        function toggleVideo() {
            var video = document.getElementById("deliveryVideo");
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }