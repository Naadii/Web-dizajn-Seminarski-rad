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
        services = data;
        renderServices(data);
    })

const renderServices = (services) => {
    console.log(services);
    const servicesId = document.getElementById('services-row');

    let resultHtml = '';

    services.forEach(service => {
        resultHtml += `
        <div class="card  mx-4 my-3" style="width: 20rem;">
            <h5 class="card-header">${service.name}</h5>
            <div class="card-body" id="cardId">
                <h5 class="card-title">Price: ${service.price}$</h5>
                <img src="${service.photoUrl}" class="card-img-top" alt="...">
                <button type="button" onclick="fillEditData(${service.id})" class="btn btn-dark" id="edit1" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@getbootstrap">Edit</button>
                <button type="button" class="btn btn-light" id="delete1" onclick="deleteService(${service.id})">Delete</button>
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
    })
        .then(response => {
            console.log("Edit done", response);
        })
}

const addService = () => {
    const serviceAddId = document.getElementById('service-Id').value;
    const serviceAddName = document.getElementById('service-Name').value;
    const serviceAddPrice = document.getElementById('service-Price').value;
    const serviceAddPhoto = document.getElementById('service-Photo').value;
    
    fetch(`${BASE_URL}/api/Services`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            id: serviceAddId,
            name: serviceAddName,
            price: serviceAddPrice,
            photoUrl: serviceAddPhoto
        })
    })
    .then(response => {
        console.log("Service added", response);
    })
}

const deleteService = (id) => {
    fetch(`${BASE_URL}/api/Services/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        console.log(response);
    })
}
