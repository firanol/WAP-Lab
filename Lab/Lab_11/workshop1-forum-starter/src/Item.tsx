export default function Item({ user, item, onDel }: { user: any, item: any, onDel: any }) {
    return (
        <div className="reply-item" key={item.rpid}>
            <div className="root-reply-avatar">
                <div className="bili-avatar">
                    <img
                    className="bili-avatar-img"
                    src={item.user.avatar || './images/bozai.png'}
                    alt={`${item.user.uname}'s avatar`}
                    />
                </div>
            </div>

            <div className="content-wrap">
                <div className="user-info">
                  <div className="user-name">{item.user.uname}</div>
                </div>
                <div className="root-reply">
                <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                    <span className="reply-time">{item.ctime}</span>
                    <span className="reply-time">Like: {item.like}</span>
                        {
                            item.user.uid === user.uid && (
                                <span className="delete-btn" onClick={() => onDel(item.rpid)}>
                                    Delete
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
