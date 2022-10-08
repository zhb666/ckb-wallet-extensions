import { NavigateFunction, useNavigate } from "react-router-dom"
import { Button, Rate } from "antd"

export const Dao = () => {
  const navigation: NavigateFunction = useNavigate()

  const onNextPage = (): void => {
    navigation("/")
  }

  return (
    <div style={{ padding: 16 }} className="Dao">
      <span>Dao page</span>
      <button onClick={onNextPage}>Dao</button>
      <Button type="primary">Hello Ant Design</Button>
      <Rate />
    </div>
  )
}
