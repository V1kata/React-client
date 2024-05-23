export function SecondarySection() {
    return (
        <section className="second-main">
            <h1>Explore some recommended portfolios</h1>
            <div className="sec-wrapper">
                <div className="profile-data">
                    <h1>Name: Viktor</h1>
                </div>
                <section className="wrapper">
                    <i className="fa-solid fa-arrow-left button" id="prev"></i>
                    <div className="image-container">
                        <div className="carousel">
                            <img src="/images/mainbackground.jpg" alt="" />
                            <img src="/images/Mock images/as1.jpg" alt="" />
                            <img src="/images/Mock images/as2.jpg" alt="" />
                            <img src="/images/Mock images/as3.jpg" alt="" />
                            <img src="/images/Mock images/as4.jpg" alt="" />
                            <img src="/images/Mock images/белем1.jpg" alt="" />
                            <img src="/images/Mock images/белем2.jpg" alt="" />
                        </div>
                        <i className="fa-solid fa-arrow-right button" id="next"></i>
                    </div>
                </section>
                <div className="short-info">
                    <h1>Best project - Lorem ipsum dolor sit amet consectetur adipisicing elit...</h1>
                </div>
            </div>
        </section>
    )
}