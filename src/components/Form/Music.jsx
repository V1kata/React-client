import { useState } from "react";
import { useForm } from "../../hooks/useForm";

export function Music({ onSubmitHandler, id }) {
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
        music: [{ title: '', author: '', linkUrl: '' }]
    }, onSubmitHandler);

    return (
        <form onSubmit={(e) => onSubmit(e, 'post', `create-music/${id}`)}>
            {formValues.music.map((musicItem, index) => (
                <div key={index} className="form-group">
                    <label htmlFor={`profile-${index}`}>Favourite music {index + 1}</label>
                    <div className="input-container">
                        <button type="button" onClick={() => showModal(index)}>Add</button>
                        {index == 1 ?
                            <button type="button" className="cross" onClick={() => removeField('music', index)}>
                                <img src="/images/cross.svg" alt="Remove" />
                            </button> :
                            <></>}
                    </div>
                </div>
            ))}

            <dialog id="d" open={isDialogOpen}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name={`music.${currentIndex}.title`}
                        value={formValues.music[currentIndex]?.title || ''}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        name={`music.${currentIndex}.author`}
                        value={formValues.music[currentIndex]?.author || ''}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="linkUrl">URL Link</label>
                    <input
                        type="url"
                        name={`music.${currentIndex}.linkUrl`}
                        value={formValues.music[currentIndex]?.linkUrl || ''}
                        onChange={onChangeHandler}
                    />
                </div>
                <button type="button" onClick={closeModal}>Close and finish</button>
            </dialog>
            <div className="button-group">
                <button type="button" className="add" onClick={() => addField('music')}>Add more links</button>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    );
}
