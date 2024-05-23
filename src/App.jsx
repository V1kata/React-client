import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar'
import { Main } from './components/MainPage/Main';
import { Footer } from './components/Footer';

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavBar />

            <main>
                <Main />
                {/* <Routes>
          <Route path='/' element={<Main />} />
        </Routes> */}

            </main>

            <Footer />
        </>
    )
}

export default App
