import { useState } from "react";
import { UserForm } from "./Form/UserForm";
import { SocialNetwork } from "./Form/SocialNetwork";
import { Skills } from "./Form/Skills";
import { Projects } from "./Form/Projects";
import { Music } from "./Form/Music";
import { useNavigate } from 'react-router-dom'

export function Create() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [id, setId] = useState(null);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const onSubmitHandler = async (formData, method, url) => {
        console.log(formData);
        const formDataObj = new FormData();
    
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((value, index) => {
                    if (typeof value === 'object' && value !== null) {
                        for (const subKey in value) {
                            formDataObj.append(`${key}[${index}][${subKey}]`, value[subKey]);
                        }
                    } else {
                        formDataObj.append(`${key}[${index}]`, value);
                    }
                });
            } else {
                formDataObj.append(key, formData[key]);
            }
        }
    
        try {
            let data = await fetch(`http://localhost:3000/${url}`, {
                method: method,
                body: formDataObj,
            });
    
            const res = await data.json();
    
            if (!id) {
                setId(res.data.objectId);
            }
    
            if (currentStep == 5) {
                navigate('/catalog');
            } else {
                nextStep();
            }
        } catch (err) {
            console.log(err);
        }
    };
    

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <UserForm nextStep={nextStep} onSubmitHandler={onSubmitHandler} />;
            case 2:
                return <SocialNetwork onSubmitHandler={onSubmitHandler} id={id} />;
            case 3:
                return <Skills onSubmitHandler={onSubmitHandler} id={id} />;
            case 4:
                return <Projects onSubmitHandler={onSubmitHandler} id={id} />;
            case 5:
                return <Music onSubmitHandler={onSubmitHandler} id={id} />;
            default:
                return null;
        }
    };

    return (
        <section className="main-two background">

            <div className="container">
                <h2>Personal Details</h2>
                {renderStep()}
            </div>
        </section>
    );
}

