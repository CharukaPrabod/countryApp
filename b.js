function loardSearchModel(countryData) {
    const model = document.getElementById("modelSearchBodyPart");
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