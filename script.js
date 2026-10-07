const form = document.getElementById("orderform");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get values
    let custname = document.getElementById("custname").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let size = document.getElementById("size").value;
    let quantity = document.getElementById("quantity").value;
    let deliverdate = document.getElementById("deliverdate").value;
    let address = document.getElementById("address").value.trim();

    // Error elements
    let custnameerror = document.getElementById("custnameerror");
    let emailerror = document.getElementById("emailerror");
    let phoneerror = document.getElementById("phoneerror");
    let sizeerror = document.getElementById("sizeerror");
    let quantityerror = document.getElementById("quantityerror");
    let deliverdateerror = document.getElementById("deliverdateerror");
    let addresserror = document.getElementById("addresserror");
    let message = document.getElementById("message");

    // Clear previous errors
    custnameerror.textContent = "";
    emailerror.textContent = "";
    phoneerror.textContent = "";
    sizeerror.textContent = "";
    quantityerror.textContent = "";
    deliverdateerror.textContent = "";
    addresserror.textContent = "";
    message.textContent = "";

    let valid = true;

    // Customer name
    if (custname === "") {
        custnameerror.textContent = "Please enter your name.";
        valid = false;
    }

    // Email
    if (email === "") {
        emailerror.textContent = "Please enter your email.";
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailerror.textContent = "Please enter a valid email.";
        valid = false;
    }

    // Phone
    if (phone === "") {
        phoneerror.textContent = "Please enter your phone number.";
        valid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
        phoneerror.textContent = "Phone number must contain 10 digits.";
        valid = false;
    }

    // Size
    if (size === "") {
        sizeerror.textContent = "Please select a size.";
        valid = false;
    }

    // Quantity
    if (quantity === "") {
        quantityerror.textContent = "Please enter quantity.";
        valid = false;
    } else if (quantity <= 0) {
        quantityerror.textContent = "Quantity must be at least 1.";
        valid = false;
    }

    //deliver date
    if (deliverdate === "") {
        deliverdateerror.textContent = "Please select a delivery date.";
        valid = false;
    } else {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let minimumDate = new Date();
        minimumDate.setDate(today.getDate() + 2);

        let selectedDate = new Date(deliverdate);

        if (selectedDate < minimumDate) {
            deliverdateerror.textContent = "Delivery date must be at least 3 days from today.";
            valid = false;
        }
    }

        //prevent invalid dates
        let deliveryInput = document.getElementById("deliverdate");

        if (deliveryInput) {
            let minimumDate = new Date();
            minimumDate.setDate(minimumDate.getDate() + 2);

            let year = minimumDate.getFullYear();
            let month = String(minimumDate.getMonth() + 1).padStart(2, "0");
            let day = String(minimumDate.getDate()).padStart(2, "0");

            deliveryInput.min = `${year}-${month}-${day}`;
        }       

    // Address
    if (address === "") {
        addresserror.textContent = "Please enter your address.";
        valid = false;
    }

    // Successful submission
    // Successful submission
if (valid) {

    // Get existing orders from localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Create new order
    let newOrder = {
        id: Date.now(),
        custname: custname,
        email: email,
        phone: phone,
        size: size,
        quantity: quantity,
        deliverdate: deliverdate,
        address: address
    };

    // Add new order
    orders.push(newOrder);

    // Save orders in localStorage
    localStorage.setItem("orders", JSON.stringify(orders));

    message.textContent = "Order placed successfully!";
    message.className = "success";

    form.reset();
}
});
