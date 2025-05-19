function loardData() {
    let country = document.getElementById("itemList");
    let body = "";

    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(dataList => {
            // Create a lookup table to map country codes to names
            const codeToName = {};
            dataList.forEach(item => {
                codeToName[item.cca3] = item.name.common;
            });

            dataList.forEach(element => {
                // Process languages
                let languages = element.languages ? Object.values(element.languages).join(", ") : "N/A";

                // Process currency
                let currencyText = "N/A";
                if (element.currencies) {
                    const currencyCode = Object.keys(element.currencies)[0];
                    const currency = element.currencies[currencyCode];
                    currencyText = `${currency.name} (${currencyCode}), Symbol: ${currency.symbol}`;
                }

                // Process borders
                let borders = "None";
                if (element.borders && element.borders.length > 0) {
                    borders = element.borders.map(code => codeToName[code] || code).join(", ");
                }

                body += `<div class="col">
                    <div class="card shadow-sm"> 
                        <img src="${element.flags.png}" alt="${element.flags.alt || "Country flag"}">
                        <div class="card-body">
                            <h3 class="card-title">${element.name.official}</h3>
                            <p class="card-text">
                                <strong>Common Name:</strong> ${element.name.common}<br>
                                <strong>Capital:</strong> ${element.capital}<br>
                                <strong>Region:</strong> ${element.region} (${element.subregion})<br>
                                <strong>Population:</strong> ${element.population.toLocaleString()}<br>
                                <strong>Borders:</strong> ${borders}<br>
                                <strong>Languages:</strong> ${languages}<br>
                                <strong>Currency:</strong> ${currencyText}<br>
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                <small class="text-body-secondary">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>`;
            });

            country.innerHTML = body;
        });
}

loardData();
