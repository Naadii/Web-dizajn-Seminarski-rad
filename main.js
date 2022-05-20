const BASE_URL = "https://ptf-web-dizajn-2022.azurewebsites.net/"

fetch(`${BASE_URL}/api/Services`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        renderServices(data);
    })

const renderServices = (services) => {
    console.log(services);
    const servicesId = document.getElementById('servicesId');

    let resultHtml = '';

    services.forEach(service => {
        resultHtml += `
        <div id="serId" class="carousel-inner">
            <div class="service-body active">
                <img src="${service.photoUrl}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                     <h1>${service.name}</h1>
                     <h2>Price: ${service.price} $</h2>
                </div>
            </div>
        </div>`;
    });

    servicesId.innerHTML = resultHtml;
}