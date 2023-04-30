import mapboxgl, { Map, Marker } from "mapbox-gl";
import { useEffect, useLayoutEffect, useRef } from "react";
import css from './Cines.module.css';

export default function MapView({value, onClick, cines, canClick, className}: mapViewProps) {

    const mapDiv = useRef<HTMLDivElement>(null);
    const map = useRef<Map>();
    const marker = useRef<Marker>();

    const triggerChange = (changedValue: mapboxgl.LngLat) => {
        onClick?.(changedValue);
    }

    const onClickMap = () => {
        if(!marker.current) return;

        triggerChange(marker.current!.getLngLat());
    }

    useEffect(() => {
        if(!map.current) return;

        if(canClick) {
            map.current.on('click', e => {

                if(marker.current){
                    marker.current.remove();
                }
    
                const tempMark = new Marker().setLngLat(e.lngLat).addTo(map.current!).setDraggable(true);
                marker.current = tempMark;
                map.current?.flyTo({center: e.lngLat, zoom: 15})
            });
        }
    })

    useLayoutEffect(() => {
        if (map.current) return;

        map.current = new Map({
            container: mapDiv.current!, 
            style: 'mapbox://styles/mapbox/streets-v12', 
            center: [-99.13199, 19.43620], 
            zoom: 9, 
        });

        if(cines) {
            cines.forEach(cine => {
                cine.addTo(map.current!);
            })
        }

        if(value){
            marker.current = value;
            value.addTo(map.current!).setDraggable(true);
            map.current?.flyTo({center: value.getLngLat(), zoom: 15})
        }
    })

    return(
        <div className={`${css.mapa} ${className}`} ref={mapDiv} onClick={onClickMap}>

        </div>
    )
}

interface mapViewProps {
    value?: Marker;
    onClick?: (value: mapboxgl.LngLat) => void;
    cines?: Marker[];
    canClick: boolean;
    className?: string;
}