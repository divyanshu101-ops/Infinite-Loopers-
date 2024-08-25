import { useState } from 'react'
import SecondPage from './SecondPage.jsx'


function HomePage(){
        const [name,setName] = useState('')
        const [display,setDisplay] = useState(false)

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log('Form submitted with:', { name });
            setDisplay(()=>true)
        }
        
        if(display == true)
            return <SecondPage name={name}/>
    return(
        <div className='hero'>
            <nav className='navbar'>
                <div className="navbar-brand">LegitMate</div>
                <ul className="navbar-menu">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="comparison.html">Compare Companies</a></li>
                    <li><a href="aboutus.html">About Us</a></li>
                    <li><a href="team.html">Our Team</a></li>
                </ul>
            </nav>
            <main className='content'>
                <h1>Welcome to LegitMate</h1>
                <div className="bang">
                    <form className="search-container" onSubmit={handleSubmit}>
                        <input type="text" id="search-input" name="company" className="search-input" placeholder="Search..." value={name} onChange={(e) => setName(e.target.value)}/>
                        <div id="search-results" className="search-results"></div>
                    </form>
                </div>
            </main>
            
            <footer>
                <p>&copy; 2024 Digital Constellations</p>
            </footer>
        </div>
    )
}

export default HomePage