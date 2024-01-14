import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    borderStyle: notification ? 'solid' : 'none',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification