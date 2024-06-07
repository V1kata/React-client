import { useEffect, useState } from "react";

export function Catalog() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/users').then(res => res.json()).then(res => setData(res.data.results));
    }, []);

    return (
        <section id="catalogPage" className="background">
            {data.map((value) => (
                <div className="card-box" key={value.objectId}>
                    <img src={`http://localhost:3000/image/${value.avatarImage}`} />
                    <div>
                        <div className="text-center">
                            <p className="name">Name: {value.fName} {value.lName}</p>
                            <p className="email">email: {value.email}</p>
                            <p className="phoneNum">Phone: {value.phoneNum}</p>
                            {value.address ? <p className="address">Address: {value.address}</p> : <></>}
                        </div>
                        <div className="btn-group">
                            <a href={`/details/${value.objectId}`} id="details">Details</a>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}