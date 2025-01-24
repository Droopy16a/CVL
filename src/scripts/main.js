import '../css/main.css';
import logo from "../assets/img/logo.png"

function Main() {
    return (
        <div className='mainDiv'>
            <img src={logo} alt='Droopy' onClick={() => window.location.reload()}/>
            <h2>CVL</h2>
            <h1>OSILYS</h1>
            <h3>2024/25</h3>
        </div>
    );
}

export default Main