import { Card, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";

export default function CardsLoading() {
  return(
        <Card
        loading
        hoverable
        style={{ width: 240 }}
        cover={
            <Skeleton.Image active style={{width: 240, height: 250}}
            />
        }
        >
        <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
  )
}
