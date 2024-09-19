import './App.scss';
import avatar from './images/bozai.png';
import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';

type Comment = {
  rpid: string,
  user: User,
  content: string,
  ctime: string,
  like: number
}

// current logged-in user info
type User = {
  uid: string,
  avatar: string,
  uname: string,
};
// current logged-in user info
const user: User = {
  uid: '36080105',
  avatar,
  uname: 'John',
};

const App2 = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState(''); 
  const [activeTab, setActiveTab] = useState('Top');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3004/comments');
        const data = await response.json();
        setComments(data); // Set comments with fetched data
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const deleteComment = (rpid: string) => {
    const updatedComments = comments.filter((comment) => comment.rpid !== rpid);
    setComments(updatedComments);
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const newCommentData: Comment = {
        rpid: uuidv4.toString(),
        user: {
          uid: user.uid,
          avatar: user.avatar,
          uname: user.uname,
        },
        content: newComment, 
        ctime: new Date().toLocaleString(), 
        like: 0,
      };

      setComments([newCommentData, ...comments]); 
      setNewComment('');

      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const getSortedComments = () => {
    if (activeTab === 'Top') {
      return _.orderBy(comments, ['like'], ['desc']);
        } else if (activeTab === 'Newest') {
          return _.orderBy(comments, [(c:any) => new Date(c.ctime)], ['desc']);
        }
    return comments;
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {/* Display the total number of comments */}
            <span className="total-reply">{comments.length}</span>
          </li>
          <li className="nav-sort">
            {/* highlight class name: active */}
            <span
              className={`nav-item ${activeTab === 'Top' ? 'active' : ''}`}
              onClick={() => handleTabClick('Top')}
              style={{ cursor: 'pointer' }}>
              Top
            </span>
            <span
              className={`nav-item ${activeTab === 'Newest' ? 'active' : ''}`}
              onClick={() => handleTabClick('Newest')}
              style={{ cursor: 'pointer' }}>
              Newest
            </span>
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* Comment box for new comment */}
        <div className="box-normal">
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* New comment textarea */}
            <textarea
              className="reply-box-textarea"
              placeholder="Tell something..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} // Update the state when the user types
              ref={textareaRef}
            />
            <div className='reply-box-send' onClick={handlePostComment}>
              <div className='end-text'>
              Post
              </div>
            </div>
          </div>
        </div>

        {/* Comment list */}
        <div className="reply-list">
          {getSortedComments().map((comment: any) => (
            <Item user={user} item={comment} onDel={deleteComment}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App2;
