// src/components/products/useWorldMap.js
import { useMemo } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "../../data/world-110m.json";

export function useWorldMap(isDropdownView) {
  const projection = useMemo(
    () =>
      geoNaturalEarth1()
        .scale(isDropdownView ? 170 : 160)
        .translate([480, 250]),
    [isDropdownView]
  );

  return {
    projection,
    path: geoPath(projection),
    graticule: geoGraticule(),
    countries: useMemo(
      () => feature(worldData, worldData.objects.countries).features,
      []
    ),
  };
}
