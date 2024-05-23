import { useState } from "react"

export function Create() {
    const [formValue, setFormValue] = useState({
        username: '',
        avatarImage: null,
        skills: '',
        skillsImage: null,
        projects: '',
        projectsImage: null,
        music: '',
        musicImage: null,
        links: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setFormValue(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value
        }));
    }


    return (
        <section className="main-two">
            <form id="userDataForm" onSubmit={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formValue.username} onChange={handleChange} required />

                <label htmlFor="avatar">Avatar URL:</label>
                <input type="file" id="avatarImage" name="avatarImage" onChange={handleChange} accept="image/*" />

                <label htmlFor="skills">Skills (JSON string):</label>
                <textarea id="skills" name="skills" value={formValue.skills} onChange={handleChange} required></textarea>
                <input type="file" id="skillsImage" name="skillsImage" onChange={handleChange} accept="image/*" multiple />

                <label htmlFor="projects">Projects (JSON string):</label>
                <textarea id="projects" name="projects" value={formValue.projects} onChange={handleChange} required></textarea>
                <input type="file" id="projectsImage" name="projectsImage" onChange={handleChange} accept="image/*" multiple />

                <label htmlFor="music">Music (JSON string):</label>
                <textarea id="music" name="music" value={formValue.music} onChange={handleChange} required></textarea>
                <input type="file" id="musicImage" name="musicImage" onChange={handleChange} accept="image/*" multiple />

                <label htmlFor="links">Links (JSON string):</label>
                <textarea id="links" name="links" value={formValue.links} onChange={handleChange} required></textarea>

                <button type="submit">Submit</button>
            </form>
        </section>
    );
}