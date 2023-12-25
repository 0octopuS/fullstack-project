// 2.16 show a notification after a successful operation
// 2.17 show a error message in red
const Notification = ({message, type}) => {
    if (message === null) {
      return null;
    }
  
    const notificationStyle = {
      color: type === 'error' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    };
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    );
  };
  
  export default Notification;
  