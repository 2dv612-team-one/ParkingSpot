import React, { Component } from 'react';
import { connect } from 'react-redux';
import ol from 'openlayers';

class ParkingMap extends Component {
  // TODO: make this more react-friendly
  componentDidMount() {
    const { onDraw } = this.props;
    // Create the vector source
    this.raster = new ol.layer.Tile({
      source: new ol.source.OSM(),
    });
    this.source = new ol.source.Vector({ wrapX: false });
    this.vector = new ol.layer.Vector({
      source: this.source,
    });

    // Init the map
    this.map = new ol.Map({
      layers: [this.raster, this.vector],
      target: 'parking_map',
      view: new ol.View({
        center: [16.17, 56.72],
        zoom: 4,
      }),
    });

    // Set map center & add interaction el
    this.map.getView().setCenter(ol.proj.transform([16.17, 56.72], 'EPSG:4326', 'EPSG:3857'));
    this.addInteraction();

    // Draw events
    this.draw.on('drawstart', () => {
      this.source.clear();
    });
    this.draw.on('drawend', (e) => {
      const format = new ol.format.WKT();
      const featureGeo = e.feature.getGeometry();

      onDraw(format.writeGeometry(featureGeo));
    });
  }

  addInteraction() {
    this.geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
    this.draw = new ol.interaction.Draw({
      source: this.source,
      type: 'Circle',
      geometryFunction: this.geometryFunction,
    });
    this.map.addInteraction(this.draw);
  }

  render() {
    return (
      <div id="parking_map" className="parking_map" />
    );
  }
}

export default connect()(ParkingMap);
