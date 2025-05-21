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
function loardModel(index) {
    const model = document.getElementById("modelBody");
    const country = datatestList[index];

    const safe = (val, fallback = "N/A") => val ?? fallback;

    const listHTML = (obj, formatFn) =>
        obj
            ? `<ul class="ps-4 mb-2">${Object.entries(obj).map(formatFn).join("")}</ul>`
            : "<p class='text-muted'>N/A</p>";

    const arrayListHTML = (arr) =>
        arr
            ? `<ul class="ps-4 mb-2">${arr.map(item => `<li>${item}</li>`).join("")}</ul>`
            : "<p class='text-muted'>N/A</p>";

    const languages = country.languages
        ? arrayListHTML(Object.values(country.languages))
        : "<p class='text-muted'>N/A</p>";

    const nativeNames = listHTML(country.name.nativeName, ([lang, val]) =>
        `<li><strong>${lang.toUpperCase()}:</strong> ${val.common}</li>`);

    const demonyms = listHTML(country.demonyms, ([lang, val]) =>
        `<li><strong>${lang.toUpperCase()}:</strong> ${val.m} / ${val.f}</li>`);

    const translations = listHTML(country.translations, ([lang, val]) =>
        `<li><strong>${lang.toUpperCase()}:</strong> ${val.official}</li>`);

    const currencies = listHTML(country.currencies, ([code, val]) =>
        `<li><strong>${val.name}</strong> (${code}) – <span>Symbol:</span> ${val.symbol}</li>`);

    const borders = country.borders?.join(", ") || "None";
    const maps = country.maps || {};
    const flagEmoji = safe(country.flag, "🏳️");
    const capital = safe(country.capital?.[0]);
    const capitalLat = safe(country.capitalInfo?.latlng?.[0]);
    const capitalLng = safe(country.capitalInfo?.latlng?.[1]);
    const latlng = country.latlng ? `${country.latlng[0]}, ${country.latlng[1]}` : "N/A";
    const landlocked = country.landlocked ? "✅ Yes" : "❌ No";
    const independent = country.independent ? "✅ Yes" : "❌ No";
    const unMember = country.unMember ? "✅ Yes" : "❌ No";
    document.getElementById("staticBackdropLabel").innerHTML=`<center><b>${country.name.official}</b></center>`
    model.innerHTML = `
    <div class="card p-3 shadow-sm" style="width: 100%; text-align: left;">
        <div class="text-center bg-light p-3 rounded mb-3">
            <h3>${flagEmoji} ${country.name.common}</h3>
            <img src="${country.flags.png}" alt="Flag" style="max-width: 100px; margin-top: 10px;">
        </div>

        <div class="accordion" id="countryAccordion">

            ${accordionItem("general", "🏳️ General Information", `
                <p><strong>Official Name:</strong> ${country.name.official}</p>
                <p><strong>Native Names:</strong></p> ${nativeNames}
            `)}

            ${accordionItem("geo", "🌍 Geography", `
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Subregion:</strong> ${safe(country.subregion)}</p>
                <p><strong>Capital:</strong> ${capital} (${capitalLat}, ${capitalLng})</p>
                <p><strong>Coordinates:</strong> ${latlng}</p>
                <p><strong>Landlocked:</strong> ${landlocked}</p>
                <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
                <p><strong>Borders:</strong> ${borders}</p>
                <p><strong>Maps:</strong> 
                    <a href="${maps.googleMaps}" target="_blank">Google Maps</a> | 
                    <a href="${maps.openStreetMaps}" target="_blank">OpenStreetMap</a>
                </p>
            `)}

            ${accordionItem("people", "👥 People", `
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Demonyms:</strong></p> ${demonyms}
                <p><strong>Languages:</strong></p> ${languages}
            `)}

            ${accordionItem("economy", "💰 Economy", `
                <p><strong>Currencies:</strong></p> ${currencies}
                <p><strong>Gini Index:</strong> ${
                    country.gini
                        ? Object.entries(country.gini).map(([year, val]) => `${year}: ${val}`).join(", ")
                        : "N/A"
                }</p>
            `)}

            ${accordionItem("gov", "🏛️ Government", `
                <p><strong>Independent:</strong> ${independent}</p>
                <p><strong>UN Member:</strong> ${unMember}</p>
                <p><strong>FIFA Code:</strong> ${safe(country.fifa)}</p>
                <p><strong>Driving Side:</strong> ${safe(country.car?.side)}</p>
                <p><strong>Car Signs:</strong> ${safe(country.car?.signs?.join(", "))}</p>
                <p><strong>Timezones:</strong> ${safe(country.timezones?.join(", "))}</p>
                <p><strong>Start of Week:</strong> ${safe(country.startOfWeek)}</p>
            `)}

            ${accordionItem("codes", "🌐 Codes & Communication", `
                <p><strong>ISO2:</strong> ${country.cca2}</p>
                <p><strong>ISO3:</strong> ${country.cca3}</p>
                <p><strong>Numeric:</strong> ${country.ccn3}</p>
                <p><strong>CIOC:</strong> ${safe(country.cioc)}</p>
                <p><strong>Internet TLD:</strong> ${country.tld?.join(", ") || "N/A"}</p>
                <p><strong>Calling Code:</strong> +${safe(country.idd?.root)}${safe(country.idd?.suffixes?.join(", "))}</p>
            `)}

            ${accordionItem("translations", "🈯 Translations", translations)}

        </div>
    </div>`;
}

