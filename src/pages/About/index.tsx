import { NavigateFunction, useNavigate } from "react-router-dom"
import { Button, Rate } from "antd"

export const About = () => {
  const navigation: NavigateFunction = useNavigate()

  const onNextPage = (): void => {
    navigation("/")
  }

  return (
    <div style={{ padding: 16 }}>
      <span>Dao page</span>
      <button onClick={onNextPage}>Home</button>
      <Button type="primary">Hello Ant Design</Button>
      <Rate />
    </div>
  )
}
