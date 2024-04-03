<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let map: L.Map | undefined;
  let mapElement: HTMLElement;
  let editableLayers: any;

  onMount(async () => {
    if (browser) {
      map = L.map(mapElement).setView([-7.61564, 15.059012], 19);

      //-- Definir os mapas
      let osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          useCache: true,
          crossOrigin: true,
        }
      );

      let googleSat = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          useCache: true,
          crossOrigin: true,
        }
      );

      let googleTraffic = L.tileLayer(
        "https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          minZoom: 2,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          useCache: true,
          crossOrigin: true,
        }
      );
      //-- Difinir os Mapas

      // Definir as camadas
      let baseLayers = {
        "Ver como Satálite": googleSat,
        "Ver como Open Street": osm,
        "Ver como Tráfego": googleTraffic,
      };

      // Apresentar o mapa
      googleSat.addTo(map);
      L.control.layers(baseLayers).addTo(map);

      // Export Button
      var showHome = `<a href="/dashboard" title="Voltar" type="button" class="btn btn-sm variant-filled">Dashboard</a>`;
      var showHomeButton = new L.Control({ position: "bottomleft" });
      showHomeButton.onAdd = function (map) {
        this._div = L.DomUtil.create("div");
        this._div.innerHTML = showHome;
        return this._div;
      };
      showHomeButton.addTo(map);

      // Adicionar controle de camadas ao mapa
      editableLayers = new L.FeatureGroup();
      map.addLayer(editableLayers);

      var options = {
        position: "topleft",
        draw: {
          polyline: {
            shapeOptions: {
              color: "#f357a1",
              weight: 2,
            },
          },
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: "#e1e100", // Color the shape will turn when intersects
              message:
                "<strong>Atenção!<strong> não podes sobrepor a marcação!", // Message that will show when intersect
            },
            shapeOptions: {
              color: "#bada55",
            },
          },
          circle: true, // Turns off this drawing tool
          rectangle: {
            shapeOptions: {
              clickable: false,
            },
          },
        },
        edit: {
          featureGroup: editableLayers, //REQUIRED!!
          remove: true,
        },
      };

      var drawControl = new L.Control.Draw(options);
      map.addControl(drawControl);

      map.on("draw:created", (e) => {
        var type = e.layerType,
          layer = e.layer;

        console.log(type, layer.toGeoJSON());
        editableLayers.addLayer(layer);
      });
    }
  });

  onDestroy(async () => {
    if (map) {
      map.remove();
    }
  });

  function geojsonExport() {
    let nodata = '{"type":"FeatureCollection","features":[]}';
    let jsonData = JSON.stringify(editableLayers.toGeoJSON());
    let dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(jsonData);
    let datenow = new Date();
    let datenowstr = datenow.toLocaleDateString("pt-BR");
    let exportFileDefaultName = "export_draw_" + datenowstr + ".geojson";
    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    if (jsonData == nodata) {
      alert("Nenhuma elemento mapeado");
    } else {
      linkElement.click();
    }
  }
</script>

<main class="flex-grow">
  <button class="" on:click={geojsonExport}>Exportar</button>
  <div class="h-[600px] w-full" bind:this={mapElement}></div>
</main>
