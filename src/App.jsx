import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar'
import { Main } from './components/MainPage/Main';
import { Footer } from './components/Footer';
import { Create } from './components/Create';
import { Catalog } from './components/Catalog';
import { Details } from './components/Details';

function App() {
    return (
        <>
            <NavBar />

            <main>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/details/:id' element={<Details />}/>
                </Routes>

            </main>

            {/* <Footer /> */}
        </>
    )
}

export default App
