const mp = new MercadoPago("APP_USR-e5c83aac-4e1b-41b6-a4aa-d7184f4e2304", {
    locale: "es-AR"
});

//url para create_preference
//const baseURL = 'https://tudominio.com';
// Coloca esta variable global para controlar si el botón ya fue creado
let isButtonCreated = false;
document.getElementById("checkout-btn").addEventListener("click", async () => {
    try{
        const orderData = {
            title: document.querySelector(".name").innerText,
            quantity: 1,
            price: 2000,
        };

        const response = await fetch("https://playful-treacle-e5c3eb.netlify.app//create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        const preference = await response.json();
        if (!isButtonCreated) {
            createCheckoutButton(preference.id);
            isButtonCreated = true;
        }
    }
    catch (error) {
        alert("error:(");
    }
});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
        });
    };

    renderComponent();
};
