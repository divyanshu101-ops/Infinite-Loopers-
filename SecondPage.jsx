import { useState,useEffect } from "react"

function SecondPage(props){

    const companyName = props.name

    const [data, setData] = useState({

    })

    useEffect(() => {
        fetch(`http://localhost:3000/companyData/${companyName}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setData(data)
            })
            .catch((Error) => console.log(Error))
        }
    , [companyName]);

    const [name,setName] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted with:', { name });
    }

    const {
        CIN,
        ROC_code,
        Company_Category,
        Company_sub_category,
        Company_Class,
        Authorized_Capital,
        Paidup_Capital,
        Registrationdate_Date,
        Office_Address,
        Listing_Status,
        Company_Status,
        State_Code,
        Indian_Foreign,
        NIC_code,
        Industrial_Classification,
        Genuinity
    } = data;



    return (
        <div>
            <nav className='nav-bar'>
                <div className="logo">LegitMate</div>
                <div className="menu">
                    <button className="home-btn hov">Home</button>
                    <button className="comparison-btn hov">Compare Companies</button>
                    <button className="aboutus-btn hov">About Us</button>
                    <button className="our-team-btn hov">Our Team</button>
                </div>
            </nav>
            <section className="search-section-2">
                <form className="search-container-2" onSubmit={handleSubmit}>
                    <input type="text" id="search-input-2" name="company" className="search-input-2" placeholder="Search..." value={name} onChange={(e) => setName(e.target.value)}/>
                    <div id="search-results-2" className="search-results-2"></div>
                </form>
            </section>
            <div className="report">
             
            </div>
            <div className="data-container">
                {CIN && <h1 className="cntr">CIN: {data.CIN}</h1>}
                {data.name && <h1 className="cntr highlight">Name: {data.name}</h1>}
                {Genuinity && <h1 className="cntr highlight">Legit Score: {data.Genuinity}/100</h1>}
                {ROC_code && <h1 className="cntr">ROC Code: {data.ROC_code}</h1>}
                {Company_Category && <h1 className="cntr">Company Category: {data.Company_Category}</h1>}
                {Company_sub_category && <h1 className="cntr">Company Sub Category: {data.Company_sub_category}</h1>}
                {Company_Class && <h1 className="cntr">Company Class: {data.Company_Class}</h1>}
                {<h1 className="cntr">Authorized Capital: {data.Authorized_Capital}</h1>}
                {<h1 className="cntr">Paidup Capital: {data.Paidup_Capital}</h1>}
                {Registrationdate_Date && <h1 className="cntr">Registration Date: {data.Registrationdate_Date}</h1>}
                {Office_Address && <h1 className="cntr">Office Address: {data.Office_Address}</h1>}
                {Listing_Status && <h1 className="cntr">Listing Status: {data.Listing_Status}</h1>}
                {Company_Status && <h1 className="cntr">Company Status: {data.Company_Status}</h1>}
                {State_Code && <h1 className="cntr">State Code: {data.State_Code}</h1>}
                {Indian_Foreign && <h1 className="cntr">Indian/Foreign: {data.Indian_Foreign}</h1>}
                {NIC_code && <h1 className="cntr">NIC Code: {data.NIC_code}</h1>}
                {Industrial_Classification && <h1 className="cntr">Industrial Classification: {data.Industrial_Classification}</h1>}
            </div>
            <div>
                <p>{data.name} is a {data.Listing_Status} {data.Company_Class} incorporated on {data.Registrationdate_Date}. It is classified as a {data.Company_Category} and is located in West bengal. It is {data.Company_sub_category} and has a Authorized share capital of {data.Authorized_Capital} and the Total paidup capital is of {data.Paidup_Capital}.</p>
                <p>The current status of {data.name} is - {data.Company_Status}</p>
                <p>The Corporate Identification Number(CIN) of {data.name} is {data.CIN}. The registered office of {data.name} is at {data.Office_Address}</p>
            </div>
        </div>
    )
}

export default SecondPage