import KeplerGl from 'kepler.gl';
import './style.css'

import {FakeSidePanel} from "./components/FakeSidePanel";

const mapbox_gl_token = "pk.eyJ1IjoiYWVpZ2h0MTk3MyIsImEiOiJjbDZ2cXR3OG8wMTQzM2NsZTh0ZzhlZjJpIn0.o3FTOxLjjAN9qTWHELhjgg";
const width = window.innerWidth - 400
const height = window.innerHeight

export function Map(props) {
    return <>
        <KeplerGl
            id="foo"
            mapboxApiAccessToken={mapbox_gl_token}
            width={width}
            height={height}
        />
        <FakeSidePanel />
    </>

}
