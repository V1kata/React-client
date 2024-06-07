export function SocialDetails({ data }) {
    return (
        <section className="links-sec">
            <h1>Where to find me</h1>
            <div className="links">
                {data.social.links.map((val, i) => (
                    <div className="group-link" key={i}>
                        <img src="./images/Mock images/github.jpg" alt="" />
                        <h3><a href={val}>Github</a></h3>
                    </div>
                ))}
            </div>
        </section>
    )
}