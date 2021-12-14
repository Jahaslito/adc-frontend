import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../util/AppContext";
import Button from "../components/Button";
import { RiUploadCloud2Line } from "react-icons/ri";
import { colors } from "../assets/colors/colors";
import { IoCloseOutline } from "react-icons/io5";
import Input from "../components/Input";
import { IoMdImages } from "react-icons/io";
import { Api } from "../util/Api";

const Research = () => {
    const { setLoaderHidden, setAlerts } = useContext(AppContext);
    const [images, setImages] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);
    const [uploadBtnVisible, setUploadBtnVisible] = useState(false);
    const [desc, setDesc] = useState("");
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
                        accept="image/*"
                        onChange={onImageChange}
                    />
                    <span className={`mt-2 ${!uploadBtnVisible && "hidden"}`}>
                        <Input
                            label="Describe it"
                            type="text"
                            placeholder="Description"
                            value={desc}
                            onChange={(event) => setDesc(event.target.value)}
                            required
                        />
                    </span>
                </label>

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
                        onClick={upload}
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

    function upload() {
        setLoaderHidden(false);
        const params = new FormData();
        params.append("name", desc);
        params.append("image", images[0]);

        Api.post(`research_images`, params)
            .then((resp) => {
                console.log(resp.data);
                setImages([]);
                setImgUrls([]);
                setDesc("");
                setUploadBtnVisible(false);
                setAlerts([]);
                setAlerts([
                    {
                        message: "Image uploaded successfully",
                        theme: "primary",
                        timeout: 3,
                    },
                ]);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoaderHidden(true);
            });
    }
};

export default Research;
