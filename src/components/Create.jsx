import { useState } from "react";

export function Create() {
    const [userForm, setUserForm] = useState(true);
    const [formValue, setFormValue] = useState({
        email: '',
        fName: '',
        lName: '',
        phoneNum: '',
        address: '',
        avatarImage: null,
        skills: [{ skill: '', image: null }],
        projects: [{ project: '', image: null }],
        music: [{ music: '', image: null }],
        links: ['']
    });

    const handleChange = (e) => {
        const { name, value, type, files, dataset } = e.target;
        if (dataset.type === 'skill') {
            const index = dataset.index;
            setFormValue(prevState => {
                const skills = [...prevState.skills];
                skills[index] = { ...skills[index], [name]: type === 'file' ? files[0] : value };
                return { ...prevState, skills };
            });
        } else {
            setFormValue(prevState => ({
                ...prevState,
                [name]: type === 'file' ? files[0] : value
            }));
        }
    };

    const addSkill = (e) => {
        e.preventDefault();
        setFormValue(prevState => ({
            ...prevState,
            skills: [...prevState.skills, { skill: '', image: null }]
        }));
    };

    const addProject = (e) => {
        e.preventDefault();
        setFormValue(prevState => ({
            ...prevState,
            projects: [...prevState.projects, { projects: '', image: null }]
        }));
    };

    const addMusic = (e) => {
        e.preventDefault();
        setFormValue(prevState => ({
            ...prevState,
            music: [...prevState.music, { music: '', image: null }]
        }));
    };

    const addLinks = (e) => {
        e.preventDefault();
        setFormValue(prevState => ({
            ...prevState,
            links: [...prevState.links, '']
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', formValue.email);
        formData.append('fName', formValue.fName);
        formData.append('lName', formValue.lName);
        formData.append('phoneNum', formValue.phoneNum);
        formData.append('address', formValue.address);
        if (formValue.avatarImage) {
            formData.append('avatarImage', formValue.avatarImage);
        }
        formValue.skills.forEach((item, index) => {
            formData.append(`skills[${index}][skill]`, item.skill);
            if (item.image) {
                formData.append(`skills[${index}][image]`, item.image);
            }
        });
        formValue.projects.forEach((item, index) => {
            formData.append(`projects[${index}][project]`, item.project);
            if (item.image) {
                formData.append(`projects[${index}][image]`, item.image);
            }
        });
        formValue.music.forEach((item, index) => {
            formData.append(`music[${index}][music]`, item.music);
            if (item.image) {
                formData.append(`music[${index}][image]`, item.image);
            }
        });
        formValue.links.forEach((link, index) => {
            formData.append(`links[${index}]`, link);
        });

        await fetch('http://localhost:3000/create-portfolio', {
            method: 'POST',
            body: formData
        });
    };

    const checkUserForm = (e) => {
        e.preventDefault();
        setUserForm(true);
    };

    const handleLinksChange = (e, index) => {
        const { value } = e.target;
        setFormValue(prevState => {
            const links = [...prevState.links];
            links[index] = value;
            return { ...prevState, links };
        });
    };

    return (
        <section className="main-two">
            {userForm ? (
                <form id="userDataForm" onSubmit={onSubmit}>
                    {formValue.skills.map((skill, index) => (
                        <div className="form-group" key={index}>
                            <label htmlFor={`skills[${index}]`}>Skill {index + 1}</label>
                            <input
                                type="text"
                                id={`skills[${index}][skill]`}
                                name="skill"
                                data-index={index}
                                data-type="skill"
                                value={skill.skill}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="file"
                                id={`skills[${index}][image]`}
                                name="image"
                                data-index={index}
                                data-type="skill"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </div>
                    ))}
                    <button onClick={addSkill}>Add Skill</button>

                    {formValue.projects.map((project, index) => (
                        <div className="form-group" key={index}>
                            <label htmlFor={`projects[${index}]`}>Project {index + 1}</label>
                            <input
                                type="text"
                                id={`projects[${index}][project]`}
                                name="project"
                                data-index={index}
                                data-type="project"
                                value={project.project}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="file"
                                id={`projects[${index}][image]`}
                                name="image"
                                data-index={index}
                                data-type="project"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </div>
                    ))}
                    <button onClick={addProject}>Add Project</button>

                    {formValue.music.map((project, index) => (
                        <div className="form-group" key={index}>
                            <label htmlFor={`music[${index}]`}>Music {index + 1}</label>
                            <input
                                type="text"
                                id={`music[${index}][project]`}
                                name="project"
                                data-index={index}
                                data-type="project"
                                value={project.project}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="file"
                                id={`music[${index}][image]`}
                                name="image"
                                data-index={index}
                                data-type="project"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </div>
                    ))}
                    <button onClick={addMusic}>Add Music</button>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <UserForm
                    checkUserForm={checkUserForm}
                    handleChange={handleChange}
                    formValue={formValue}
                    handleLinksChange={handleLinksChange}
                    addLinks={addLinks}
                />
            )}
        </section>
    );
}

function UserForm({ checkUserForm, handleChange, formValue, handleLinksChange, addLinks }) {
    return (
        <div className="container">
            <h2>Personal Details</h2>
            <form onSubmit={checkUserForm}>
                <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input type="email" id="email" name="email" required placeholder="Enter your email" value={formValue.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="fName">First name*</label>
                    <input type="text" id="fName" name="fName" required value={formValue.fName} placeholder="Enter your first name" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="lName">Last name*</label>
                    <input type="text" id="lName" name="lName" required placeholder="Enter your last name" value={formValue.lName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="avatarImage">Avatar image</label>
                    <input type="file" id="avatarImage" name="avatarImage" accept="image/*" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="links[0]">Links profile link (optional)</label>
                    <input type="url" id="links[0]" name="links[0]" placeholder="Enter your LinkedIn profile URL" value={formValue.links[0]} onChange={(e) => handleLinksChange(e, 0)} />
                </div>
                {formValue.links.slice(1).map((link, index) => (
                    <div className="form-group" key={index + 1}>
                        <label htmlFor={`links[${index + 1}]`}>Links profile link {index + 1} (optional)</label>
                        <input type="url" id={`links[${index + 1}]`} name={`links[${index + 1}]`} placeholder="Enter another profile URL" value={link} onChange={(e) => handleLinksChange(e, index + 1)} />
                    </div>
                ))}
                <button onClick={addLinks}>Add more</button>
                <div className="form-group">
                    <label htmlFor="phoneNum">Phone number</label>
                    <input type="tel" id="phoneNum" name="phoneNum" placeholder="Enter your phone number" value={formValue.phoneNum} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address (optional)</label>
                    <input type="text" id="address" name="address" placeholder="Enter your address" value={formValue.address} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
