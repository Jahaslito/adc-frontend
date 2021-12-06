import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { RiUploadCloud2Line } from "react-icons/ri";
import { colors } from "../assets/colors/colors";

const Research = () => {
    const [images, setImages] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImgUrls = [];
        images.forEach((image) => newImgUrls.push(URL.createObjectURL(image)));
        setImgUrls(newImgUrls);
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center px-3 pb-3 border-b">
                <span className="text-lg font-light">
                    Upload images for research
                </span>
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onImageChange}
                />
                {imgUrls.map((url) => (
                    <img
                        src={url}
                        alt="upload"
                        className="w-8/12 border rounded-sm p-4"
                    />
                ))}
                <div className="p-4 flex flex-row">
                    <Button
                        label="Upload"
                        icon={
                            <RiUploadCloud2Line
                                size={20}
                                color={colors.primary}
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Research;
