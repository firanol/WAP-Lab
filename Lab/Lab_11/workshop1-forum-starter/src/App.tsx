import './App.scss';
const avatar = '/images/bozzi.png'; 
import { useState } from 'react';
import _ from 'lodash';

// Comment List data
const defaultList = [
  {
    rpid: 3,
    user: {
      uid: '13258165',
      avatar: avatar,
      uname: 'Jay Zhou',
    },
    content: 'Nice, well done',
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: avatar,
      uname: 'Song Xu',
    },
    content: 'I search for you thousands of times, from dawn till dusk.',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: 'John',
    },
    content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
    ctime: '10-19 09:00',
    like: 66,
  },
];

// current logged-in user info
const user = {
  uid: '30009257',
  avatar,
  uname: 'John',
};

const App = () => {
  const [comments, setComments] = useState(defaultList);
  const [newComment, setNewComment] = useState(''); 
  const [activeTab, setActiveTab] = useState('Top');

  const deleteComment = (rpid: number) => {
    const updatedComments = comments.filter((comment) => comment.rpid !== rpid);
    setComments(updatedComments);
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        rpid: Date.now(),
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
            <div className="reply-item" key={comment.rpid}>
              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    className="bili-avatar-img"
                    src={comment.user.avatar || './images/bozai.png'}
                    alt={`${comment.user.uname}'s avatar`}
                  />
                </div>
              </div>

              <div className="content-wrap">
                <div className="user-info">
                  <div className="user-name">{comment.user.uname}</div>
                </div>
                <div className="root-reply">
                  <span className="reply-content">{comment.content}</span>
                  <div className="reply-info">
                    <span className="reply-time">{comment.ctime}</span>
                    <span className="reply-time">Like: {comment.like}</span>
                    <span
                      className="delete-btn"
                      onClick={() => deleteComment(comment.rpid)}
                      style={{ cursor: 'pointer', color: 'red' }}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
