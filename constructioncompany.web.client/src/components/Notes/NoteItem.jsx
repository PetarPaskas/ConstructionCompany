

function NoteItem({noteItem,index}){
    return(
    <div className="note-item">
        <div className="note-item__info note-item__info--left">
            <h3 className="note-item__title">Title</h3>
            <p className="note-item__description"><span className="note-item__description--text">Kratak opis necijeg dugackog posta ovde...</span></p>
        </div>
        <div className="note-item__info note-item__info--right">
            <ul className="note-item__legend-list">
                <li>Gradiliste 2</li>
                <li>Radnik 22</li>
                <li>12. 07. 2021.</li>
            </ul>
        </div>
    </div>);
}

export default NoteItem;