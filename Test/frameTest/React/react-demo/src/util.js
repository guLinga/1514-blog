import { REACT_TEXT } from "./stants";

export function toObject(element){
  return typeof element === "string"||typeof element === "number"?
  {type:REACT_TEXT,content:element}:element;
}