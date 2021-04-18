import React, { useState } from "react";
import { axiosWithAuth } from "../helpers/axiosWithAuth";
import Color from './Color';
import EditMenu from './EditMenu';


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    
    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res)
      setEditing(false);
      updateColors(
        colors.map(color =>{
          if(color.id === res.data.id){
            return res.data
          }else {
            return color
          }
        })
    )}
    )
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/colors/${color.id}`)
      .then(res => {
        updateColors(
          colors.filter((colorItem) =>{
            return colorItem.id !== color.id
          })
        )
      })
      .catch(err => console.error('deleting error: ', err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

// Task List:
// 1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
// 2. Complete the deleteColor functions by making a delete request for deleting colors.