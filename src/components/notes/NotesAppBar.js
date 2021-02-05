import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUpload } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch( startSaveNote(active) );
    }

    const handlePicture = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(file){
            dispatch( startUpload(file) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>18 de enero de 2021</span>

            <input 
                id="fileSelector" 
                type="file" 
                name="file"
                style={{display: 'none'}} 
                onChange={handleFileChange} 
            />

            <div>
                <button className="btn" onClick={handlePicture}>
                    Imagen
                </button>

                <button className="btn" onClick={handleSave}>
                    Guardar
                </button>
            </div>
        </div>
    )
}
