import { useState } from "react";

export function useForm(initValues, onSubmitHandler) {
    const [formValues, setFormValues] = useState(initValues);

    const onChangeHandler = (e) => {
        const { name, type, value, files } = e.target;

        if (type === 'file') {
            setFormValues({
                ...formValues,
                [name]: files[0]
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    }

    const addField = (fieldName) => {
        setFormValues({
            ...formValues,
            [fieldName]: [...(formValues[fieldName] || []), ""]
        });
    };

    const removeField = (fieldName, index) => {
        const updatedFields = formValues[fieldName].filter((_, i) => i !== index);
        setFormValues({
            ...formValues,
            [fieldName]: updatedFields
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(formValues);
    }

    return {
        formValues,
        onChangeHandler,
        onSubmit,
        addField,
        removeField
    }
}