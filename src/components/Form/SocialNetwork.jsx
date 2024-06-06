import React from 'react';
import { useForm } from "../../hooks/useForm";

export function SocialNetwork({ onSubmitHandler, id }) {
    const { formValues, onChangeHandler, onSubmit, addField, removeField } = useForm({
        links: [""]
    }, onSubmitHandler);

    return (
        <form onSubmit={(e) => onSubmit(e, 'post', `create-social/${id}`)}>
            {formValues.links.map((link, index) => (
                <div className="form-group" key={index}>
                    <label htmlFor={`links[${index}]`}>Profile links {index + 1}</label>
                    <div className="input-container">
                        <input
                            className="links"
                            type="url"
                            name={`links[${index}]`}
                            value={link}
                            placeholder="Enter your profile URL"
                            onChange={(e) => {
                                const updatedLinks = [...formValues.links];
                                updatedLinks[index] = e.target.value;
                                onChangeHandler({
                                    target: {
                                        name: 'links',
                                        value: updatedLinks
                                    }
                                });
                            }}
                            required
                        />
                        {index == 1 ?
                            <button type="button" className="cross" onClick={() => removeField('links', index)}>
                                <img src="/images/cross.svg" alt="Remove" />
                            </button> :
                            <></>}

                    </div>
                </div>
            ))}
            <div className="button-group">
                <button type="button" className="add" onClick={() => addField('links')}>Add more links</button>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    );
}
