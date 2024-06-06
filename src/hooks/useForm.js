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
            const keys = name.split('.');
            setFormValues((prevValues) => {
                let updatedValues = { ...prevValues };
                let currentLevel = updatedValues;

                for (let i = 0; i < keys.length - 1; i++) {
                    if (keys[i].includes('[')) {
                        const [arrayName, index] = keys[i].split('[');
                        const arrayIndex = parseInt(index.replace(']', ''), 10);
                        if (!currentLevel[arrayName]) {
                            currentLevel[arrayName] = [];
                        }
                        while (currentLevel[arrayName].length <= arrayIndex) {
                            currentLevel[arrayName].push({});
                        }
                        currentLevel = currentLevel[arrayName][arrayIndex];
                    } else {
                        if (!currentLevel[keys[i]]) {
                            currentLevel[keys[i]] = {};
                        }
                        currentLevel = currentLevel[keys[i]];
                    }
                }

                if (keys[keys.length - 1].includes('[')) {
                    const [arrayName, index] = keys[keys.length - 1].split('[');
                    const arrayIndex = parseInt(index.replace(']', ''), 10);
                    if (!currentLevel[arrayName]) {
                        currentLevel[arrayName] = [];
                    }
                    while (currentLevel[arrayName].length <= arrayIndex) {
                        currentLevel[arrayName].push('');
                    }
                    currentLevel[arrayName][arrayIndex] = value;
                } else {
                    currentLevel[keys[keys.length - 1]] = value;
                }

                return updatedValues;
            });
        }
    };

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

    const onSubmit = (e, method, url) => {
        e.preventDefault();

        onSubmitHandler(formValues, method, url);
    };

    return {
        formValues,
        onChangeHandler,
        onSubmit,
        addField,
        removeField
    };
}
