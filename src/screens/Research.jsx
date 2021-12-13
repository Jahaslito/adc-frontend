import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { RiUploadCloud2Line } from "react-icons/ri";
import { colors } from "../assets/colors/colors";
import { FileUploader } from "react-drag-drop-files";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";

const Research = () => {
    const [images, setImages] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);
    const [uploadBtnVisible, setUploadBtnVisible] = useState(false);

    useEffect(() => {
        if (images.length < 1) return;
        const newImgUrls = [];
        images.forEach((image) => newImgUrls.push(URL.createObjectURL(image)));
        setImgUrls(newImgUrls);
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
        setUploadBtnVisible(true);
    }
    return (
        <div className="w-full text-gray-600 flex flex-col">
            <div className="flex flex-row items-center px-3 pb-3 border-b">
                <span className="text-lg font-light">
                    Upload images for research
                </span>
            </div>
            <div className="mt-6 flex flex-col gap-4 items-center">
                <label
                    className="
                            
                            
                            flex flex-col
                            items-center
                            py-6
                            px-6
                            bg-white
                            rounded-sm
                            shadow-sm
                            justify-center
                            border-2
                            cursor-pointer
                            hover:bg-gray-50 
                            text-gray-600
                            ease-linear
                            transition-all
                            duration-150
                            border-dashed

                        "
                >
                    <div className="flex flex-row flex-wrap content-center gap-4 justify-evenly">
                        {imgUrls.length === 0 && (
                            <IoMdImages size={60} color={colors.primary} />
                        )}
                        {imgUrls.map((url, key) => (
                            <div
                                key={key}
                                className="w-32 h-32 shadow-sm overflow-hidden object-cover"
                            >
                                <img src={url} alt="upload" />
                            </div>
                        ))}
                    </div>
                    <span
                        className={`mt-2 text-sm font-medium ${
                            imgUrls.length !== 0 && "hidden"
                        }`}
                    >
                        Select file(s)
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={onImageChange}
                    />
                </label>

                {/* <FileUploader
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                    classes={`w-full ${uploadBtnVisible && "hidden invisible"}`}
                />

                {imgUrl && (
                    <img
                        src={imgUrl}
                        alt="upload"
                        className="w-8/12 border shadow-sm p-2"
                    />
                )} */}

                <div
                    className={`p-4 flex flex-row justify-between w-8/12 ${
                        !uploadBtnVisible && "hidden"
                    }`}
                >
                    <Button
                        label="Upload"
                        icon={
                            <RiUploadCloud2Line
                                size={20}
                                color={colors.primary}
                            />
                        }
                    />
                    <Button
                        label="Cancel"
                        icon={
                            <IoCloseOutline size={20} color={colors.danger} />
                        }
                        theme="danger"
                        onClick={() => {
                            setImages([]);
                            setImgUrls([]);
                            setUploadBtnVisible(false);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Research;
