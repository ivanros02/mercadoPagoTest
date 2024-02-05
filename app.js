const mp = new MercadoPago("TEST-97eb7f19-9988-4b2b-823c-0f7e0524e295", {
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

        const response = await fetch("http://localhost:3000/create_preference", {
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
