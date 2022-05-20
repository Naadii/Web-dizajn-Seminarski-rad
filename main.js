const BASE_URL = "https://ptf-web-dizajn-2022.azurewebsites.net/"

let services = [];

fetch(`${BASE_URL}/api/Services`)
    .then(response => {
        if(!response.ok){
            throw Error('Error');
        }
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
                     <button type="button" onclick="fillEditData(${service.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@getbootstrap">Edit</button>
                </div>
            </div>
        </div>`;
    });

    servicesId.innerHTML = resultHtml;
}

const fillEditData = (serviceId) => {
    const service = services.find(service => service.id === serviceId);
    const serviceFormId = document.getElementById('service-id');
    const serviceFormName = document.getElementById('service-name');
    const serviceFormPrice = document.getElementById('service-price');
    const serviceFormPhoto = document.getElementById('service-photo');
    
    serviceFormId.value = service.id;
    serviceFormName.value = service.name;
    serviceFormPrice.value = service.price;
    serviceFormPhoto.value = service.photoUrl;
}

const editServices = () => { 
    const serviceFormId = document.getElementById('service-id').value;
    const serviceFormName = document.getElementById('service-name').value;
    const serviceFormPrice = document.getElementById('service-price').value;
    const serviceFormPhoto = document.getElementById('service-photo').value;

    fetch(`${BASE_URL}/api/Services`, {
        method: 'PUT',
        headers: new Headers ({'content-type': 'application/json'}),
        body: JSON.stringify({
            id: serviceFormId,
            name: serviceFormName,
            price: serviceFormPrice,
            photoUrl: serviceFormPhoto
            })
        .then(response => {
            if(!response.ok){
                throw Error('Error');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    })
}
