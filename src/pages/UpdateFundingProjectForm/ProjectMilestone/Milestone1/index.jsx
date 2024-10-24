import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function Milestone1() {
    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
            ],
            handlers: {

            },
        },
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image'
    ];
    return (
        <div className='w-full pb-[3rem]'>
            <div className='basic-info-section !mb-[2rem]'>
                <div className='w-[70%]'>
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        className='h-fit'
                    />
                </div>
            </div>
        </div>

    )
}

export default Milestone1