let elForm = document.querySelector(".form")
let elInput = document.querySelector(".input");
let elFormSelect = document.querySelector(".selectform")
let elSelect = document.querySelector(".select");
let elList = document.querySelector(".list")
let elTemplate = document.querySelector(".template").content;
let newDocumentFragment = document.createDocumentFragment();

let data;


async function list(arr) {
    try {
        elList.innerHTML = "";
        let res = await fetch(arr);
        data = await res.json();
        data.forEach(element => {
            let elTemplateClone = elTemplate.cloneNode(true)
            elTemplateClone.querySelector(".image").src = element.flags.svg;
            elTemplateClone.querySelector(".title").textContent = element.name.official;
            elTemplateClone.querySelector(".pop").textContent = element.population;
            elTemplateClone.querySelector(".reg").textContent = element.region;
            elTemplateClone.querySelector(".capital").textContent = element.capital;
            elTemplateClone.querySelector(".more-info").dataset.id = element.name.common;

            newDocumentFragment.appendChild(elTemplateClone)
        });
        elList.appendChild(newDocumentFragment);
    } catch (error) {
        console.log(error);
    }
}

list(`https://restcountries.com/v3.1/all`)



function modalText(arr) {
    
    let fundModal = data.find(element => element.name.common === arr);
    let elModalImg = document.querySelector(".modalimage").src = fundModal.flags.svg
    let elModalTitle = document.querySelector(".modal-title").textContent = fundModal.name.official;
    let elModalRegion = document.querySelector(".modalregion").textContent = fundModal.region
    let currenc = Object.keys(fundModal.currencies)
    let elModalCurrency = document.querySelector(".currency").textContent = currenc;
    let elModalBorder = document.querySelector(".border").textContent = fundModal?.borders
    let languages = Object.values(fundModal.languages);
    let elModalLanguage = document.querySelector(".language").textContent = languages.join(", ", " ");
    let elModalSubregion = document.querySelector(".subregion").textContent = fundModal.subregion;
    let elModalMaps = document.querySelector(".maps").href = fundModal.maps.googleMaps
}


elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".more-info")) {
        modalText(evt.target.dataset.id)
    }
})

elForm.addEventListener("keyup", function (evt) {
    evt.preventDefault();
    elList.innerHTML = "";
    let elInputValue = elInput.value.trim();
    list(`https://restcountries.com/v3.1/name/${elInputValue}`)

})

elFormSelect.addEventListener("change", function (evt) {
    evt.preventDefault();
    elList.innerHTML = "";
    let elSelectValue = elSelect.value;
    list(`https://restcountries.com/v3.1/region/${elSelectValue}`)
})
