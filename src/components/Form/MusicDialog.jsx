export function MusicDialog() {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="profile">Favourite music 1</label>
                <div className="input-container">
                    <input
                        className="profile"
                        type="button"
                        name="profile"
                        value="Add music"
                        placeholder="Enter your profile URL"
                        required
                    />
                </div>
            </div>
        </form >
    )
}