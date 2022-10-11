import { NavigateFunction, useNavigate } from "react-router-dom"
import { Button, Rate } from "antd"

export const Send = () => {
  const navigation: NavigateFunction = useNavigate()

  const onNextPage = (): void => {
    navigation("/")
  }

  return (
    <div style={{ padding: 16 }} className="Send">
      <div className='goBack'>
        <Button onClick={() => {
          navigation("/")
        }}>返回</Button>
      </div>
      <span>Dao page</span>
      <button onClick={onNextPage}>Home</button>
      <Button type="primary">Hello Ant Design</Button>
      <Rate />
    </div>
  )
}
