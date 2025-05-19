console.log("hellow")
let datatestList;
function loardData() {

    let country = document.getElementById("itemList")
    let body = " ";
    
    let index=-1;
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(dataList => {
            datatestList=dataList;
            dataList.forEach(element => {
                //console.log(element)
                let languages = element.languages ? Object.values(element.languages).join(", ") : "N/A";

                body += `<div class="col">
                        <div class="card shadow-sm"> 
                                <img src="${element.flags.png}" alt="element.flags.alt">
                            <div class="card-body">
                                     <h3 class="card-title">${element.name.official}</h3>
                                <p class="card-text">
                                    <strong>Common Name:</strong> ${element.name.common}<br>
                                    <strong>Capital:</strong> ${element.capital}<br>
                                    <strong>Region:</strong> ${element.region} (${element.subregion})<br>
                                    <strong>Population:</strong> ${element.population}<br>
                                    <strong>Languages:</strong> ${languages}<br>
                                </p>
                                <div class="d-flex justify-content-center">
                                    <div class="btn-group">
                                         <button type="button" onclick="loardModel(${++index})" class="btn btn-warning"data-bs-toggle="modal" data-bs-target="#moreDetail">view moew-></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>`
            });
            country.innerHTML = body;
        })

}
function loardModel(index){
    let model = document.getElementById("modelBody");
    let body = "";
    let country = datatestList[index];

    let languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
    let nativeNames = country.name.nativeName 
        ? Object.values(country.name.nativeName).map(name => name.common).join(", ") 
        : "N/A";

    body += `<div class="card" style="width: 100%; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <h3 class="card-title">Basic Country Info</h3>
      <img 
        src="${country.flags.png}" 
        alt="${country.flags.alt || 'Flag'}"
        class="card-img-top mx-auto d-block"
        style="width: 100%; height: 150px; object-fit: contain; padding: 10px;"
      >
      <div class="card-body">
        <h5 class="card-title">${country.name.common}</h5>
        <p class="card-text text-muted" style="text-align:left;">
          <strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}<br>
          <strong>Population:</strong> ${country.population.toLocaleString()}<br>
          <strong>Official Name:</strong> ${country.name.official}<br>
          <strong>Spoken Languages:</strong> ${languages}<br>
          <strong>Native Names:</strong> ${nativeNames}
        </p>
      </div>
    </div>`;
    
    model.innerHTML = body;
}

loardData()