function accordionItem(id, title, content) {
    return `
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading-${id}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">
                ${title}
            </button>
        </h2>
        <div id="collapse-${id}" class="accordion-collapse collapse" aria-labelledby="heading-${id}" data-bs-parent="#countryAccordion">
            <div class="accordion-body">
                ${content}
            </div>
        </div>
    </div>`;
}


function loardCountrySearchData() {

    let country = document.getElementById("search-country-by-name")
    let countryname=document.getElementById("search-country").value;
    let body = " ";
    
    
    fetch(`https://restcountries.com/v3.1/name/${countryname}   `)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                const countryData = data[0]; 
                // searchdata=countryData
                let languages = countryData.languages ? Object.values(countryData.languages).join(", ") : "N/A";

                body += ` <div class="card container-fluid" style="width: 18rem;">
        <img src="${countryData.flags.png}" class="card-img-top" alt="${countryData.flags.alt}">
        <div class="card-body">
          <h5 class="card-title">${countryData.name.official}</h5>
          <p class="card-text">
            <strong>Common Name:</strong> ${countryData.name.common}<br>
                    <strong>Capital:</strong> ${countryData.capital}<br>
                    <strong>Region:</strong> ${countryData.region} (${countryData.subregion})<br>
                    <strong>Population:</strong> ${countryData.population}<br>
                    <strong>Languages:</strong> ${languages}<br>
          </p>
                 <div class="d-flex justify-content-center">
                            <div class="btn-group">
                                  <button type="button" onclick="loardSearchModel()" class="btn btn-warning"data-bs-toggle="modal" data-bs-target="#searchDetail    ">view moew-></button>
                            </div>
                 </div>

        </div>
      </div>`}else{
        {
            body = "<p>No country found.</p>";
        }
      }
            
            document.getElementById("search-country-by-name").innerHTML = body;
        })

}
function loardSearchModel() {
    const model = document.getElementById("modelSearchBodyPart");
    let countryname=document.getElementById("search-country").value;
    fetch(`https://restcountries.com/v3.1/name/${countryname}   `)
    .then(res => res.json())
    .then(data => {
        
            const countryData = data[0]; 
    const country = countryData;

    const safe = (val, fallback = "N/A") => val ?? fallback;

    const listHTML = (obj, formatFn) =>
        obj
            ? `<ul class="ps-4 mb-2">${Object.entries(obj).map(formatFn).join("")}</ul>`
            : "<p class='text-muted'>N/A</p>";

    const arrayListHTML = (arr) =>
        arr
            ? `<ul class="ps-4 mb-2">${arr.map(item => `<li>${item}</li>`).join("")}</ul>`
            : "<p class='text-muted'>N/A</p>";

    const languages = country.languages
        ? arrayListHTML(Object.values(country.languages))
        : "<p class='text-muted'>N/A</p>";

    const nativeNames = listHTML(country.name.nativeName, ([lang, val]) =>
        `<li><strong>${lang.toUpperCase()}:</strong> ${val.common}</li>`);

    const demonyms = listHTML(country.demonyms, ([lang, val]) =>
        `<li><strong>${lang.toUpperCase()}:</strong> ${val.m} / ${val.f}</li>`);

    const translations = listHTML(country.translations, ([lang, val]) =>
        `<li><strong>${lang.toUpperCase()}:</strong> ${val.official}</li>`);

    const currencies = listHTML(country.currencies, ([code, val]) =>
        `<li><strong>${val.name}</strong> (${code}) – <span>Symbol:</span> ${val.symbol}</li>`);

    const borders = country.borders?.join(", ") || "None";
    const maps = country.maps || {};
    const flagEmoji = safe(country.flag, "🏳️");
    const capital = safe(country.capital?.[0]);
    const capitalLat = safe(country.capitalInfo?.latlng?.[0]);
    const capitalLng = safe(country.capitalInfo?.latlng?.[1]);
    const latlng = country.latlng ? `${country.latlng[0]}, ${country.latlng[1]}` : "N/A";
    const landlocked = country.landlocked ? "✅ Yes" : "❌ No";
    const independent = country.independent ? "✅ Yes" : "❌ No";
    const unMember = country.unMember ? "✅ Yes" : "❌ No"; 
document.getElementById("searchDetailLabel").innerHTML=`<center><b>${country.name.official}</b></center>`
document.getElementById("modelSearchBodyPart").innerHTML = `
    <div class="card p-3 shadow-sm" style="width: 100%; text-align: left;">
        <div class="text-center bg-light p-3 rounded mb-3">
            <h3>${flagEmoji} ${country.name.common}</h3>
            <img src="${country.flags.png}" alt="Flag" style="max-width: 100px; margin-top: 10px;">
        </div>

        <div class="accordion" id="countryAccordion">

            ${accordionItem("general", "🏳️ General Information", `
                <p><strong>Official Name:</strong> ${country.name.official}</p>
                <p><strong>Native Names:</strong></p> ${nativeNames}
            `)}

            ${accordionItem("geo", "🌍 Geography", `
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Subregion:</strong> ${safe(country.subregion)}</p>
                <p><strong>Capital:</strong> ${capital} (${capitalLat}, ${capitalLng})</p>
                <p><strong>Coordinates:</strong> ${latlng}</p>
                <p><strong>Landlocked:</strong> ${landlocked}</p>
                <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
                <p><strong>Borders:</strong> ${borders}</p>
                <p><strong>Maps:</strong> 
                    <a href="${maps.googleMaps}" target="_blank">Google Maps</a> | 
                    <a href="${maps.openStreetMaps}" target="_blank">OpenStreetMap</a>
                </p>
            `)}

            ${accordionItem("people", "👥 People", `
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Demonyms:</strong></p> ${demonyms}
                <p><strong>Languages:</strong></p> ${languages}
            `)}

            ${accordionItem("economy", "💰 Economy", `
                <p><strong>Currencies:</strong></p> ${currencies}
                <p><strong>Gini Index:</strong> ${
                    country.gini
                        ? Object.entries(country.gini).map(([year, val]) => `${year}: ${val}`).join(", ")
                        : "N/A"
                }</p>
            `)}

            ${accordionItem("gov", "🏛️ Government", `
                <p><strong>Independent:</strong> ${independent}</p>
                <p><strong>UN Member:</strong> ${unMember}</p>
                <p><strong>FIFA Code:</strong> ${safe(country.fifa)}</p>
                <p><strong>Driving Side:</strong> ${safe(country.car?.side)}</p>
                <p><strong>Car Signs:</strong> ${safe(country.car?.signs?.join(", "))}</p>
                <p><strong>Timezones:</strong> ${safe(country.timezones?.join(", "))}</p>
                <p><strong>Start of Week:</strong> ${safe(country.startOfWeek)}</p>
            `)}

            ${accordionItem("codes", "🌐 Codes & Communication", `
                <p><strong>ISO2:</strong> ${country.cca2}</p>
                <p><strong>ISO3:</strong> ${country.cca3}</p>
                <p><strong>Numeric:</strong> ${country.ccn3}</p>
                <p><strong>CIOC:</strong> ${safe(country.cioc)}</p>
                <p><strong>Internet TLD:</strong> ${country.tld?.join(", ") || "N/A"}</p>
                <p><strong>Calling Code:</strong> +${safe(country.idd?.root)}${safe(country.idd?.suffixes?.join(", "))}</p>
            `)}

            ${accordionItem("translations", "🈯 Translations", translations)}

        </div>
    </div>`;
})}

function accordionItem(id, title, content) {
    return `
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading-${id}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">
                ${title}
            </button>
        </h2>
        <div id="collapse-${id}" class="accordion-collapse collapse" aria-labelledby="heading-${id}" data-bs-parent="#countryAccordion">
            <div class="accordion-body">
                ${content}
            </div>
        </div>
    </div>`;
}


loardData()


