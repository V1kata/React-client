import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { SocialDetails } from "./Details/SocialDetails";
import { ProjectDetails } from "./Details/ProjectDetails";
import { MusicDetails } from "./Details/MusicDetails";

export function Details() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/userDetails/${id}`).then(res => res.json()).then(res => setData(res.data));
    }, [id]);

    return (
        <section className="details">
            <div className="fBack">
                <section className="first">
                    <div className="data">
                        <div className="left">
                            <h1>This is {data.fName} {data.lName}'s portfolio</h1>
                            <section className="skills-sec">
                                <h1>Proficiency</h1>
                                <div className="skills">
                                    {data.skills && data.skills.skills.map((val, i) => <h4 key={i}>{val}</h4>)}
                                </div>
                            </section>
                        </div>
                        <img src={`http://localhost:3000/image/${data.avatarImage}`} alt="" />
                    </div>
                </section>

                {data.social && <SocialDetails data={data} />}
            </div>

            <div className="sBack">
                <section className="projects-sec">
                    <h1>My projects</h1>
                    {data.projects && <ProjectDetails data={data.projects} />}
                </section>
            </div>

            <div className="tBack">
                <section className="music-sec">
                    <h1>What music i like</h1>
                    {data.music && <MusicDetails data={data.music} />}
                </section>
            </div>
        </section>
    )
}