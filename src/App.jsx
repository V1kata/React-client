import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar'
import { Main } from './components/MainPage/Main';
import { Footer } from './components/Footer';
import { Create } from './components/Create';

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavBar />

            <main>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/create' element={<Create />} />
                </Routes>

            </main>

            <Footer />
        </>
    )
}

export default App
