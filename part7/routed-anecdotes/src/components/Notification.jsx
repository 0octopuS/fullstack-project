const Notification = ({ notification }) => {
  const style = {
    borderStyle: notification ? 'solid' : 'none',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
