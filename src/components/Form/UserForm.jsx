import { useState } from "react";
import { useForm } from "../../hooks/useForm";

export function UserForm({ onSubmitHandler }) {
    const { formValues, onChangeHandler, onSubmit } = useForm({
        email: '',
        fName: '',
        lName: '',
        avatarImage: '',
        phoneNum: '',
        address: ''
    }, onSubmitHandler);

    return (
        <form onSubmit={(e) => onSubmit(e, 'post', 'create-user')}>
            <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input type="email" id="email" name="email" required placeholder="Enter your email" value={formValues.email} onChange={onChangeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="fName">First name*</label>
                <input type="text" id="fName" name="fName" required value={formValues.fName} placeholder="Enter your first name" onChange={onChangeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="lName">Last name*</label>
                <input type="text" id="lName" name="lName" required placeholder="Enter your last name" value={formValues.lName} onChange={onChangeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="avatarImage">Avatar image</label>
                <input type="file" id="avatarImage" name="avatarImage" accept="image/*" onChange={onChangeHandler} required />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNum">Phone number</label>
                <input type="tel" id="phoneNum" name="phoneNum" placeholder="Enter your phone number" value={formValues.phoneNum} onChange={onChangeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address (optional)</label>
                <input type="text" id="address" name="address" placeholder="Enter your address" value={formValues.address} onChange={onChangeHandler} />
            </div>
            <button>Next</button>
            <button type="submit">Submit</button>
        </form>
    );
}
