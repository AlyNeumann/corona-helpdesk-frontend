import React, { useMemo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";
// import { ReactCrop } from 'react-image-cropper';
// import 'react-image-crop/dist/ReactCrop.css';
// import * as Doka from './doka.esm.min';
// import './doka.min.css';
// import { DokaOverlay } from './react-doka';

//TODO: add size limit for photo (content length or input type)

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
};

const activeStyle = {
    borderColor: "#2196f3"
};

const acceptStyle = {
    borderColor: "#00e676"
};

const rejectStyle = {
    borderColor: "#ff1744"
};

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
};

const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: "auto",
    height: 200,
    padding: 4,
    boxSizing: "border-box",
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    maxWidth: "200px",
    overflow: "hidden"
};

const img = {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: "50%"
};

const StyledDropzone = (props) => {
    //store image file
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({
        aspect: 1/1
    })


    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        open
    } = useDropzone({
        accept: 'image/jpeg, image/png',
        noClick: true,
        noKeyboard: true,
        minSize: 0,
        maxSize: 1000000,
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });
    //style changes when photo is dragged on top, or if error
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject]
    );
//preview of image 
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} />
                {/* <ReactCrop src={file.preview} crop={crop}/> */}
            </div>
        </div>
    ));

    useEffect(() => {
        console.log(files)
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => {
                URL.revokeObjectURL(file.preview)
                props.handleIt(file);
            });
        
        },
        [files, image]
    );

    const filepath = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
    </li>
    ));

    return (
        <div className="container drag-drop">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop your avatar photo here</p>
                <p>If image preview does not appear below, file is too large!</p>
                <button type="button" onClick={open}>
                    Open File Dialog
        </button>
            </div>
            <aside>
                <ul>{filepath}</ul>
            </aside>
            <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
    );
}

export default StyledDropzone;