import { useState } from "react";
import { useForm } from "../../hooks/useForm";

export function Projects({ onSubmitHandler, id }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const showModal = (index) => {
        setCurrentIndex(index);
        setIsDialogOpen(true);
    };

    const closeModal = () => {
        setIsDialogOpen(false);
        setCurrentIndex(null);
    };

    const { formValues, onChangeHandler, onSubmit, addField, removeField } = useForm({
        project: [{ name: '', imageUrl: '', linkUrl: '', details: '' }]
    }, onSubmitHandler);

    return (
        <form onSubmit={(e) => onSubmit(e, 'post', `create-project/${id}`)}>
            {formValues.project.map((projectItem, index) => (
                <div key={index} className="form-group">
                    <label htmlFor={`profile-${index}`}>Project {index + 1}</label>
                    <div className="input-container">
                        <button type="button" onClick={() => showModal(index)}>Add</button>
                        {index == 1 ?
                            <button type="button" className="cross" onClick={() => removeField('project', index)}>
                                <img src="/images/cross.svg" alt="Remove" />
                            </button> :
                            <></>}
                    </div>
                </div>
            ))}

            <dialog id="d" open={isDialogOpen}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name={`project.${currentIndex}.name`}
                        value={formValues.project[currentIndex]?.name || ''}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">imageUrl</label>
                    <input
                        type="text"
                        name={`project.${currentIndex}.imageUrl`}
                        value={formValues.project[currentIndex]?.imageUrl || ''}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="linkUrl">URL Link</label>
                    <input
                        type="url"
                        name={`project.${currentIndex}.linkUrl`}
                        value={formValues.project[currentIndex]?.linkUrl || ''}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="details">Project details</label>
                    
                    <textarea name={`project.${currentIndex}.details`} onChange={onChangeHandler} id="" value={formValues.project[currentIndex]?.details || ''}></textarea>
                </div>
                <button type="button" onClick={closeModal}>Close and finish</button>
            </dialog>
            <div className="button-group">
                <button type="button" className="add" onClick={() => addField('project')}>Add more links</button>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    );
}