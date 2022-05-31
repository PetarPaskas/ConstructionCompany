import {shortenText} from "../common/utils";

function NoteItem({noteItem,index, onItemClick}){
    return(
    <div onClick={(e)=>{onItemClick(noteItem.noteId,e)}} key={`NoteItem____${index}`} className="note-item">
        <div className="note-item__info note-item__info--left">
            <h3 className="note-item__title">{noteItem.title}</h3>
            <p className="note-item__description">
                <span className="note-item__description--text">
                {shortenText(noteItem.description,42)}
                </span>
            </p>
        </div>
        <div className="note-item__info note-item__info--right">
            <ul className="note-item__legend-list">
                <li>{noteItem.constructionSite.name}</li>
                <li>{noteItem.user.name}</li>
                <li>{noteItem.dateCreated}</li>
            </ul>
        </div>
    </div>);
}

export default NoteItem;