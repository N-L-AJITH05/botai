import './Feedback.css';
import bulb from '../../Assets/bulb.png';
import { useState } from 'react';
import { useChat } from '../../Api/ChatContext';
import { enqueueSnackbar } from 'notistack';

const Feedback = ({ setDisplay, id }) => {
    const { editCurrentChat } = useChat();
    const [feedback, setFeedback] = useState('');

    const handleClick = () => {
        editCurrentChat(id, 0, feedback);
        enqueueSnackbar('Feedback recorded, save this conversation to view them here anytime', { variant: 'success' });
        setDisplay(false);
    };

    return (
        <div className="feedback-container">
            <div className="feedback-box">
                <div className="feedback-header">
                    <img src={bulb} alt="img" />
                    <p>Provide Additional Feedback</p>
                </div>
                <input value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                <div className="feedback-footer">
                    <button className="feedback-submit" onClick={handleClick}>Submit</button>
                    <button className="feedback-close" onClick={() => setDisplay(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Feedback;