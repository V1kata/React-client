import { useState } from "react";
import { UserForm } from "./Form/UserForm";
import { SocialNetwork } from "./Form/SocialNetwork";
import { Skills } from "./Form/Skills";
import { Projects } from "./Form/Projects";
import { Music } from "./Form/Music";

export function Create() {
    const [currentStep, setCurrentStep] = useState(1);
    const [id, setId] = useState(null);
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

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const addField = (field) => (e) => {
        e.preventDefault();
        setFormValue(prevState => ({
            ...prevState,
            [field]: [...prevState[field], field === 'links' ? '' : { [field.slice(0, -1)]: '', image: null }]
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

    const handleNext = () => {
        nextStep()
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <UserForm nextStep={nextStep} handleNext={handleNext} />;
            case 2:
                return <SocialNetwork handleNext={handleNext} />;
            case 3:
                return <Skills />;
            case 4:
                return <Projects />;
            case 5:
                return <Music />;
            default:
                return null;
        }
    };

    return (
        <section className="main-two">

            <div className="container">
                <h2>Personal Details</h2>
                {renderStep()}
            </div>
        </section>
    );
}

