module.exports = (function (sequelize, TYPES) {

  var aroundRadiusInMiles = 30;

  return sequelize.define('City', {

    name: {
      type: TYPES.TEXT
    },

    latitude: {
      type: TYPES.FLOAT
    },

    longitude: {
      type: TYPES.FLOAT
    }

  }, {

    tableName: 'cities',

    timestamps: true,
    updatedAt: false,

    defaultScope: {
      order: ['id desc']
    },

    scopes: {
      around: function (lat, lng) {
        var lat = parseFloat(lat)
          , lng = parseFloat(lng)
          , distance = (aroundRadiusInMiles * 1609.34) * 1.1
          , meanLat = lat * Math.PI / 180
          , deltaLat = distance / 6371009 * 180 / Math.PI
          , deltaLng = distance / (6371009 * Math.cos(meanLat)) * 180 / Math.PI
          , minLat = lat - deltaLat
          , maxLat = lat + deltaLat
          , minLng = lng - deltaLng
          , maxLng = lng + deltaLng;
        return {
          where: ['? <= latitude and latitude <= ? and ? <= longitude and longitude <= ?',
            minLat, maxLat, minLng, maxLng]
        }
      }
    }

  });

});
