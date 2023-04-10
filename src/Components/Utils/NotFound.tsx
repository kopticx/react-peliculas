import { Result } from "antd";
import { Link } from "react-router-dom";
import css from './custom.module.css'

export default function () {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la página que ha visitado no existe."
      extra={<Link className={css.buttonLikeAntD} to={"/"}>Pagina Principal</Link>}
    />
  );
}
