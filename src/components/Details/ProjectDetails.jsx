export function ProjectDetails({ data }) {
    return (
        <div className="projects">
            {data.project.map((val, i) => (
                <div className="group-projects">
                    <h3>{val.name}</h3>
                    <img src={`http://localhost:3000/image/${val.imageUrl}`} alt="Project Thumbnail" />
                    <p className="description">{val.details}</p>
                    <div className="buttons">
                        <a href="#" className="read-more"
                            data-description="Full description of the Sudoku game made with React.">Read
                            more</a>
                        <a href={val.linkUrl} className="check-it-out" target="_blank">Check it
                            out</a>
                    </div>
                </div>
            ))
            }
        </div>
    )
}