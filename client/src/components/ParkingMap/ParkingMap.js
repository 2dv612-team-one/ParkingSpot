import React, { Component } from 'react';
import { connect } from 'react-redux';
import ol from 'openlayers';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({

});

class ParkingMap extends Component {
  componentDidMount() {
      this.raster = new ol.layer.Tile({
        source: new ol.source.OSM()
      });

      this.source = new ol.source.Vector({wrapX: false});

      this.vector = new ol.layer.Vector({
        source: this.source
      });

      this.map = new ol.Map({
        layers: [this.raster, this.vector],
        target: 'parking_map',
        view: new ol.View({
          center: [16.17, 56.72],
          zoom: 4
        })
      });

      this.map.getView().setCenter(ol.proj.transform([16.17, 56.72], 'EPSG:4326', 'EPSG:3857'));

      this.addInteraction();
  }

  addInteraction() {
      this.geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
      this.draw = new ol.interaction.Draw({
        source: this.source,
        type: 'Circle',
        geometryFunction: this.geometryFunction
      });
      this.map.addInteraction(this.draw);
  }

  render() {
    const { accessToken } = this.props;
    
    return (
      <div id="parking_map" className="parking_map"></div>
    );
  }
}

export default connect()(ParkingMap);