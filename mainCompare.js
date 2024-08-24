document.addEventListener("DOMContentLoaded", function() {
    const inp1 = document.getElementById("search1");
    const inp2 = document.getElementById("search2");
    const searchBtn1 = document.getElementById("searchBtn1");
    const searchBtn2 = document.getElementById("searchBtn2");
    const resultsContainer1 = document.getElementById("results-container1");
    const resultsContainer2 = document.getElementById("results-container2");

    const companies = {
        "porsche": {
            name: "Porsche",
            registrationDate: "1931-04-25",
            state: "Stuttgart",
            roc: "Germany",
            genuinity_score: "10"
        },
        "tesla": {
            name: "Tesla",
            registrationDate: "2003-07-01",
            state: "California",
            roc: "USA",
            genuinity_score: "10"
        },
        // Add more companies as needed
    };

    function displayCompanyData(data, container) {
        const table = document.createElement("table");
        table.classList.add("company-table");

        const headers = ["Company Name", "Date of Registration", "State", "ROC", "Genuinity Score"];
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        const row = document.createElement("tr");
        Object.values(data).forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });
        tbody.appendChild(row);

        table.appendChild(tbody);

        container.innerHTML = "";
        container.appendChild(table);
    }

    function searchCompany1() {
        const name1 = inp1.value.trim().toLowerCase();
        const companyData1 = companies[name1];

        if (companyData1) {
            displayCompanyData(companyData1, resultsContainer1);
        } else {
            resultsContainer1.innerHTML = `<p>No data found for the company.</p>`;
        }
    }

    function searchCompany2() {
        const name2 = inp2.value.trim().toLowerCase();
        const companyData2 = companies[name2];

        if (companyData2) {
            displayCompanyData(companyData2, resultsContainer2);
        } else {
            resultsContainer2.innerHTML = `<p>No data found for the company.</p>`;
        }
    }

    searchBtn1.addEventListener("click", searchCompany1);
    searchBtn2.addEventListener("click", searchCompany2);
});
