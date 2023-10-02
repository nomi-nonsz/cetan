import React, { useState } from "react";
import { ReactComponent as ImageIcon } from "../..//svg/image.svg";

function FileImage ({ refFile }) {
    const [imgUrl, setUrl] = useState(null);

    const onChange = () => {
        const file = refFile.current.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => { return setUrl(e.target.result) };
        reader.readAsDataURL(file);
    }

    return (
        <div className="form-file">
            <label htmlFor="uplod">
                {imgUrl ? (
                    <img src={imgUrl} alt="uploaded image" />
                ) : <ImageIcon />}
                <div className="desc">Profile image</div>
            </label>
            <input type="file" ref={refFile} id="uplod" accept="image/*" onChange={onChange}  />
        </div>
    )
}

export default FileImage;