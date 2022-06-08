import {shortenText, dateToString} from "../common/utils";
function NoteItem({noteItem,index, onItemClick, onDelete}){
    return(
    <div key={`NoteItem____${index}`} className="note-item-wrapper">
        <div className="note-item" onClick={(e)=>{onItemClick(noteItem.noteId,e)}}>
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
                    <li>{noteItem.constructionSite.constructionSiteName}</li>
                    <li>{dateToString(noteItem.dateCreated)}</li>
                </ul>
            </div>
        </div>
        <div className="note-item__delete-container">
            <button className="btn note-item__delete-button" onClick={()=>onDelete(noteItem.noteId)}>&#215;</button>
        </div>
    </div>);
}

export default NoteItem;