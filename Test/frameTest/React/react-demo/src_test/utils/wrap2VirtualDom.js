import {REACT_ELEMENT, REACT_TEXT} from "../constant";

const wrap2VirtualDom = (element) => {
    return (typeof element === 'string' || typeof element === 'number') ? {
        $$typeof: REACT_ELEMENT,
        type: REACT_TEXT,
        props: {
            children: element
        }
    } : element
}

export default wrap2VirtualDom
