import { useState } from "react";
import "./AddVideoForm.scss";

const AddVideoForm = () => {
 
  return (
    <div className="formInput">
        <form>
        <div className="content-wrapper">
            <div className="input-wrapper">
            <h1>Add Video</h1>
            
            <input type="text" placeholder="Link"/>
            <input type="text" placeholder="Title"/>
            <input   className="inputarea"type="text" placeholder="Descrption"/>
            <button type='submit'> Submit </button></div>
            </div>
      </form>
    </div>
  );
};

export default AddVideoForm;