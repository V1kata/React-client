import React, { useEffect, useState, useRef } from 'react';

export function SecondarySection() {
    const [users, setUsers] = useState([]);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(res => setUsers(res.data.results))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    useEffect(() => {
        startAutoSlide();
        return () => clearInterval(intervalRef.current);
    }, [currentUserIndex, users]);

    const startAutoSlide = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => slideImage(1), 5000);
    };

    const slideImage = (step) => {
        setCurrentUserIndex((prevIndex) => {
            const newIndex = (prevIndex + step + users.length) % users.length;
            if (carouselRef.current) {
                carouselRef.current.style.transform = `translateX(-${newIndex * imageWidth}px)`;
            }
            return newIndex;
        });
    };

    const handleButtonClick = (direction) => {
        clearInterval(intervalRef.current);
        slideImage(direction === 'next' ? 1 : -1);
    };

    const imageWidth = 220;

    const currentUser = users[currentUserIndex];
    const currentUserProjects = currentUser?.projects ?? [];

    const bestProject = currentUserProjects.project?.length > 0 && Array.isArray(currentUserProjects.project) 
        ? currentUserProjects.project[0]?.details 
        : 'No projects available';

    return (
        <section className="second-main">
            <h1>Explore some recommended portfolios</h1>
            <div className="sec-wrapper">
                <div className="profile-data">
                    {currentUser ? (
                        <h1>Name: {currentUser.fName} {currentUser.lName}</h1>
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
                <section className="wrapper" onMouseEnter={() => clearInterval(intervalRef.current)} onMouseLeave={startAutoSlide}>
                    <i className="fa-solid fa-arrow-left button" id="prev" onClick={() => handleButtonClick('prev')}></i>
                    <div className="image-container">
                        <div className="carousel" ref={carouselRef}>
                            {users.map((user, index) => (
                                <img key={index} src={`http://localhost:3000/image/${user.avatarImage}`} alt={`Avatar of ${user.fName}`} />
                            ))}
                        </div>
                    </div>
                    <i className="fa-solid fa-arrow-right button" id="next" onClick={() => handleButtonClick('next')}></i>
                </section>
                <div className="short-info">
                    {currentUser ? (
                        <h1>Best project - {bestProject}</h1>
                    ) : (
                        <h1>Loading project details...</h1>
                    )}
                </div>
            </div>
        </section>
    );
}
