import { useForm } from "../../hooks/useForm";

export function SocialNetwork({ handleNext }) {
    const { formValues, onChangeHandler, onSubmit, addField, removeField } = useForm({
        links: []
    }, handleNext);

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="fLink">Profile links</label>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter your profile URL"
                        name="fLink"
                        value={formValues.links[0]}
                        onChange={onChangeHandler}
                        required
                    />
                    <button type="button" className="cross" onClick={() => /* Add your remove logic here */ null}>
                        <img src="/images/cross.svg" alt="Remove" />
                    </button>
                </div>
            </div>
            {formValues.links.map((link, index) => (
                <div className="form-group">
                    <label htmlFor={`links[${index}]`}>Profile links {index + 1}</label>
                    <div className="input-container">
                        <input
                            className="links"
                            key={index}
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
                        <button type="button" className="cross" onClick={() => removeField('links', index)}>
                            <img src="/images/cross.svg" alt="Remove" />
                        </button>
                    </div>
                </div>
            ))
            }

            <div className="button-group">
                <button type="button" className="add" onClick={() => addField('links')}>Add more links</button>

                <button type="submit" className="next">Next</button>
            </div>
        </form >
    )
}