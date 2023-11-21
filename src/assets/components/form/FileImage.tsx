import React, { FormEvent, Ref, RefObject, useEffect, useRef, useState } from "react";
import { ReactComponent as ImageIcon } from "../..//svg/image.svg";

interface FileImageProps {
    refFile: Ref<HTMLInputElement>;
    src?: string;
    onChange?: (e: FormEvent) => void
}

type ImageResult = string | ArrayBuffer | null | undefined;

function FileImage ({ refFile, src, onChange }: FileImageProps) {
    const [imgUrl, setUrl] = useState<ImageResult>(src);

    const changed = (e: FormEvent) => {
        if (onChange) onChange(e);

        const file = refFile!.current?.files[0];
        if (!file) return;


        const reader = new FileReader();
        reader.onload = (e) => { return setUrl(e.target?.result) };
        reader.readAsDataURL(file);
    }

    return (
        <div className="form-file">
            <label htmlFor="uplod">
                {imgUrl ? (
                    <img src={imgUrl as string} alt="uploaded image" />
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