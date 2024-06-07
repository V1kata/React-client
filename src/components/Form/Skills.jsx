import { useForm } from "../../hooks/useForm";

export function Skills({ onSubmitHandler, id }) {
    const { formValues, onChangeHandler, onSubmit, addField, removeField } = useForm({
        skills: [""]
    }, onSubmitHandler);

    return (
        <form onSubmit={(e) => onSubmit(e, 'post', `create-skill/${id}`)}>
            {formValues.skills.map((skill, index) => (
                <div className="form-group">
                    <label htmlFor={`skills[${index}]`}>Profile skill {index + 1}</label>
                    <div className="input-container">
                        <input
                            className="skills"
                            key={index}
                            type="text"
                            name={`skills[${index}]`}
                            value={skill}
                            placeholder="Enter your skill one by one"
                            onChange={(e) => {
                                const updatedSkill = [...formValues.skills];
                                updatedSkill[index] = e.target.value;
                                onChangeHandler({
                                    target: {
                                        name: 'skills',
                                        value: updatedSkill
                                    }
                                });
                            }}
                            required
                        />
                        {index == 1 ?
                            <button type="button" className="cross" onClick={() => removeField('skills', index)}>
                                <img src="/images/cross.svg" alt="Remove" />
                            </button> :
                            <></>}

                    </div>
                </div>
            ))
            }

            <div className="button-group">
                <button type="button" className="add" onClick={() => addField('skills')}>Add more skills</button>

                <button type="submit" className="next">Next</button>
            </div>
        </form>)
}