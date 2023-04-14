import { Carousel } from "antd";
import css from '../DatosCuriosos/DatosCuriosos.module.css';

export default function DatosCuriosos() {
  return (
    <Carousel className={`${css.carousel}`} arrows={true} autoplay>
        <div className="flex justify-start">
          <img src="https://cdn-e360.s3-sa-east-1.amazonaws.com/cms_ratatouillejpg__P8fkT2SXUbI8nOkFlcHMfieqKler6FjyjeVOQofd.jpeg" className="h-40 w-52" />
          <p className="text-md mb-10 decoration-double text-white font-bold">Fue la primera película de Pixar producida por Disney.</p>
        </div>
      <div>
        <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/855/public/media/image/2019/11/toy-story-2.jpg?itok=GrTWKyVD" className="h-40 w-full" />
        <p className="mb-4 decoration-double font-semibold">Toy Story 2 casi fue borrada!!</p>
      </div>
    </Carousel>
  );
}
