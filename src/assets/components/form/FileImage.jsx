import React, { useEffect, useState } from "react";
import { ReactComponent as ImageIcon } from "../..//svg/image.svg";

function FileImage ({ refFile, src, onChange }) {
    const [imgUrl, setUrl] = useState(src);

    const changed = (e) => {
        if (onChange) onChange(e);

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
                ) : <div className="no-img">
                    <ImageIcon />
                </div>}
                <div className="desc">Profile image</div>
            </label>
            <div className="info">Avatar image will be publicly visible, maximum avatar image file size is 2MB, it is recommended that it has been manually cropped in a 1:1 box.</div>
            <input type="file" ref={refFile} id="uplod" accept="image/*" onChange={changed}  />
        </div>
    )
}

export default FileImage;